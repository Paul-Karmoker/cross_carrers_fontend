/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

// PDF.js Legacy Build for maximum compatibility
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.min?url';

import { 
  Upload, 
  Download, 
  RefreshCcw, 
  FileText,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

// Global Worker Setup
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const ContentGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [previewContent, setPreviewContent] = useState(null);
  const [activeTab, setActiveTab] = useState('input');
  const fileInputRef = useRef(null);

  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      contentType: 'report',
      tone: 'professional',
      wordCount: 500,
      pageCount: 1,
      includeCharts: true,
      includeImages: false,
      userInput: '',
    },
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      toast.error('File exceeds 15MB security limit');
      return;
    }

    setLoading(true);
    const id = toast.loading('Extracting document intelligence...');

    try {
      let content = '';
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ 
          data: arrayBuffer,
          useWorkerFetch: true,
          isEvalSupported: false 
        });
        const pdf = await loadingTask.promise;
        
        let textSegments = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          textSegments.push(textContent.items.map(s => s.str).join(' '));
        }
        content = textSegments.join('\n\n');
      } 
      else if (file.type.includes('wordprocessingml')) {
        const buffer = await file.arrayBuffer();
        const res = await mammoth.extractRawText({ arrayBuffer: buffer });
        content = res.value;
      } 
      else if (file.type.includes('sheet') || file.type.includes('excel')) {
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(buffer);
        content = wb.SheetNames.map(n => XLSX.utils.sheet_to_csv(wb.Sheets[n])).join('\n\n');
      } 
      else {
        content = await file.text();
      }

      setFileContent(content);
      toast.success('Source context ingested', { id });
    } catch (err) {
      toast.error(`Extraction Failed: ${err.message}`, { id });
    } finally {
      setLoading(false);
    }
  };

  const generateContent = async (data) => {
    if (!fileContent && !data.userInput) {
      toast.error('Input required: Upload a file or enter text');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('https://api.crosscareers.com/api/v1/doc/generate-content', {
        ...data,
        sourceText: fileContent || data.userInput,
      });
      const raw = res.data.content || res.data;
      setPreviewContent({
        title: raw.title || 'Analysis Report',
        subtitle: raw.subtitle || 'Intelligence Output',
        sections: raw.sections || []
      });
      setActiveTab('preview');
      toast.success('Generation complete');
    } catch (err) {
      toast.error('Engine connection failed');
    } finally {
      setLoading(false);
    }
  };

  const downloadDocx = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://api.crosscareers.com/api/v1/doc/generate-docx', {
        content: previewContent,
        documentType: watch('contentType'),
        style: watch('tone')
      }, { responseType: 'blob' });
      saveAs(res.data, `${previewContent.title.toLowerCase().replace(/\s+/g, '-')}.docx`);
    } catch (err) {
      toast.error('Export failed');
    } finally {
      setLoading(false);
    }
  };

  // UI Components
  const SidebarLabel = ({ children }) => (
    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-2">
      {children}
    </label>
  );

  const InputFieldStyle = "w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none";

  return (
    <div className="min-h-screen  mt-20 text-[#1A1A1A] font-sans antialiased">
      <Toaster position="top-right" />
      

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        
        {/* Sidebar Configuration */}
        <aside className="w-full lg:w-[420px] mt-6 border-[1px] border-gray-200 bg-white/50 backdrop-blur-sm p-8">
          <div className="sticky top-0 space-y-8">
            <div className="flex gap-1 p-1 bg-gray-100/80 rounded-xl border border-gray-200">
              <button 
                onClick={() => setActiveTab('input')}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'input' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'}`}
              >
                Configuration
              </button>
              <button 
                onClick={() => previewContent && setActiveTab('preview')}
                disabled={!previewContent}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-black'} disabled:opacity-30`}
              >
                Output Preview
              </button>
            </div>

            {activeTab === 'input' ? (
              <form onSubmit={handleSubmit(generateContent)} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <SidebarLabel>Document Architecture</SidebarLabel>
                    <select {...register('contentType')} className={InputFieldStyle}>
                      <option value="report">Enterprise Executive Report</option>
                      <option value="project_proposal">Strategic Project Proposal</option>
                      <option value="blog">Professional Editorial Article</option>
                      <option value="whitepaper">Technical Whitepaper</option>
                    </select>
                  </div>

                  <div>
                    <SidebarLabel>Linguistic Tone</SidebarLabel>
                    <select {...register('tone')} className={InputFieldStyle}>
                      <option value="professional">Corporate & Precise</option>
                      <option value="academic">Analytical & Formal</option>
                      <option value="creative">Innovative & Engaging</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <SidebarLabel>Word Limit</SidebarLabel>
                      <input type="number" {...register('wordCount')} className={InputFieldStyle} />
                    </div>
                    <div>
                      <SidebarLabel>Target Pages</SidebarLabel>
                      <input type="number" {...register('pageCount')} className={InputFieldStyle} />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <SidebarLabel>Optimization Modules</SidebarLabel>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('includeCharts')} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                      <span className="text-xs font-semibold text-gray-600 group-hover:text-black transition-colors">Generate Structural Data Viz</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" {...register('includeImages')} className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                      <span className="text-xs font-semibold text-gray-600 group-hover:text-black transition-colors">Include AI Media Assets</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-black/5 disabled:bg-gray-200"
                >
                  {loading ? <RefreshCcw className="animate-spin" size={16} /> : 'Process Intelligence'}
                  {!loading && <ChevronRight size={14} />}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="p-5 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-600/20">
                  <div className="flex items-start gap-3 mb-4">
                    <Info size={18} className="shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider">Ready for Export</p>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90">
                    Your document has been synthesized using professional document standards. Verified for structural integrity and tone consistency.
                  </p>
                </div>
                
                <button 
                  onClick={downloadDocx} 
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-blue-700 shadow-lg shadow-blue-600/10 flex items-center justify-center gap-3"
                >
                  <Download size={18} /> Export .DOCX
                </button>
                
                <button 
                  onClick={() => setActiveTab('input')}
                  className="w-full border-2 border-gray-100 text-gray-500 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-gray-50 hover:text-black transition-all"
                >
                  Re-Configure
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Workspace Area */}
        <section className="flex-1 p-6">
          {activeTab === 'input' ? (
            <div className=" mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              
              {/* File Dropzone */}
              <div 
                className="relative border-2 border-dashed border-gray-200  bg-white p-12 lg:p-20 text-center hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf,.docx,.xlsx,.txt" className="hidden" />
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Upload className="text-blue-600" size={32} />
                </div>
                <h2 className="text-xl font-black tracking-tight mb-2 uppercase">Ingest Primary Data</h2>
                <p className="text-sm text-gray-400 mb-6 font-medium uppercase tracking-tighter">PDF • DOCX • XLSX • TEXT (MAX 15MB)</p>
                
                {fileContent ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase border border-green-100">
                    <CheckCircle2 size={14} /> Data Stream Connected
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-50/50 inline-block px-3 py-1 rounded-full">
                    Cloud Processing Ready
                  </div>
                )}
              </div>

              {/* Text Area Context */}
              <div className="bg-white  border-[1px]  p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" />
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contextual Prompt Buffer</h3>
                  </div>
                  <span className="text-[10px] font-mono text-gray-300">RAW_TEXT_INJECTION</span>
                </div>
                <textarea
                  {...register('userInput')}
                  className="w-full h-64 border-none focus:ring-0 text-sm font-mono leading-relaxed placeholder:text-gray-300 resize-none bg-transparent"
                  placeholder="Insert supplemental instructions or additional notes to guide the generation engine..."
                />
              </div>
            </div>
          ) : (
            /* Document Preview State */
            <div className="max-w-[850px] mx-auto pb-20 animate-in fade-in zoom-in-95 duration-700">
               <div className="bg-white border border-gray-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm p-16 lg:p-24 min-h-[1100px] relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -rotate-45 translate-x-16 -translate-y-16" />
                
                {previewContent && (
                  <div>
                    <header className="border-b-[3px] border-black pb-12 mb-16">
                      <div className="flex justify-between items-start mb-8">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase bg-black text-white px-3 py-1">Confidential Intelligence Report</span>
                        <span className="text-[10px] font-mono text-gray-400">{new Date().toLocaleDateString()}</span>
                      </div>
                      <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
                        {previewContent.title}
                      </h1>
                      <p className="text-xl text-blue-600/60 font-medium italic tracking-tight">
                        {previewContent.subtitle}
                      </p>
                    </header>
                    
                    <div className="space-y-16">
                      {previewContent.sections.map((section, idx) => (
                        <section key={idx} className="group">
                          {section.title && (
                            <div className="flex items-center gap-4 mb-6">
                              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 shrink-0">
                                {section.title}
                              </h3>
                              <div className="h-[1px] bg-gray-100 w-full group-hover:bg-blue-100 transition-colors" />
                            </div>
                          )}
                          <p className="text-gray-800 leading-[1.8] text-base font-medium whitespace-pre-line">
                            {section.content}
                          </p>
                          {section.bullets?.length > 0 && (
                            <ul className="mt-8 space-y-4 border-l-2 border-gray-50 pl-6 ml-2">
                              {section.bullets.map((b, i) => (
                                <li key={i} className="flex gap-4 text-[15px] text-gray-600 font-medium italic leading-relaxed">
                                  <span className="text-black font-black">/</span> {b}
                                </li>
                              ))}
                            </ul>
                          )}
                        </section>
                      ))}
                    </div>

                    <footer className="mt-24 pt-12 border-t border-gray-100 flex justify-between items-center grayscale opacity-30">
                       <span className="text-[9px] font-black uppercase tracking-widest">CrossCareers.AI / System Generated</span>
                       <span className="text-[9px] font-mono uppercase tracking-widest">Page 01 of 01</span>
                    </footer>
                  </div>
                )}
               </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ContentGenerator;