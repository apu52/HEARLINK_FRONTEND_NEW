import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CloudUpload, Home, Book, GraduationCap, User, RefreshCw, Mic, Download, CheckCircle, Eye, FileText, Download as DownloadIcon, Headphones } from 'lucide-react';

// TypeScript interfaces
interface TranscriptData {
  translated_transcript: string;
  detailed_notes?: string;
}

interface FlashcardData {
  flashcards: string[];
}

interface QuizOption {
  question: string;
  options: string[];
  answer: string;
}

interface ExerciseData {
  fillBlanks: string[];
  shortAnswer: string[];
  longAnswer: string[];
  answers: {
    fillBlanks: string[];
    shortAnswer: string[];
    longAnswer: string[];
  };
}

const Hearlink: React.FC = () => {
  // Base URL for API
  const BASE_URL = 'https://ecc0-116-204-174-95.ngrok-free.app';
  
  // States
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [isDetectingLanguage, setIsDetectingLanguage] = useState<boolean>(false);
  const [outputLanguage, setOutputLanguage] = useState<string>('English');
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>('transcript');
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null);
  const [summaryData, setSummaryData] = useState<string>('');
  const [flashcards, setFlashcards] = useState<string[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizOption[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{message: string, isCorrect: boolean} | null>(null);
  const [exerciseData, setExerciseData] = useState<ExerciseData | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [isResultsVisible, setIsResultsVisible] = useState<boolean>(false);
  
  const [hasGeneratedContent, setHasGeneratedContent] = useState({
    transcript: false,
    summary: false,
    notes: false,
    flashcards: false,
    quiz: false,
    exercises: false
  });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Sample transcript for fallback
  const sampleTranscript = `
    [00:00:05] Welcome to this lecture on effective study techniques.
    [00:00:10] Today we'll be covering three main approaches to improve your learning.
    [00:00:20] The first technique is spaced repetition, which involves reviewing information at increasing intervals.
    [00:01:05] Research shows this is much more effective than cramming everything in one session.
    [00:01:30] The second technique is active recall, where you test yourself on the material rather than simply re-reading it.
    [00:02:15] This forces your brain to retrieve information, strengthening neural pathways.
    [00:02:45] The third technique is elaboration, where you connect new information to what you already know.
    [00:03:20] This creates multiple pathways to access the information later.
    [00:04:00] Let's now discuss how to implement these techniques in your daily study routine.
    [00:04:30] Start by breaking down your study material into manageable chunks.
    [00:05:10] Then create a schedule where you review the material at increasing intervals.
    [00:05:45] Use active recall by creating flashcards or practice tests for yourself.
    [00:06:20] Finally, practice elaboration by explaining concepts in your own words or teaching them to someone else.
    [00:07:00] In conclusion, combining these three techniques will significantly improve your learning efficiency.
    [00:07:30] Thank you for your attention, and I wish you success in your studies.
  `;

  // Handle URL input
  const handleLoadUrl = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    
    setVideoFile(null);
    setVideoLoaded(true);
    showLanguageDetection();
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file');
        return;
      }
      
      setVideoFile(file);
      setVideoUrl('');
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoLoaded(true);
      showLanguageDetection();
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file');
        return;
      }
      
      setVideoFile(file);
      setVideoUrl('');
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setVideoLoaded(true);
      showLanguageDetection();
    }
  };

  // Simulate language detection
  const showLanguageDetection = () => {
    setIsDetectingLanguage(true);
    setDetectedLanguage('');
    
    setTimeout(() => {
      setDetectedLanguage('English');
      setIsDetectingLanguage(false);
    }, 1500);
  };

  // Process video
  const processVideo = async () => {
    if (!videoLoaded) {
      alert('Please load a video first');
      return;
    }

    // Reset content generation status
    setHasGeneratedContent({
      transcript: false,
      summary: false,
      notes: false,
      flashcards: false,
      quiz: false,
      exercises: false
    });

    setLoading(true);
    setProgress(0);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 3, 90));
    }, 500);

    try {
      let response;
      const formData = new FormData();

      // Handle YouTube link or file upload
      if (videoUrl) {
        formData.append('youtube_link', videoUrl);
        formData.append('target_language', outputLanguage);
        response = await fetch(`${BASE_URL}/api/transcribelink`, {
          method: 'POST',
          body: formData
        });
      } else if (videoFile) {
        formData.append('video', videoFile);
        formData.append('target_language', outputLanguage);
        response = await fetch(`${BASE_URL}/api/transcribe`, {
          method: 'POST',
          body: formData
        });
      } else {
        throw new Error('No video file or URL provided');
      }

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      clearInterval(progressInterval);
      setProgress(100);

      // Process transcript data
      if (data) {
        setTranscriptData(data);
        setHasGeneratedContent(prev => ({ ...prev, transcript: true }));
        setIsResultsVisible(true);
        
        setTimeout(() => {
          resultsContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        alert('No transcript data returned from the server');
      }
    } catch (error) {
      console.error('Error processing video:', error);
      alert(`Error processing video: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  // Generate different types of content
  const generateContent = (contentType: keyof typeof hasGeneratedContent) => {
    const generateHeaders = () => {
      const headers: Record<string, string> = {};
      if (BASE_URL.includes('ngrok')) {
        headers['ngrok-skip-browser-warning'] = 'true';
      }
      return headers;
    };

    switch (contentType) {
      case 'transcript':
        if (!hasGeneratedContent.transcript) {
          // We already have transcript from processVideo, but if not:
          setHasGeneratedContent(prev => ({ ...prev, transcript: true }));
        }
        break;

      case 'summary':
        fetch(`${BASE_URL}/api/summary`, {
          method: 'GET',
          headers: generateHeaders()
        })
          .then(res => res.json())
          .then(data => {
            setSummaryData(data.summary);
            setHasGeneratedContent(prev => ({ ...prev, summary: true }));
          })
          .catch(err => {
            console.error('Error fetching summary:', err);
          });
        break;

      case 'notes':
        if (!hasGeneratedContent.notes && transcriptData?.detailed_notes) {
          setTimeout(() => {
            setHasGeneratedContent(prev => ({ ...prev, notes: true }));
          }, 1200);
        }
        break;

      case 'flashcards':
        if (!hasGeneratedContent.flashcards) {
          fetch(`${BASE_URL}/api/flashcards`, {
            method: 'GET',
            headers: generateHeaders()
          })
            .then(res => res.json())
            .then(data => {
              if (data && data.flashcards) {
                setFlashcards(data.flashcards);
                setCurrentFlashcardIndex(0);
                setIsFlashcardFlipped(false);
                setHasGeneratedContent(prev => ({ ...prev, flashcards: true }));
              }
            })
            .catch(err => {
              console.error('Error fetching flashcards:', err);
            });
        }
        break;

      case 'quiz':
        if (!hasGeneratedContent.quiz) {
          fetch(`${BASE_URL}/api/quiz`, {
            method: 'GET',
            headers: generateHeaders()
          })
            .then(res => res.json())
            .then(data => {
              if (data.error) {
                console.error(data.error);
                return;
              }

              if (!data || !Array.isArray(data)) {
                console.error('Invalid quiz data received:', data);
                return;
              }

              setQuizData(data);
              setCurrentQuizIndex(0);
              setSelectedOption(null);
              setQuizFeedback(null);
              setHasGeneratedContent(prev => ({ ...prev, quiz: true }));
            })
            .catch(err => {
              console.error('Error fetching quiz:', err);
            });
        }
        break;

      case 'exercises':
        if (!hasGeneratedContent.exercises) {
          fetch(`${BASE_URL}/api/exercise`, {
            method: 'GET',
            headers: generateHeaders()
          })
            .then(res => res.json())
            .then(data => {
              setExerciseData(data);
              setShowAnswers(false);
              setHasGeneratedContent(prev => ({ ...prev, exercises: true }));
            })
            .catch(err => {
              console.error('Error fetching exercises:', err);
            });
        }
        break;
    }
  };

  // Flashcard navigation
  const showNextFlashcard = React.useCallback(() => {
    if (flashcards.length > 0) {
      setCurrentFlashcardIndex(prev => 
        prev === flashcards.length - 1 ? 0 : prev + 1
      );
      setIsFlashcardFlipped(false);
    }
  }, [flashcards.length]);

  const showPrevFlashcard = React.useCallback(() => {
    if (flashcards.length > 0) {
      setCurrentFlashcardIndex(prev => 
        prev === 0 ? flashcards.length - 1 : prev - 1
      );
      setIsFlashcardFlipped(false);
    }
  }, [flashcards.length]);

  const flipCard = React.useCallback(() => {
    setIsFlashcardFlipped((prev) => !prev);
  }, []);

  // Quiz functions
  const showNextQuestion = React.useCallback(() => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizFeedback(null);
    }
  }, [currentQuizIndex, quizData.length]);

  const showPrevQuestion = React.useCallback(() => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
      setSelectedOption(null);
      setQuizFeedback(null);
    }
  }, [currentQuizIndex]);

  const checkAnswer = React.useCallback(() => {
    if (selectedOption === null) {
      alert('Please select an answer first');
      return;
    }

    const correctAnswerLetter = quizData[currentQuizIndex].answer;
    const correctAnswerIndex = correctAnswerLetter.charCodeAt(0) - 65;

    if (selectedOption === correctAnswerIndex) {
      setQuizFeedback({
        message: 'Correct! Well done!',
        isCorrect: true
      });
    } else {
      setQuizFeedback({
        message: 'Incorrect. The correct answer is.',
        isCorrect: false
      });
    }
  }, [selectedOption, quizData, currentQuizIndex]);

  // Format transcript with timestamps
  const formatTranscript = (transcript: string) => {
    if (!transcript) return '';
    return transcript
      .split('\n')
      .filter(line => line.trim())
      .map((line, i) => (
        <p key={i} className="my-1">{line}</p>
      ));
  };

  // Parse flashcard data
  const getCurrentFlashcardData = () => {
    if (!flashcards.length) return { question: "", answer: "" };
    
    const currentFlashcard = flashcards[currentFlashcardIndex];
    const [questionPart, answerPart] = currentFlashcard.split(":").map(s => s?.trim() || "");
    
    return {
      question: questionPart.replace(/\*\*/g, ''),
      answer: answerPart?.replace(/\*\*/g, '') || "Answer not found"
    };
  };

  // Key event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab === 'flashcards' && hasGeneratedContent.flashcards) {
        if (e.key === 'ArrowLeft') {
          showPrevFlashcard();
        } else if (e.key === 'ArrowRight') {
          showNextFlashcard();
        } else if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          flipCard();
        }
      } else if (activeTab === 'quiz' && hasGeneratedContent.quiz) {
        if (e.key === 'ArrowLeft') {
          showPrevQuestion();
        } else if (e.key === 'ArrowRight') {
          showNextQuestion();
        } else if (e.key >= '1' && e.key <= '4') {
          const optionIndex = parseInt(e.key) - 1;
          if (optionIndex >= 0 && optionIndex < 4) {
            setSelectedOption(optionIndex);
          }
        } else if (e.key === 'Enter') {
          checkAnswer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTab, hasGeneratedContent, currentFlashcardIndex, currentQuizIndex, flipCard, showNextFlashcard, showPrevFlashcard, showNextQuestion, showPrevQuestion, checkAnswer]);

  // Current flashcard data
  const currentFlashcard = getCurrentFlashcardData();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Headphones className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Hearlink</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="flex items-center hover:text-blue-200"><Home className="mr-1 h-4 w-4" /> Home</a></li>
              <li><a href="#" className="flex items-center hover:text-blue-200"><Book className="mr-1 h-4 w-4" /> Library</a></li>
              <li><a href="#" className="flex items-center hover:text-blue-200"><GraduationCap className="mr-1 h-4 w-4" /> Learn</a></li>
              <li><a href="#" className="flex items-center hover:text-blue-200"><User className="mr-1 h-4 w-4" /> Account</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {/* Hero Section */}
        <section className="text-center my-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Transform Videos into Powerful Learning Materials</h2>
          <p className="text-lg text-gray-600">
            Upload any lecture or video and let our AI generate transcripts, summaries, flashcards, notes, and interactive quizzes in multiple languages to accelerate your learning.
          </p>
        </section>

        {/* Input Section */}
        <section className="my-8 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Step 1: Upload Your Learning Content</h3>
          
          {/* URL Input */}
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Paste YouTube URL or video link..."
                className="flex-1 p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button 
                onClick={handleLoadUrl}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition duration-200"
              >
                Load Video
              </button>
            </div>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 bg-white">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* File Upload */}
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer mb-4"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden"
              accept="video/*"
              onChange={handleFileUpload}
            />
            <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-500">Drag & drop your video file or click to browse</p>
          </div>

          {/* Video Preview */}
          {videoLoaded && (
            <div className="mb-4">
              <video 
                ref={videoPlayerRef}
                src={videoSrc}
                controls
                className="w-full rounded shadow-sm h-64 bg-black"
              ></video>
            </div>
          )}

          {/* Language Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Detected Language:</label>
              <select 
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-50"
              >
                <option>
                  {isDetectingLanguage 
                    ? "Auto-detect in progress..." 
                    : detectedLanguage 
                      ? `${detectedLanguage} (detected)` 
                      : "No language detected"}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Output Language:</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={outputLanguage}
                onChange={(e) => setOutputLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Bengali">Bengali</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Kannada">Kannada</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
          </div>

          {/* Process Button */}
          <button 
            onClick={processVideo}
            className="w-full bg-blue-600 text-white py-3 rounded flex items-center justify-center hover:bg-blue-700 transition duration-200"
            disabled={loading || !videoLoaded}
          >
            <Mic className="mr-2 h-5 w-5" /> Generate Learning Materials
          </button>
        </section>

        {/* Loading Section */}
        {loading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Processing your video... This may take a few moments</p>
          </div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Results Container */}
        {isResultsVisible && (
          <div ref={resultsContainerRef} className="my-8 max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-gray-200">
              <div 
                onClick={() => setActiveTab('transcript')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'transcript' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Transcript
              </div>
              <div 
                onClick={() => setActiveTab('summary')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Summary
              </div>
              <div 
                onClick={() => setActiveTab('flashcards')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'flashcards' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Flashcards
              </div>
              <div 
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Notes
              </div>
              <div 
                onClick={() => setActiveTab('quiz')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'quiz' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Quiz
              </div>
              <div 
                onClick={() => setActiveTab('exercises')}
                className={`px-4 py-2 font-medium cursor-pointer ${activeTab === 'exercises' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
              >
                Exercises
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg shadow-md p-6">
              {/* Transcript Tab */}
              {activeTab === 'transcript' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Video Transcript</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto mb-4">
                    {hasGeneratedContent.transcript && transcriptData?.translated_transcript
                      ? formatTranscript(transcriptData.translated_transcript)
                      : formatTranscript(sampleTranscript)}
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <button 
                      onClick={() => generateContent('transcript')}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Generate Transcript
                    </button>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition duration-200 border border-gray-300">
                        <DownloadIcon className="mr-2 h-4 w-4" /> Download as TXT
                      </button>
                      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition duration-200 border border-gray-300">
                        <FileText className="mr-2 h-4 w-4" /> Download as SRT
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Video Summary</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto mb-4">
                    {hasGeneratedContent.summary ? (
                      <div dangerouslySetInnerHTML={{ __html: summaryData }} />
                    ) : (
                      <p>Click "Generate Summary" to create a summary for this video.</p>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <button 
                      onClick={() => generateContent('summary')}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Generate Summary
                    </button>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition duration-200 border border-gray-300">
                        <DownloadIcon className="mr-2 h-4 w-4" /> Download Summary
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Flashcards Tab */}
              {activeTab === 'flashcards' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Flashcards</h4>
                  <div className="mb-4">
                    <button 
                      onClick={() => generateContent('flashcards')}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200 mb-6"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Generate Flashcards
                    </button>

                    {hasGeneratedContent.flashcards && flashcards.length > 0 ? (
                      <div className="relative">
                        <div 
                          className={`w-full h-64 rounded-lg bg-white border-2 border-blue-200 shadow-lg p-6 cursor-pointer flex items-center justify-center transition-transform duration-300 ${isFlashcardFlipped ? 'transform rotate-y-180' : ''}`}
                          onClick={flipCard}
                        >
                          <div className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-300 ${isFlashcardFlipped ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="text-center">
                              <h3 className="text-xl font-semibold mb-2">Question:</h3>
                              <p className="text-lg">{currentFlashcard.question}</p>
                              <p className="text-sm text-gray-500 mt-4">Click to reveal answer</p>
                            </div>
                          </div>
                          <div className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-300 ${isFlashcardFlipped ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="text-center">
                              <h3 className="text-xl font-semibold mb-2">Answer:</h3>
                              <p className="text-lg">{currentFlashcard.answer}</p>
                              <p className="text-sm text-gray-500 mt-4">Click to see question</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between mt-4">
                          <button 
                            onClick={showPrevFlashcard}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-300 transition duration-200"
                          >
                            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                          </button>
                          <span className="text-gray-600">
                            {currentFlashcardIndex + 1} of {flashcards.length}
                          </span>
                          <button 
                            onClick={showNextFlashcard}
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-300 transition duration-200"
                          >
                            Next <ChevronRight className="ml-1 h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
                        <p>Generate flashcards to help you memorize key concepts from this video.</p>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-6">
                    <p><strong>Keyboard Shortcuts:</strong> Use arrow keys to navigate between flashcards and spacebar to flip the current card.</p>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Detailed Notes</h4>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto mb-4">
                    {hasGeneratedContent.notes && transcriptData?.detailed_notes ? (
                      <div dangerouslySetInnerHTML={{ __html: transcriptData.detailed_notes }} />
                    ) : (
                      <p>Click "Generate Notes" to create detailed notes for this video.</p>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-between items-center">
                    <button 
                      onClick={() => generateContent('notes')}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Generate Notes
                    </button>
                    <div className="flex space-x-2 mt-4 sm:mt-0">
                      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-200 transition duration-200 border border-gray-300">
                        <DownloadIcon className="mr-2 h-4 w-4" /> Download Notes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === 'quiz' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Knowledge Check</h4>
                  <button 
                    onClick={() => generateContent('quiz')}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200 mb-6"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" /> Generate Quiz
                  </button>

                  {hasGeneratedContent.quiz && quizData.length > 0 ? (
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <div className="mb-6">
                        <h5 className="text-lg font-semibold mb-2">Question {currentQuizIndex + 1} of {quizData.length}</h5>
                        <p className="mb-4">{quizData[currentQuizIndex].question}</p>

                        <div className="space-y-2">
                          {quizData[currentQuizIndex].options.map((option, idx) => {
                            const [label, ...textParts] = option.split('.');
                            const optionText = textParts.join('.').trim();

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedOption(idx)}
                                    className={`p-3 rounded-lg border cursor-pointer ${
                                        selectedOption === idx
                                            ? 'bg-blue-100 border-blue-500'
                                            : 'border-gray-300 hover:bg-gray-100'
                                    }`}
                                >
                                  <div className="flex items-center">
                                    <div className={`h-5 w-5 mr-3 rounded-full flex items-center justify-center ${
                                        selectedOption === idx ? 'bg-blue-500 text-white' : 'bg-gray-200'
                                    }`}>
                                      {label}
                                    </div>
                                    <span>{optionText}</span>
                                  </div>
                                </div>
                            );
                          })}
                        </div>

                      </div>

                      {quizFeedback && (
                        <div className={`p-4 rounded-lg mb-4 ${
                          quizFeedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <div className="flex items-center">
                            {quizFeedback.isCorrect ? (
                              <CheckCircle className="h-5 w-5 mr-2" />
                            ) : (
                              <div className="flex flex-col">
                                <p>{quizFeedback.message}</p>
                                <p className="mt-2 font-medium">
                                  Correct answer: {quizData[currentQuizIndex].answer}. {
                                  quizData[currentQuizIndex].options[quizData[currentQuizIndex].answer.charCodeAt(0) - 65]
                                }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center">
                        <button 
                          onClick={showPrevQuestion}
                          disabled={currentQuizIndex === 0}
                          className={`px-4 py-2 rounded flex items-center ${
                            currentQuizIndex === 0
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          <ChevronLeft className="mr-1 h-4 w-4" /> Previous
                        </button>
                        
                        {!quizFeedback && (
                          <button 
                            onClick={checkAnswer}
                            disabled={selectedOption === null}
                            className={`px-4 py-2 rounded ${
                              selectedOption === null
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            Check Answer
                          </button>
                        )}
                        
                        <button 
                          onClick={showNextQuestion}
                          disabled={currentQuizIndex === quizData.length - 1}
                          className={`px-4 py-2 rounded flex items-center ${
                            currentQuizIndex === quizData.length - 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          }`}
                        >
                          Next <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
                      <p>Generate a quiz to test your understanding of key concepts from this video.</p>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-600 mt-6">
                    <p><strong>Keyboard Shortcuts:</strong> Use arrow keys to navigate between questions and number keys (1-4) to select options.</p>
                  </div>
                </div>
              )}

              {/* Exercises Tab */}
              {activeTab === 'exercises' && (
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-blue-700">Practice Exercises</h4>
                  <div className="flex justify-between items-center mb-6">
                    <button 
                      onClick={() => generateContent('exercises')}
                      className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 transition duration-200"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" /> Generate Exercises
                    </button>
                    {hasGeneratedContent.exercises && (
                      <button 
                        onClick={() => setShowAnswers(!showAnswers)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex items-center hover:bg-gray-300 transition duration-200"
                      >
                        <Eye className="mr-2 h-4 w-4" /> {showAnswers ? 'Hide Answers' : 'Show Answers'}
                      </button>
                    )}
                  </div>

                  {hasGeneratedContent.exercises && exerciseData ? (
                    <div className="space-y-8">
                      {/* Fill in the Blanks */}
                      {exerciseData.fillBlanks && exerciseData.fillBlanks.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                          <h5 className="text-lg font-semibold mb-4">Fill in the Blanks</h5>
                          <div className="space-y-4">
                            {exerciseData.fillBlanks.map((item, idx) => (
                              <div key={idx} className="mb-2">
                                <p dangerouslySetInnerHTML={{ __html: item }}></p>
                                {showAnswers && (
                                  <div className="mt-2 text-green-600 pl-4 border-l-2 border-green-400">
                                    <p><strong>Answer:</strong> {exerciseData.answers.fillBlanks[idx]}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Short Answer Questions */}
                      {exerciseData.shortAnswer && exerciseData.shortAnswer.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                          <h5 className="text-lg font-semibold mb-4">Short Answer Questions</h5>
                          <div className="space-y-4">
                            {exerciseData.shortAnswer.map((item, idx) => (
                              <div key={idx} className="mb-2">
                                <p className="mb-2">{item}</p>
                                <textarea 
                                  className="w-full p-2 border border-gray-300 rounded"
                                  rows={2}
                                  placeholder="Write your answer here..."
                                ></textarea>
                                {showAnswers && (
                                  <div className="mt-2 text-green-600 pl-4 border-l-2 border-green-400">
                                    <p><strong>Sample Answer:</strong> {exerciseData.answers.shortAnswer[idx]}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Long Answer Questions */}
                      {exerciseData.longAnswer && exerciseData.longAnswer.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded border border-gray-200">
                          <h5 className="text-lg font-semibold mb-4">Long Answer Questions</h5>
                          <div className="space-y-4">
                            {exerciseData.longAnswer.map((item, idx) => (
                              <div key={idx} className="mb-2">
                                <p className="mb-2">{item}</p>
                                <textarea 
                                  className="w-full p-2 border border-gray-300 rounded"
                                  rows={4}
                                  placeholder="Write your detailed answer here..."
                                ></textarea>
                                {showAnswers && (
                                  <div className="mt-2 text-green-600 pl-4 border-l-2 border-green-400">
                                    <p><strong>Sample Answer:</strong> {exerciseData.answers.longAnswer[idx]}</p>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
                      <p>Generate exercises to practice and apply concepts from this video.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Headphones className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-semibold text-blue-700">Hearlink</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">About Us</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
          <div className="text-center mt-6 text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Hearlink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hearlink;