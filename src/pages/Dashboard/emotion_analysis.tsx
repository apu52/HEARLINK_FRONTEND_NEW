import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // Assuming you are using Lucide icons


export default function EmotionAnalysis() {
  // Base URL configuration
  const BASE_URL = 'http://127.0.0.1:5006';


const navigate = useNavigate();

const handleLogout = () => {
  stopCamera();    // To safely stop the camera before leaving
  navigate("/login");
};

  
  // State variables
  const [cameraActive, setCameraActive] = useState(false);
  const [topEmotion, setTopEmotion] = useState('-');
  const [secondEmotion, setSecondEmotion] = useState('-');
  const [distressPercentage, setDistressPercentage] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [recordingStatus, setRecordingStatus] = useState('');
  const [statusColor, setStatusColor] = useState('');
  const [emotionColor, setEmotionColor] = useState('');
  const [downloadLinks, setDownloadLinks] = useState({ report: '', chart: '' });

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const recordingStartTimeRef = useRef(null);
  const recordingMaxTime = 10; // 10 seconds

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      console.log('Camera started');
      
      // Reset emotion display
      setTopEmotion('-');
      setSecondEmotion('-');
      setDistressPercentage(0);
      
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Could not access the camera. Please check permissions and try again.');
      setCameraActive(false);
    }
  };

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      console.log('Camera stopped');
    }

    // Stop recording if active
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      stopRecording();
    }
  }, []);

  // Update recording timer
  const updateRecordingTimer = () => {
    if (!recordingStartTimeRef.current) return;

    const elapsedSeconds = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');

    setRecordingTime(`${minutes}:${seconds}`);

    // Auto-stop if reached max time
    if (elapsedSeconds >= recordingMaxTime) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        stopRecording();
      }
    }
  };

  // Start recording
  const startRecording = () => {
    if (!streamRef.current) {
      alert('Camera must be turned on to record.');
      return;
    }

    recordedChunksRef.current = [];

    try {
      // Use MP4 container with H.264 video codec if supported
      const mimeType = MediaRecorder.isTypeSupported('video/mp4') ? 'video/mp4' : 'video/webm';
      const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        uploadRecording();
      };

      // Start recording
      mediaRecorder.start(100); // Collect data in chunks of 100ms
      setIsRecording(true);
      setRecordingStatus('Recording...');
      setStatusColor('text-red-500');

      // Reset previous results
      setTopEmotion('-');
      setSecondEmotion('-');
      setDistressPercentage(0);
      setEmotionColor('');

      // Start timer
      recordingStartTimeRef.current = Date.now();
      updateRecordingTimer();
      timerIntervalRef.current = setInterval(updateRecordingTimer, 1000);

      // Auto-stop after max time
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          stopRecording();
        }
      }, recordingMaxTime * 1000);

      console.log('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording. Please try again.');
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setRecordingStatus('Processing...');
      setStatusColor('text-blue-500');

      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      console.log('Recording stopped');
    }
  };

  // Upload video to backend API
  const uploadRecording = async () => {
    try {
      setRecordingStatus('Analyzing emotions...');

      // Create a Blob from the recorded chunks
      const mimeType = mediaRecorderRef.current.mimeType || 'video/mp4';
      const blob = new Blob(recordedChunksRef.current, { type: mimeType });

      // Create a timestamp for the filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `emotion-recording-${timestamp}.mp4`;

      // Create FormData object and append the video file
      const formData = new FormData();
      formData.append('video', blob, filename);
      formData.append('student_id',localStorage.getItem("student_id"));

      // Send to the backend API
      const response = await fetch(`${BASE_URL}/api/analyze-emotion`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      // Update UI with success message
      setRecordingStatus('Analysis complete!');
      setStatusColor('text-green-500');

      // Update emotion UI with the results from the server
      updateResultsUI(result);

      // Reset status after a delay
      setTimeout(() => {
        setRecordingStatus('');
      }, 5000);

    } catch (error) {
      console.error('Error uploading recording:', error);
      setRecordingStatus(`Error: ${error.message}`);
      setStatusColor('text-red-500');

      // Reset status after a delay
      setTimeout(() => {
        setRecordingStatus('');
      }, 5000);
    }
  };

  // Update UI with results from server
  const updateResultsUI = (response) => {
    // Update with real data from the API
    setTopEmotion(response.top_emotion || '-');
    setSecondEmotion(response.second_emotion || '-');

    if (response.distress_percentage !== undefined) {
      const distressValue = response.distress_percentage.toFixed(2);
      setDistressPercentage(distressValue);
    }

    // Check if alert was triggered
    if (response.alert_triggered) {
      setEmotionColor('text-red-500');
    } else {
      setEmotionColor('');
    }

    // Set download links if available
    if (response.report_path || response.chart_path) {
      setDownloadLinks({
        report: response.report_path ? `${BASE_URL}/api/${response.report_path}` : '',
        chart: response.chart_path ? `${BASE_URL}/api/${response.chart_path}` : ''
      });
    }
  };

  // Effect for camera toggle
  useEffect(() => {
    if (cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    
    // Cleanup function
    return () => {
      stopCamera();
    };
  }, [cameraActive, stopCamera]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="bg-blue-900 min-h-screen py-12 relative overflow-hidden">
      {/* Space background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-blue-950">
          <div className="stars"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Emotion Analysis for Classroom Students</h2>
        <p className="text-xl text-blue-200 text-center mb-8">Understand student emotions in real-time to enhance classroom engagement.</p>
        
        <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-blue-800 flex justify-between items-center border-b border-blue-700">
            <h3 className="text-xl font-semibold text-white">Live Emotion Analysis</h3>
            <label className="relative inline-block w-14 h-7">
              <input 
                type="checkbox" 
                className="opacity-0 w-0 h-0"
                checked={cameraActive}
                onChange={() => setCameraActive(!cameraActive)}
              />
              <span className="absolute cursor-pointer inset-0 bg-blue-400 rounded-full transition-all duration-300 before:absolute before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all before:duration-300 before:content-[''] checked:bg-blue-500 checked:before:translate-x-7"></span>
            </label>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative bg-blue-950 rounded-lg overflow-hidden h-64">
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover" 
                  autoPlay 
                  playsInline
                ></video>
                {!cameraActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-80">
                    <p className="text-blue-200">Camera disabled. Toggle switch to enable.</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
                  <p className="text-white">
                    <strong>Top Emotion:</strong> 
                    <span className={emotionColor}> {topEmotion}</span>
                  </p>
                </div>
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
                  <p className="text-white">
                    <strong>Second Most Common Emotion:</strong> 
                    <span className={emotionColor}> {secondEmotion}</span>
                  </p>
                </div>
                <div className="bg-blue-900 bg-opacity-50 p-4 rounded-lg transform transition-all duration-300 hover:scale-102">
                  <p className="text-white mb-2"><strong>Emotional Distress:</strong></p>
                  <div className="h-6 bg-blue-200 rounded-full relative">
                    <div 
                      className="h-full bg-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${distressPercentage}%` }}
                    ></div>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                      {distressPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recording controls */}
            <div className="mt-8 bg-blue-800 bg-opacity-40 p-4 rounded-lg">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-4">
                  <button
                    className={`px-6 py-2 rounded-full font-medium ${
                      cameraActive && !isRecording 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                        : 'bg-gray-400 text-blue-900 cursor-not-allowed'
                    }`}
                    onClick={startRecording}
                    disabled={!cameraActive || isRecording}
                  >
                    Start Recording
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full font-medium ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gray-400 text-blue-900 cursor-not-allowed'
                    }`}
                    onClick={stopRecording}
                    disabled={!isRecording}
                  >
                    Stop Recording
                  </button>
                  <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-medium"
>
  <LogOut className="h-5 w-5" />
  Logout
</button>

                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-blue-900 px-4 py-2 rounded-full text-white font-mono">
                    {recordingTime}
                  </div>
                  {recordingStatus && (
                    <div className={`font-medium ${statusColor}`}>
                      {recordingStatus}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Download links */}
              {(downloadLinks.report || downloadLinks.chart) && (
                <div className="mt-4 flex flex-wrap gap-4">
                  {downloadLinks.report && (
                    <a 
                      href={downloadLinks.report}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full inline-block transition-colors"
                    >
                      Download Report
                    </a>
                  )}
                  {downloadLinks.chart && (
                    <a 
                      href={downloadLinks.chart}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full inline-block transition-colors"
                    >
                      View Chart
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for stars animation */}
      <style>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 60px 110px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 80px 150px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 100px 20px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 120px 50px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 140px 80px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 160px 120px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 180px 30px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 200px 70px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 220px 100px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 240px 130px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 260px 40px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 280px 90px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 300px 160px, white, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 320px 10px, white, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 400px 200px;
          animation: animateStars 60s linear infinite;
        }
        
        @keyframes animateStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-200px);
          }
        }
      `}</style>
    </div>
  );
}