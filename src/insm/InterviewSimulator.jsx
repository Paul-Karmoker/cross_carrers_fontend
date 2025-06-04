import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiMic, FiSkipForward, FiDownload, FiShare2, FiClock, FiBookOpen, FiAward } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Webcam from 'react-webcam';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';

const InterviewPractice = () => {
  // State declarations
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [practiceMode, setPracticeMode] = useState('full');
  const [showVirtualInterviewer, setShowVirtualInterviewer] = useState(true);
  const [progress, setProgress] = useState([]);
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [virtualInterviewerText, setVirtualInterviewerText] = useState('');
  const [isSpeakingAI, setIsSpeakingAI] = useState(false);

  // Refs
  const webcamRef = useRef(null);
  const timerRef = useRef(null);
  const speechDetectionRef = useRef(null);
  const speechRecognitionRef = useRef(null);
  const resultsRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // Form handling
  const { register, handleSubmit, watch, setValue } = useForm();
  const jobDescription = watch('jobDescription');

  // Video constraints
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
    frameRate: 30
  };

  // Check for speech synthesis support
  const isSpeechSynthesisSupported = () => {
    return 'speechSynthesis' in window;
  };

  // Handle file change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
      setIsUploading(true);
      setUploadProgress(0);
      setValue('document', e.target.files);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  // Generate questions from job description or document
  const generateQuestions = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      
      if (file) {
        formData.append('document', file);
      } 
      else if (data.jobDescription && data.jobDescription.trim() !== '') {
        formData.append('jobDescription', data.jobDescription);
      }
      else {
        toast.error('Please provide either a job description or upload a document');
        setIsLoading(false);
        return;
      }
      
      formData.append('practiceMode', practiceMode);
      
      const response = await axios.post('https://api.crosscareers.com/insm/generate-questions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setQuestions(response.data.questions);
      setStep(2);
      startSpeechDetection();
      startTimer();
      
      // Initialize virtual interviewer with first question
      if (showVirtualInterviewer && response.data.questions.length > 0) {
        speakQuestion(response.data.questions[0].question);
      }
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Speak question through virtual interviewer
  const speakQuestion = (question) => {
    setVirtualInterviewerText(question);
    
    // Check if speech synthesis is supported
    if (!isSpeechSynthesisSupported()) {
      console.warn('Speech synthesis not supported in this browser');
      return;
    }

    // Cancel any ongoing speech
    if (speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
    }

    // Create a new utterance
    const utterance = new SpeechSynthesisUtterance(question);
    utterance.rate = 0.9; // Slightly slower than normal
    utterance.pitch = 1; // Normal pitch
    utterance.volume = 1; // Full volume

    // Set voice if available (try to use a natural-sounding voice)
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prefer female voices as they're often clearer for this use case
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en') && voice.name.includes('Female')
      ) || voices[0];
      
      utterance.voice = preferredVoice;
    }

    // Event handlers
    utterance.onstart = () => {
      setIsSpeakingAI(true);
    };

    utterance.onend = () => {
      setIsSpeakingAI(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeakingAI(false);
    };

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
    speechSynthesisRef.current = utterance;
  };

  // Stop speech synthesis
  const stopSpeech = () => {
    if (isSpeechSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingAI(false);
  };

  // Speech detection setup without audio feedback
  const startSpeechDetection = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    
    if (!AudioContext) {
      console.warn('AudioContext not supported');
      return;
    }
    
    const audioContext = new AudioContext();
    
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        // Disable audio output to prevent feedback
        const audioStream = new MediaStream();
        stream.getAudioTracks().forEach(track => audioStream.addTrack(track));
        
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(audioStream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        
        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;
        
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        
        speechDetectionRef.current = { 
          audioContext,
          stream,
          javascriptNode
        };
        
        javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          const values = array.reduce((a, b) => a + b) / array.length;
          setIsSpeaking(values > 10);
        };
      })
      .catch(err => {
        console.error('Error setting up speech detection:', err);
      });
      
    // Improved speech recognition
    if ('webkitSpeechRecognition' in window) {
      const recognition = new speechRecognitionRef();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 3; // Get more alternatives for better accuracy
      
      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            // Use the most confident alternative
            const alternatives = event.results[i][0].alternatives;
            if (alternatives && alternatives.length > 0) {
              // Sort by confidence and take the highest
              alternatives.sort((a, b) => b.confidence - a.confidence);
              finalTranscript += alternatives[0].transcript + ' ';
            } else {
              finalTranscript += transcript + ' ';
            }
          }
        }
        
        setTranscript(prev => prev + finalTranscript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'no-speech') {
          recognition.start(); // Restart if no speech detected
        }
      };
      
      recognition.onend = () => {
        recognition.start(); // Restart when ended
      };
      
      speechRecognitionRef.current = recognition;
      recognition.start();
    }
  };

  // Stop speech detection
  const stopSpeechDetection = () => {
    if (speechDetectionRef.current) {
      speechDetectionRef.current.javascriptNode.disconnect();
      speechDetectionRef.current.audioContext.close();
      speechDetectionRef.current.stream.getTracks().forEach(track => track.stop());
      speechDetectionRef.current = null;
    }
    
    if (speechRecognitionRef.current) {
      speechRecognitionRef.current.stop();
      speechRecognitionRef.current = null;
    }
    
    stopSpeech();
  };

  // Timer functions
  const startTimer = () => {
    setTimeElapsed(0);
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Recording functions
  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await submitAnswer();
  };

  // Answer submission
  const submitAnswer = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post('https://api.crosscareers.com/insm/submit-answer', {
        question: questions[currentQuestionIndex].question,
        questionType: questions[currentQuestionIndex].type,
        transcript,
        timeSpent: timeElapsed
      });
      
      setTranscript(response.data.transcript || transcript);
      
      setProgress(prev => [...prev, {
        question: questions[currentQuestionIndex].question,
        type: questions[currentQuestionIndex].type,
        timeSpent: timeElapsed,
        transcript
      }]);
    } catch (error) {
      toast.error('Failed to submit answer. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Question navigation
  const nextQuestion = async () => {
    if (isRecording) {
      await stopRecording();
    }
    
    resetTimer();
    
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTranscript('');
      setTimeElapsed(0);
      startTimer();
      
      // Speak next question
      if (showVirtualInterviewer) {
        speakQuestion(questions[nextIndex].question);
      }
    } else {
      await completeInterview();
    }
  };

  // Interview completion
  const completeInterview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('https://api.crosscareers.com/insm/complete', {
        questions: questions.map((q, idx) => ({
          question: q.question,
          type: q.type,
          index: idx
        })),
        progress
      });
      
      setAnalysis(response.data);
      setStep(3);
      
      await axios.post('https://api.crosscareers.com/insm/save-history', {
        questions,
        analysis: response.data,
        date: new Date().toISOString()
      });
    } catch (error) {
      toast.error('Failed to complete interview. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
      stopSpeechDetection();
      resetTimer();
    }
  };

  // Download results as PDF
  const downloadResults = async () => {
    try {
      setIsLoading(true);
      
      // Create PDF using html2canvas and jsPDF
      const input = resultsRef.current;
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save('interview-results.pdf');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const shareResults = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Interview Results',
          text: `I scored ${analysis.overallScore}% on my interview practice!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // Helper functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Clean up
  useEffect(() => {
    return () => {
      stopSpeechDetection();
      resetTimer();
      stopSpeech();
    };
  }, []);

  // Load voices when component mounts
  useEffect(() => {
    if (isSpeechSynthesisSupported()) {
      // Some browsers need this to populate voices
      window.speechSynthesis.onvoiceschanged = () => {
        console.log('Voices loaded');
      };
      
      // Force voices to load
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Interview Practice</h1>
          
          {/* Step 1: Input Job Description or Upload Document */}
          {step === 1 && (
            <form onSubmit={handleSubmit(generateQuestions)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Practice Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPracticeMode('full')}
                    className={`p-4 border rounded-lg transition-all ${practiceMode === 'full' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="flex flex-col items-center">
                      <FiAward className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="font-medium">Full Mock</span>
                      <span className="text-sm text-gray-600">3 Tech + 2 Scenario</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPracticeMode('technical')}
                    className={`p-4 border rounded-lg transition-all ${practiceMode === 'technical' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="flex flex-col items-center">
                      <FiBookOpen className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="font-medium">Technical Only</span>
                      <span className="text-sm text-gray-600">5 Questions</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPracticeMode('scenario')}
                    className={`p-4 border rounded-lg transition-all ${practiceMode === 'scenario' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'}`}
                  >
                    <div className="flex flex-col items-center">
                      <FiClock className="w-6 h-6 mb-2 text-blue-600" />
                      <span className="font-medium">Scenario Only</span>
                      <span className="text-sm text-gray-600">5 Questions</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Paste Job Description
                </label>
                <textarea
                  {...register('jobDescription')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Paste the job description here..."
                />
              </div>
              
              <div className="text-center text-gray-500 font-medium">OR</div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Upload Document (PDF, DOCX, TXT)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 relative overflow-hidden">
                    {!fileName ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FiUpload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOCX, TXT (MAX. 5MB)</p>
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <FiUpload className="w-6 h-6 text-blue-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">{fileName}</p>
                        {isUploading && (
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                    <input
                      {...register('document')}
                      type="file"
                      className="hidden"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                
                {fileName && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {fileName}
                    </span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setFileName('');
                        setFile(null);
                        setValue('document', null);
                        setUploadProgress(0);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                )}
                
                {jobDescription && (
                  <p className="mt-2 text-sm text-gray-500">
                    Note: If both fields are filled, the job description text will be prioritized.
                  </p>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={showVirtualInterviewer}
                    onChange={(e) => setShowVirtualInterviewer(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Enable Virtual Interviewer</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || (!jobDescription && !file)}
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 ${
                  (isLoading || (!jobDescription && !file)) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Generating Questions...' : 'Start Practice'}
              </button>
            </form>
          )}
          
          {/* Step 2: Interview Session */}
          {step === 2 && questions.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Question {currentQuestionIndex + 1} of {questions.length}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({questions[currentQuestionIndex].type === 'technical' ? 'Technical' : 'Scenario'})
                  </span>
                </h2>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${isSpeaking ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    <FiMic className="inline mr-1" />
                    {isSpeaking ? 'Speaking' : 'Silent'}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                    {formatTime(timeElapsed)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  {showVirtualInterviewer && (
                    <div className="mb-4 flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">AI</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 animate-fade-in">
                          {virtualInterviewerText}
                          {isSpeakingAI && (
                            <span className="ml-2 inline-flex items-center">
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mx-0.5"></span>
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mx-0.5" style={{ animationDelay: '0.2s' }}></span>
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mx-0.5" style={{ animationDelay: '0.4s' }}></span>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {questions[currentQuestionIndex].type === 'technical' ? 'Technical' : 'Scenario-Based'}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    {questions[currentQuestionIndex].question}
                  </h3>
                  
                  <div className="mt-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Answer Transcript
                    </label>
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="Your answer will appear here as you speak..."
                    />
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg overflow-hidden relative aspect-video">
                  <Webcam
                    ref={webcamRef}
                    audio={false} // Disable audio to prevent feedback
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={`flex items-center justify-center p-3 rounded-full shadow-lg ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-white hover:bg-gray-100'} transition duration-200`}
                    >
                      {isRecording ? (
                        <span className="w-5 h-5 bg-white rounded-sm"></span>
                      ) : (
                        <FiMic className="w-5 h-5 text-gray-800" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-500">
                  {isRecording ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                      Recording...
                    </span>
                  ) : (
                    'Press the microphone button to start recording your answer'
                  )}
                </div>
                
                <button
                  onClick={nextQuestion}
                  disabled={isLoading}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Interview'}
                  <FiSkipForward className="ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Results */}
          {step === 3 && analysis && (
            <div ref={resultsRef} className="space-y-8 p-4 bg-white">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Interview Results</h2>
                <p className="text-gray-600">Here&apos;s your performance analysis and feedback</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Overall Score</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={analysis.overallScore >= 95 ? '#10B981' : analysis.overallScore >= 80 ? '#3B82F6' : '#EF4444'}
                        strokeWidth="3"
                        strokeDasharray={`${analysis.overallScore}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <span className="text-2xl font-bold text-gray-800">{analysis.overallScore}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-700">
                  {analysis.overallScore >= 95 ? 'Excellent! You have strong knowledge in this area.' : 
                   analysis.overallScore >= 80 ? 'Good job! You have solid understanding but room for improvement.' : 
                   'Keep practicing! Review the suggested answers to improve.'}
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Detailed Feedback</h3>
                
                {analysis.questionAnalysis.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-800">{item.question}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.score >= 90 ? 'bg-green-100 text-green-800' : 
                        item.score >= 70 ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.score}%
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{item.userAnswer || 'No transcript available'}</p>
                    </div>
                    
                    {item.score < 95 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Suggested Answer:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{item.suggestedAnswer}</p>
                      </div>
                    )}
                    
                    {item.feedback && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Feedback:</p>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{item.feedback}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Improvement Suggestions</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {analysis.improvementSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-center pt-6 space-x-4">
                <button
                  onClick={downloadResults}
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50"
                >
                  <FiDownload className="mr-2" />
                  Download Report
                </button>
                
                <button
                  onClick={shareResults}
                  disabled={isLoading}
                  className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition duration-200 disabled:opacity-50"
                >
                  <FiShare2 className="mr-2" />
                  Share Results
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Question Bank</h3>
                <p className="text-gray-600 mb-4">Practice these common questions to improve your skills:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.commonQuestions?.map((q, i) => (
                    <div key={i} className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm text-gray-500 mt-1">{q.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default InterviewPractice;