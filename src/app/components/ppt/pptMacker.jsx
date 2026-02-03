/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { FiUpload, FiCopy, FiDownload, FiYoutube, FiCheckCircle, FiSettings } from 'react-icons/fi';
import { FaYoutube, FaFilePdf, FaFileWord, FaMagic } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import mammoth from 'mammoth';

const PPTGenerator = () => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [presentationId, setPresentationId] = useState(null);
  const [activeTab, setActiveTab] = useState('text');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const fileInputRef = useRef(null);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      slideCount: 10,
      design: 'modern',
      includeCharts: true,
      includeTables: true,
      includeIcons: true
    }
  });

  // Watch for form values to show live "features" summary
  const formValues = watch();

  // --- LOGIC (Kept exactly as provided) ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type === 'application/pdf') {
      extractTextFromPDF(file);
      setActiveTab('pdf');
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractTextFromDocx(file);
      setActiveTab('docx');
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target.result);
        toast.success('Text file uploaded successfully!');
      };
      reader.readAsText(file);
    } else {
      toast.error('Unsupported file type');
    }
  };

  const extractTextFromPDF = async (file) => {
    const toastId = toast.loading('Extracting text from PDF...');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      // eslint-disable-next-line no-undef
      const pdfData = await pdf(data); 
      setContent(pdfData.text);
      toast.dismiss(toastId);
      toast.success('PDF content extracted!');
    } catch (error) {
      console.error('PDF extraction error:', error);
      toast.dismiss(toastId);
      toast.error('Failed to extract PDF content');
    }
  };

  const extractTextFromDocx = async (file) => {
    const toastId = toast.loading('Extracting text from Word...');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setContent(result.value);
      toast.dismiss(toastId);
      toast.success('Word content extracted!');
    } catch (error) {
      console.error('DOCX extraction error:', error);
      toast.dismiss(toastId);
      toast.error('Failed to extract Word content');
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text/plain');
    if (pastedText) {
      setContent(pastedText);
      toast.success('Content pasted!');
    }
  };

  const handleYoutubeSubmit = (e) => {
    e.preventDefault();
    if (!youtubeUrl) {
      toast.error('Please enter a YouTube URL');
      return;
    }
    toast.loading('Extracting transcript...');
    setTimeout(() => {
      setContent("Transcript from YouTube video would appear here");
      toast.dismiss();
      toast.success('YouTube transcript extracted!');
    }, 3000);
  };

  const onSubmit = async (data) => {
    if (!content.trim()) {
      toast.error('Please provide some content first');
      return;
    }

    setIsGenerating(true);
    const toastId = toast.loading('AI is crafting your presentation...');

    try {
      const response = await axios.post('http://localhost:4001/api/v1/ppt/generate', {
        content,
        slideCount: data.slideCount,
        design: data.design,
        generateNarrative: true,
        includeVisuals: true,
        includeCharts: data.includeCharts,
        includeTables: data.includeTables,
        includeIcons: data.includeIcons,
        chartTypes: ['bar', 'pie', 'line'],
        tableStyles: ['modern', 'colorful'],
        iconSets: ['business', 'technology', 'finance']
      });

      setPresentationId(response.data.id);
      toast.dismiss(toastId);
      toast.success('Presentation generated successfully!');
    } catch (error) {
      console.error('Error generating PPT:', error);
      toast.dismiss(toastId);
      toast.error('Failed to generate presentation');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPPT = async () => {
    if (!presentationId) return;
    const toastId = toast.loading('Downloading...');
    try {
      const response = await axios.get(
        `http://localhost:4001/api/v1/ppt/download/pptx/${presentationId}`,
        { responseType: 'blob' }
      );
      const url = URL.createObjectURL(response.data);
      saveAs(url, `presentation.pptx`);
      toast.dismiss(toastId);
      toast.success('Download started!');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Download failed');
    }
  };

  // --- VIEW ---
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4 text-indigo-600">
            <FaMagic className="text-2xl animate-pulse" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            AI Presentation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Architect</span>
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto text-lg">
            Convert documents, videos, or raw text into professional PowerPoint decks in seconds.
          </p>
        </div>

        <div className="bg-white  overflow-hidden border border-slate-100">
          <div className="flex flex-col md:flex-row">
            
            {/* Left Column: Input Source */}
            <div className="w-full md:w-2/3 p-8 border-r border-slate-100">
              <div className="mb-6">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Select Source</h2>
                <nav className="flex p-1 bg-slate-100  space-x-1">
                  {[
                    { id: 'text', icon: <FiCopy />, label: 'Text' },
                    { id: 'youtube', icon: <FaYoutube />, label: 'YouTube' },
                    { id: 'docx', icon: <FaFileWord />, label: 'Word' },
                    { id: 'pdf', icon: <FaFilePdf />, label: 'PDF' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.id);
                        if(tab.id === 'docx' || tab.id === 'pdf') fileInputRef.current?.click();
                      }}
                      className={`flex-1 flex items-center justify-center py-2.5 text-sm font-medium  transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-white text-indigo-600 shadow-sm'
                          : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Dynamic Input Areas */}
              <div className="min-h-[300px] transition-all duration-300">
                {activeTab === 'text' && (
                  <textarea
                    className="w-full h-[300px] p-4 bg-slate-50 border-0  focus:ring-2 focus:ring-indigo-500 text-slate-700 placeholder-slate-400 transition-all resize-none"
                    placeholder="Paste your presentation core content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onPaste={handlePaste}
                  />
                )}

                {activeTab === 'youtube' && (
                  <div className="flex flex-col items-center justify-center h-[300px] bg-slate-50  p-6 border-[1px] border-dashed border-slate-200">
                    <div className="w-16 h-16 bg-red-100 text-red-600  flex items-center justify-center mb-4">
                      <FiYoutube className="text-3xl" />
                    </div>
                    <div className="flex w-full max-w-md gap-2">
                      <input
                        type="text"
                        placeholder="YouTube Video URL..."
                        className="flex-1 px-4 py-2  border-[1px] outline-none"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <button 
                        onClick={handleYoutubeSubmit}
                        className="bg-red-600 text-white px-6 py-2 font-medium hover:bg-red-700 transition shadow-lg shadow-red-200"
                      >
                        Extract
                      </button>
                    </div>
                  </div>
                )}

                {(activeTab === 'docx' || activeTab === 'pdf') && (
                  <div className="flex flex-col items-center justify-center h-[300px] bg-slate-50  p-6 border-[1px] border-dashed border-slate-200">
                    {activeTab === 'docx' ? <FaFileWord className="text-5xl text-blue-500 mb-4" /> : <FaFilePdf className="text-5xl text-red-500 mb-4" />}
                    <p className="text-slate-600 font-medium mb-4">Upload your {activeTab.toUpperCase()} file</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-6 py-3 bg-white border-[1px] text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition shadow-sm"
                    >
                      <FiUpload className="mr-2" /> Browse Files
                    </button>
                    <input type="file" className="sr-only" onChange={handleFileUpload} ref={fileInputRef} accept={activeTab === 'docx' ? ".docx" : ".pdf"} />
                  </div>
                )}

                {content && activeTab !== 'text' && (
                  <div className="mt-4 p-4 bg-indigo-50/50  border-[1px]  animate-in fade-in slide-in-from-bottom-2">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase mb-1">Extracted Preview:</h4>
                    <p className="text-sm text-slate-600 line-clamp-3 italic">{content}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Settings */}
            <div className="w-full md:w-1/3 p-8 bg-slate-50/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center text-slate-700 font-bold mb-2">
                  <FiSettings className="mr-2" /> <span>Configuration</span>
                </div>
                
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Slides</label>
                  <select {...register('slideCount')} className="w-full mt-1 bg-white border border-slate-200  px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500">
                    {[...Array(43)].map((_, i) => (
                      <option key={i + 3} value={i + 3}>{i + 3} Slides</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Theme</label>
                  <select {...register('design')} className="w-full mt-1 bg-white border border-slate-200  px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 capitalize">
                    {['modern', 'professional', 'creative', 'minimalist'].map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Inclusions</label>
                  {[
                    { id: 'includeCharts', label: 'Data Charts' },
                    { id: 'includeTables', label: 'Smart Tables' },
                    { id: 'includeIcons', label: 'Visual Icons' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center group cursor-pointer">
                      <div className="relative flex items-center">
                        <input type="checkbox" {...register(item.id)} className="peer sr-only" />
                        <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-5"></div>
                      </div>
                      <span className="ml-3 text-sm text-slate-600 font-medium group-hover:text-indigo-600 transition-colors">{item.label}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isGenerating || !content.trim()}
                    className={`w-full flex items-center justify-center py-4 px-6 text-white font-bold transition-all duration-300 ${
                      isGenerating || !content.trim() 
                      ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                      : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 hover:-translate-y-1'
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white  animate-spin mr-3"></div>
                        Designing...
                      </div>
                    ) : (
                      'Generate Now'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Warning/Info Footer */}
        <div className="mt-8">
           <p className="text-center font-medium text-red-500/80 text-sm animate-pulse">
             ⚠️ Please review and refine the generated document to ensure absolute accuracy.
           </p>
        </div>

        {/* Ready State Modal/Section */}
        {presentationId && (
          <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl shadow-emerald-200 animate-in zoom-in-95 duration-500">
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start">
                <FiCheckCircle className="mr-3" /> Creation Complete!
              </h3>
              <p className="opacity-90 mt-1">Your presentation is optimized and ready for download.</p>
            </div>
            <button
              onClick={downloadPPT}
              className="bg-white text-emerald-600 px-8 py-4  font-bold flex items-center hover:bg-slate-50 transition transform hover:scale-105 active:scale-95"
            >
              <FiDownload className="mr-2 text-xl" /> Download .pptx
            </button>
          </div>
        )}

        {/* Bottom Feature Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
           {['AI-Driven Layouts', 'Responsive Charts', 'Auto-Narrative', 'Modern Icons'].map(feat => (
             <div key={feat} className="text-center p-4 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-widest">
               {feat}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default PPTGenerator;