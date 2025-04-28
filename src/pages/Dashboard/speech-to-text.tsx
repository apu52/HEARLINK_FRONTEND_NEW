import React, { useState, useRef, useEffect } from 'react';

const SpeechAssist: React.FC = () => {
  // State variables
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [currentTranscription, setCurrentTranscription] = useState<string>("");
  const [status, setStatus] = useState<string>("Ready");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [history, setHistory] = useState<string[]>([]);
  const [recordingOpacity, setRecordingOpacity] = useState<number>(0.5);
  
  // Refs for audio processing
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const silenceDetectorRef = useRef<number | null>(null);
  const silenceCounterRef = useRef<number>(0);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const isProcessingRef = useRef<boolean>(false);
  const chunkStartTimeRef = useRef<number>(0);
  const recordingIndicatorRef = useRef<HTMLDivElement>(null);
  const transcriptionTextRef = useRef<HTMLParagraphElement>(null);
  const historyListRef = useRef<HTMLUListElement>(null);

  // Configuration parameters
  const SILENCE_THRESHOLD = 0.015;
  const SILENCE_DURATION = 1.2;
  const MAX_RECORDING_DURATION = 4.0;
  const MIN_RECORDING_DURATION = 0.8;

  // Debug logging function
  const logStatus = (message: string) => {
    console.log(`[STT ${new Date().toISOString()}] ${message}`);
    setStatus(message);
  };

  // Initialize audio function
  const initializeAudio = async (): Promise<MediaStream> => {
    // Check if we already have a valid stream
    if (audioStreamRef.current && audioStreamRef.current.active) {
      return audioStreamRef.current;
    }

    try {
      logStatus('Requesting microphone access...');

      // Request microphone with explicit constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Store the stream for later use
      audioStreamRef.current = stream;
      return stream;
    } catch (err) {
      console.error('Microphone access error:', err);
      logStatus(`Microphone error: ${err instanceof Error ? err.name : 'Unknown'}`);
      throw err;
    }
  };

  // Process audio chunk function
  const processAudioChunk = async () => {
    if (audioChunksRef.current.length === 0 || isProcessingRef.current) return;

    // Set processing flag to prevent overlapping processing
    isProcessingRef.current = true;

    // Create audio blob from current chunks
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });

    // Reset chunks for next recording segment
    const chunkCopy = [...audioChunksRef.current];
    audioChunksRef.current = [];

    // Don't process very small audio chunks
    if (audioBlob.size < 1000) {
      logStatus(isRecording ? 'Listening...' : 'Ready');
      isProcessingRef.current = false;
      return;
    }

    logStatus('Processing audio...');

    // Create form data
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.mp3');
    formData.append('output_language', selectedLanguage);

    try {
      // Send to API endpoint
      const response = await fetch('http://127.0.0.1:5008/api/voice', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      // Process the results
      if (result.translated_text && result.translated_text.trim()) {
        // Clean up the transcription
        let newText = result.translated_text.trim();

        // If current transcription ends with sentence-ending punctuation or is empty,
        // capitalize the new text
        if (currentTranscription === "" ||
            /[.!?]\s*$/.test(currentTranscription)) {
          newText = newText.charAt(0).toUpperCase() + newText.slice(1);
        }

        // Add space if needed between chunks
        let updatedTranscription = currentTranscription;
        if (updatedTranscription &&
            !updatedTranscription.endsWith(" ") &&
            !newText.startsWith(" ") &&
            !/[.!?,;]$/.test(updatedTranscription)) {
          updatedTranscription += " ";
        }

        // Append new transcription to current one
        updatedTranscription += newText;
        setCurrentTranscription(updatedTranscription);

        // Auto-scroll if overflowing
        if (transcriptionTextRef.current) {
          transcriptionTextRef.current.scrollTop = transcriptionTextRef.current.scrollHeight;
        }
      }

      // Update status when complete, but check if we're still recording
      logStatus(isRecording ? 'Listening...' : 'Processing complete');
    } catch (error) {
      console.error('API Error:', error);
      logStatus(isRecording ? 'Error - still listening' : 'Error processing');
    } finally {
      // Always reset the processing flag
      isProcessingRef.current = false;
    }
  };

  // Start recording function
  const startRecording = async () => {
    try {
      logStatus('Starting microphone...');

      // Get audio stream
      const stream = await initializeAudio();
      if (!stream) {
        throw new Error('Could not initialize audio stream');
      }

      // Setup audio context
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }

      sourceNodeRef.current = audioContextRef.current.createMediaStreamSource(stream);

      // Setup analyzer for silence detection
      const analyzerNode = audioContextRef.current.createAnalyser();
      analyzerNode.fftSize = 1024;
      sourceNodeRef.current.connect(analyzerNode);

      const bufferLength = analyzerNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      // Create media recorder with appropriate options
      try {
        // Try with MIME types the browser definitely supports
        let options: MediaRecorderOptions = {};

        if (MediaRecorder.isTypeSupported('audio/webm')) {
          options = { mimeType: 'audio/webm' };
        } else if (MediaRecorder.isTypeSupported('audio/mp3')) {
          options = { mimeType: 'audio/mp3' };
        } else if (MediaRecorder.isTypeSupported('audio/wav')) {
          options = { mimeType: 'audio/wav' };
        }

        // Add bitrate to options
        options.audioBitsPerSecond = 128000;

        // Create recorder
        mediaRecorderRef.current = new MediaRecorder(stream, options);
        console.log('MediaRecorder initialized with options:', options);
      } catch (e) {
        // Fallback with no options
        console.warn('Error creating MediaRecorder with options, falling back:', e);
        mediaRecorderRef.current = new MediaRecorder(stream);
      }

      // Reset audio chunks
      audioChunksRef.current = [];

      // Start time tracking for this chunk
      chunkStartTimeRef.current = Date.now();

      // Event handlers for recording
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start with smaller time slices
      mediaRecorderRef.current.start(250);
      logStatus('Listening...');

      // Handle recording stop
      mediaRecorderRef.current.onstop = () => {
        if (audioChunksRef.current.length > 0) {
          // Use setTimeout to avoid potential recursive issues
          setTimeout(processAudioChunk, 50);
        }
      };

      // Set up silence detection function
      silenceDetectorRef.current = window.setInterval(() => {
        if (!isRecording) {
          if (silenceDetectorRef.current) {
            clearInterval(silenceDetectorRef.current);
          }
          return;
        }

        analyzerNode.getByteFrequencyData(dataArray);

        // Calculate average volume level
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength / 255; // Normalize to 0-1

        // Make recording indicator pulse based on audio level
        if (average > SILENCE_THRESHOLD) {
          setRecordingOpacity(Math.min(0.5 + average, 1));
        } else {
          setRecordingOpacity(0.5);
        }

        // Only check for silence/recording timing if we're not already processing
        if (!isProcessingRef.current) {
          // Check for silence
          if (average < SILENCE_THRESHOLD) {
            silenceCounterRef.current += 0.1; // Interval is 100ms

            // If silence lasts for the threshold duration and we have minimum recording time
            const recordingDuration = (Date.now() - chunkStartTimeRef.current) / 1000;
            if (silenceCounterRef.current >= SILENCE_DURATION && recordingDuration >= MIN_RECORDING_DURATION) {
              // Process this chunk after silence
              if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();

                // Restart recording after a short delay
                setTimeout(() => {
                  if (isRecording && mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
                    try {
                      mediaRecorderRef.current.start(250);
                      chunkStartTimeRef.current = Date.now();
                    } catch (e) {
                      console.error('Error restarting recorder after silence', e);
                    }
                  }
                }, 300);
              }
              silenceCounterRef.current = 0;
            }
          } else {
            // Reset silence counter when sound is detected
            silenceCounterRef.current = 0;
          }

          // Force chunk processing after maximum duration
          const recordingDuration = (Date.now() - chunkStartTimeRef.current) / 1000;
          if (recordingDuration >= MAX_RECORDING_DURATION) {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
              mediaRecorderRef.current.stop();

              // Restart recording shortly after
              setTimeout(() => {
                if (isRecording && mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
                  try {
                    mediaRecorderRef.current.start(250);
                    chunkStartTimeRef.current = Date.now();
                  } catch (e) {
                    console.error('Error restarting recorder after max duration', e);
                  }
                }
              }, 100);
            }
            silenceCounterRef.current = 0;
          }
        }
      }, 100);

    } catch (err) {
      logStatus(`Microphone access denied: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Microphone error details:', err);
      setIsRecording(false);
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch (e) {
        console.error('Error stopping mediaRecorder', e);
      }
    }

    if (silenceDetectorRef.current) {
      clearInterval(silenceDetectorRef.current);
      silenceDetectorRef.current = null;
    }

    // Wait for any in-flight processing to complete
    setTimeout(() => {
      // Only add to history when recording stops and we have content
      if (currentTranscription.trim()) {
        // Add final punctuation if missing
        let finalTranscription = currentTranscription;
        if (!/[.!?]$/.test(finalTranscription)) {
          finalTranscription += ".";
        }

        // Add completed transcription to history
        setHistory(prev => [...prev, finalTranscription]);

        // Scroll history to bottom
        if (historyListRef.current) {
          historyListRef.current.scrollTop = historyListRef.current.scrollHeight;
        }
      }

      logStatus('Ready');
    }, 500);
  };

  // Toggle recording function
  const toggleRecording = async () => {
    // Check browser compatibility
    if (!checkBrowserCompatibility()) return;

    if (!isRecording) {
      try {
        // Try to initialize audio first
        await initializeAudio();
        
        setIsRecording(true);
        setCurrentTranscription(""); // Reset the transcription
        startRecording();
      } catch (err) {
        logStatus(`Cannot access microphone: ${err instanceof Error ? err.message : 'Unknown error'}`);
        console.error('Microphone permission error:', err);
        alert('Please allow microphone access to use speech recognition');
      }
    } else {
      setIsRecording(false);
      stopRecording();
    }
  };

  // Check browser compatibility
  const checkBrowserCompatibility = (): boolean => {
    let warningMessage = '';

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      warningMessage = 'Your browser does not support audio recording. Please use Chrome, Firefox, or Edge.';
    } else if (!window.MediaRecorder) {
      warningMessage = 'Your browser does not support MediaRecorder. Please use Chrome, Firefox, or Edge.';
    }

    if (warningMessage) {
      logStatus(warningMessage);
      alert(warningMessage);
      return false;
    }

    return true;
  };

  // Clear history function
  const clearHistory = () => {
    setHistory([]);
  };

  // Language options
  const languageOptions = [
    { value: "en", label: "English" },
    { value: "hi", label: "Hindi" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "it", label: "Italian" },
    { value: "zh-CN", label: "Chinese (Simplified)" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "pt", label: "Portuguese" },
    { value: "ru", label: "Russian" },
    { value: "ar", label: "Arabic" },
    { value: "bn", label: "Bengali" },
    { value: "ta", label: "Tamil" }
  ];

  // Try to pre-request permissions when component mounts
  useEffect(() => {
    logStatus('Initializing...');
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Stop the tracks right away - we just wanted the permission
        stream.getTracks().forEach(track => track.stop());
        logStatus('Ready');
      })
      .catch(err => {
        console.log('Initial permission check:', err.name);
        logStatus('Click "Start Recording" to begin');
      });

    // Clean up resources when component unmounts
    return () => {
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }

      if (audioContextRef.current) {
        audioContextRef.current.close().catch(e => console.error('Error closing audio context', e));
      }

      if (silenceDetectorRef.current) {
        clearInterval(silenceDetectorRef.current);
      }
    };
  }, []);

  return (
    <div className="speech-assist-app light-theme">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">Hearlink</a>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#" className="active">Speech Assist</a></li>
            <li><a href="#">Gallery</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Speech Assist Section */}
      <section className="speech-assist" id="speech-assist">
        <div className="container">
          <h2 className="section-title">Speech Assist for Deaf Students</h2>
          <p className="section-subtitle">Empower classroom communication with real-time transcription and multilingual support.</p>

          <div className="speech-assist-layout">
            {/* Main Area */}
            <div className="main-area">
              <div className="speech-assist-card transcription-card">
                <div className="card-header">
                  <h3>Live Transcription</h3>
                  <button className="btn btn-icon" title="Play Transcription">
                    <span className="play-icon">🔊</span>
                  </button>
                </div>
                <div className="transcription-content">
                  <p ref={transcriptionTextRef} id="transcription-text">
                    {currentTranscription || "Press record to start transcription..."}
                  </p>
                </div>
                <div className="status-indicator">
                  <p id="status-text">{status}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
              {/* Controls */}
              <div className="speech-assist-card control-card">
                <div className="card-header">
                  <h3>Controls</h3>
                </div>
                <div className="language-select">
                  <label htmlFor="language">Output Language</label>
                  <select 
                    id="language" 
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                  >
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="voice-input">
                  <button 
                    id="record-btn" 
                    className={`btn btn-primary ${isRecording ? 'recording' : ''}`}
                    onClick={toggleRecording}
                  >
                    <span className="mic-icon">{isRecording ? '🛑' : '🎙️'}</span>
                    {isRecording ? ' Stop Recording' : ' Start Recording'}
                  </button>
                  <div 
                    ref={recordingIndicatorRef}
                    className={`recording-indicator ${isRecording ? 'recording' : ''}`}
                    style={{ opacity: isRecording ? recordingOpacity : 0.5 }}
                  ></div>
                </div>
                <div className="playback-controls">
                  <div className="control-item">
                    <label htmlFor="speech-rate">Speed</label>
                    <input type="range" id="speech-rate" min="0.5" max="2" step="0.1" defaultValue="1" />
                  </div>
                  <div className="control-item">
                    <label htmlFor="speech-volume">Volume</label>
                    <input type="range" id="speech-volume" min="0" max="1" step="0.1" defaultValue="1" />
                  </div>
                </div>
              </div>

              {/* Transcription History */}
              <div className="speech-assist-card history-card">
                <div className="card-header">
                  <h3>Transcription History</h3>
                </div>
                <div className="history-content">
                  <ul ref={historyListRef} id="history-list">
                    {history.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <button id="clear-history" className="btn btn-secondary" onClick={clearHistory}>
                    Clear History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        /* Light blue theme */
        .light-theme {
          --primary-color: #2196F3;
          --primary-dark: #1976D2;
          --primary-light: #BBDEFB;
          --accent-color: #03A9F4;
          --text-color: #333;
          --text-light: #666;
          --bg-color: #F5FAFF;
          --card-bg: #FFFFFF;
          --border-color: #E0E0E0;
          --shadow-color: rgba(0, 0, 0, 0.1);
          --success-color: #4CAF50;
          --error-color: #F44336;
          --gradient-start: #E3F2FD;
          --gradient-end: #BBDEFB;
        }
        
        body {
          background-color: var(--bg-color);
          color: var(--text-color);
          line-height: 1.6;
        }
        
        .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        /* Navbar */
        .navbar {
          background-color: var(--card-bg);
          box-shadow: 0 2px 10px var(--shadow-color);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .navbar .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
        }
        
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: var(--primary-color);
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
        }
        
        .nav-links li {
          margin-left: 20px;
        }
        
        .nav-links a {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          padding: 8px 12px;
          border-radius: 6px;
        }
        
        .nav-links a:hover, .nav-links a.active {
          color: var(--primary-color);
          background-color: var(--primary-light);
        }
        
        /* Speech Assist Section */
        .speech-assist {
          padding: 60px 0;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        }
        
        .section-title {
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 10px;
          color: var(--primary-dark);
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          text-align: center;
          margin-bottom: 40px;
          color: var(--text-light);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* Speech Assist Layout */
        .speech-assist-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        /* Cards */
        .speech-assist-card {
          background-color: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 8px 30px var(--shadow-color);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          margin-bottom: 30px;
        }
        
        .speech-assist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px var(--shadow-color);
        }
        
        .card-header {
          padding: 20px;
          background: linear-gradient(to right, var(--primary-color), var(--accent-color));
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .card-header h3 {
          margin: 0;
          font-size: 1.4rem;
        }
        
        /* Transcription Card */
        .transcription-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .transcription-content {
          flex-grow: 1;
          padding: 20px;
          background-color: var(--card-bg);
          border-radius: 0 0 12px 12px;
        }
        
        #transcription-text {
          min-height: 300px;
          max-height: 300px;
          overflow-y: auto;
          line-height: 1.8;
          padding: 15px;
          background-color: var(--bg-color);
          border-radius: 8px;
          font-size: 1.1rem;
        }
        
        .status-indicator {
          padding: 15px 20px;
          background-color: var(--primary-light);
          color: var(--primary-dark);
          font-weight: 500;
          text-align: center;
        }
        
        /* Control Card */
        .control-card {
          padding-bottom: 20px;
        }
        
        .language-select {
          padding: 20px;
        }
        
        .language-select label {
          display: block;
          margin-bottom: 10px;
          font-weight: 500;
          color: var(--text-color);
        }
        
        .language-select select {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-color);
          color: var(--text-color);
          font-size: 1rem;
        }
        
        .voice-input {
          padding: 0 20px 20px;
          position: relative;
        }
        
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          color: white;
          width: 100%;
        }
        
        .btn-primary:hover {
          background-color: var(--primary-dark);
        }
        
        .btn-secondary {
          background-color: var(--bg-color);
          color: var(--text-color);
        }
        
        .btn-secondary:hover {
          background-color: var(--border-color);
        }
        
        .btn-icon {
          background: transparent;
          color: white;
          font-size: 1.2rem;
          padding: 8px;
        }
        
        .mic-icon {
          margin-right: 8px;
          font-size: 1.2rem;
        }
        
        .recording-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--primary-color);
          position: absolute;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .recording {
          animation: pulse 1.5s infinite;
          background-color: rgba(255, 50, 50, 0.8) !important;
        }
        
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        
        .playback-controls {
          padding: 0 20px;
        }
        
        .control-item {
          margin-bottom: 20px;
        }
        
        .control-item label {
          display: block;
          margin-bottom: 10px;
          font-weight: 500;
        }
        
        .control-item input[type="range"] {
          width: 100%;
          cursor: pointer;
          accent-color: var(--primary-color);
        }
        
        /* History Card */
        .history-card {
          max-height: 400px;
          display: flex;
          flex-direction: column;
        }
        
        .history-content {
          flex-grow: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }
        
        #history-list {
          list-style: none;
          margin-bottom: 20px;
          max-height: 250px;
          overflow-y: auto;
          flex-grow: 1;
        }
        
        #history-list li {
          padding: 10px 15px;
          border-bottom: 1px solid var(--border-color);
          line-height: 1.6;
        }
        
        #history-list li:last-child {
          border-bottom: none;
        }
        
        /* Responsive Styles */
        @media (max-width: 1024px) {
          .speech-assist-layout {
            grid-template-columns: 1fr;
          }
          
          .speech-assist-card {
            margin-bottom: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
          }
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
          }
          
          .btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }
          
          #transcription-text {
            min-height: 200px;
            font-size: 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .container {
            width: 95%;
            padding: 0 10px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .card-header h3 {
            font-size: 1.2rem;
          }
          
          .control-item label {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SpeechAssist;