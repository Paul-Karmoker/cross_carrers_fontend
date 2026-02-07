// ExcelGenerator.jsx
import  { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { toast } from 'react-hot-toast';

const ExcelGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [formatInstructions, setFormatInstructions] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      toast.success(`File attached: ${acceptedFiles[0].name}`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const generateExcel = async () => {
    if (!inputText.trim() && !file) {
      toast.error('Input data or a file is required');
      return;
    }
    if (!formatInstructions.trim()) {
      toast.error('Format instructions are required');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('inputText', inputText);
      formData.append('formatInstructions', formatInstructions);

      const response = await axios.post(
        'http://localhost:4001/api/v1/excel/generate-excel',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          responseType: 'blob',
          timeout: 60000 
        }
      );

      const timestamp = new Date().getTime();
      saveAs(response.data, `Report_${timestamp}.xlsx`);
      toast.success('Excel generated successfully');
    } catch (error) {
      toast.error('Failed to generate template. Please check your inputs.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mt-[120px] mx-auto my-12 bg-white border border-gray-300 rounded-none overflow-hidden">
      {/* Header Section */}
      <div className="bg-gray-50 border-b border-gray-300 p-8">
        <h1 className="text-2xl font-light tracking-tight text-gray-900">
          EXCEL <span className="font-bold text-blue-600">GENERATOR</span>
        </h1>
        <p className="text-sm text-gray-500 mt-2 max-w-2xl">
          Professional AI utility for converting documents and raw text into structured XLSX templates with custom logic and formatting.
        </p>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Input */}
        <div className="space-y-6">
          <section>
            <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-3 block">
              Step 01: Source Data
            </label>
            <div
              {...getRootProps()}
              className={`border border-dashed p-8 text-center cursor-pointer transition-all duration-150 ${
                isDragActive ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-300 hover:border-gray-500'
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="py-2">
                  <p className="text-sm font-semibold text-gray-800">{file.name}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="text-xs text-red-600 mt-2 underline uppercase font-bold"
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 font-medium">Click to upload or drag file</p>
                  <p className="text-[10px] text-gray-400 uppercase">PDF, DOCX, XLSX, TXT (10MB Max)</p>
                </div>
              )}
            </div>
            
            <div className="relative my-6 flex items-center justify-center">
               <div className="absolute w-full border-t border-gray-200"></div>
               <span className="relative bg-white px-4 text-[10px] font-bold text-gray-400 uppercase">OR PASTE TEXT</span>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full h-40 p-4 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-gray-300"
              placeholder="Enter or paste raw data here..."
            />
          </section>
        </div>

        {/* Right Column: Instructions */}
        <div className="space-y-6">
          <section>
            <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 mb-3 block">
              Step 02: AI Formatting Instructions
            </label>
            <textarea
              value={formatInstructions}
              onChange={(e) => setFormatInstructions(e.target.value)}
              className="w-full h-[322px] p-4 border border-gray-300 rounded-none text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-gray-50 placeholder:text-gray-400"
              placeholder="Example: Define columns for Date, Name, and Status. Make headers bold with a light blue background. Add a formula in Column D to calculate tax."
            />
          </section>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 pt-0 border-t border-gray-100 mt-4 flex flex-col md:flex-row items-center gap-4">
        <button
          onClick={generateExcel}
          disabled={isLoading || (!inputText && !file) || !formatInstructions}
          className={`w-full md:w-auto px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest transition-all ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 active:translate-y-0.5'
          }`}
        >
          {isLoading ? 'Processing...' : 'Generate Excel File'}
        </button>
        
        <button
          onClick={() => { setInputText(''); setFormatInstructions(''); setFile(null); }}
          className="w-full md:w-auto px-10 py-4 border border-gray-300 text-gray-600 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
        >
          Clear All
        </button>

        <p className="text-[10px] text-gray-400 font-medium uppercase md:ml-auto">
          Powered by Gemini Pro AI
        </p>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-900 py-2 px-8">
        <p className="text-[9px] text-gray-400 tracking-[1px] uppercase text-center md:text-left">
          Confidential Processing • Secure Data Environment • 2026 Engine
        </p>
      </div>
    </div>
  );
};

export default ExcelGenerator;