import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../context/resumeSlice';

// Helper to determine if a template is "new" or "popular" for UI tags
const isNew = (templateName) => ['Smart', 'Ella Elmer', 'Martha Valer'].includes(templateName); // Example logic
const isPopular = (templateName) => ['OATS', 'Classy'].includes(templateName); // Example logic

const templates = [
  { name: 'Harry Hanson', class: 'bg-yellow-50 text-gray-800', preview: 'harry-hanson-preview.png', tags: ['New'] },
  { name: 'Ella Elmer', class: 'bg-white text-indigo-600', preview: 'ella-elmer-preview.png', tags: ['New'] },
  { name: 'Martha Valer', class: 'bg-gray-200 text-purple-700', preview: 'martha-valer-preview.png', tags: ['New'] },
  { name: 'James Snow', class: 'bg-blue-50 rounded-full p-2', preview: 'james-snow-preview.png' },
  { name: 'Smart', class: 'bg-white font-sans text-gray-800 shadow-inner', preview: 'smart-preview.png', tags: ['Popular'] },
  { name: 'OATS', class: 'bg-white grid-cols-2 gap-4', preview: 'oats-preview.png' },
  { name: 'Classy', class: 'bg-ivory font-serif text-brown-700', preview: 'classy-preview.png', tags: ['Popular'] },
  { name: 'Bubbles', class: 'bg-blue-50 rounded-full p-2', preview: 'bubbles-preview.png' },
  { name: 'Joseph Bear', class: 'bg-black text-white', preview: 'joseph-bear-preview.png' },
  { name: 'Walter Snow', class: 'bg-gray-100 text-gray-800', preview: 'walter-snow-preview.png' },
  { name: 'Jennifer Smith', class: 'bg-white text-blue-600', preview: 'jennifer-smith-preview.png' },
  { name: 'Themis', class: 'bg-gray-800 text-white', preview: 'themis-preview.png' },
  // Add more templates as needed, potentially with specific preview images
];


const TemplateSelector = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTemplate = useSelector((state) => state.resume.template);

  useEffect(() => {
    if (currentTemplate && !selectedTemplate) {
      setSelectedTemplate(currentTemplate);
    }
  }, [currentTemplate, selectedTemplate]);

  const handleSelect = (template) => {
    setSelectedTemplate(template.name);
    dispatch(setTemplate(template.name));
  };

  const handleConfirm = () => {
    if (selectedTemplate) {
      navigate('/editor');
    } else {
      alert('Please select a template before proceeding!');
    }
  };

  const handleSkip = () => {
    navigate('/editor');
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Select a template</h1>
            <p className="text-lg text-gray-600">Filter by profession</p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md transition-colors duration-200"
            onClick={handleSkip}
            aria-label="Skip template selection"
          >
            Skip
          </button>
        </div>

        {/* Search/Filter Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search templates or filter by profession..."
            className="w-full md:w-2/3 lg:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Filter templates by profession"
          />
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredTemplates.map((temp) => (
            <div
              key={temp.name}
              className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
                          ${selectedTemplate === temp.name ? 'ring-4 ring-indigo-500 border-transparent' : 'border border-gray-200 hover:border-gray-300'}
                          cursor-pointer overflow-hidden group`}
              onClick={() => handleSelect(temp)}
              onKeyPress={(e) => e.key === 'Enter' && handleSelect(temp)}
              tabIndex={0}
              role="button"
              aria-label={`Select ${temp.name} template`}
            >
              {/* "New" or "Popular" Tag */}
              {temp.tags && temp.tags.includes('New') && (
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">New</span>
              )}
               {temp.tags && temp.tags.includes('Popular') && (
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Popular</span>
              )}

              {/* Template Preview Area - This is where an actual resume preview image would go */}
              <div className="h-60 bg-gray-100 flex items-center justify-center text-gray-500 border-b border-gray-200">
                  {/*
                    To fully match your image, you would replace this div with an <img> tag
                    pointing to a pre-rendered image of each resume template.
                    For example: <img src={`/images/${temp.preview}`} alt={`${temp.name} preview`} className="w-full h-full object-cover"/>
                    For this demo, we'll keep a placeholder text or a very basic color fill.
                  */}
                  {/* For a more realistic demo without actual images, let's simulate the background colors */}
                  <div className={`w-full h-full flex items-center justify-center ${temp.class} p-4 text-center`}>
                     {/* If you have actual image files, uncomment the line below and adjust path */}
                     {/* <img src={`/images/${temp.preview}`} alt={`${temp.name} preview`} className="w-full h-full object-contain"/> */}
                     <span className="text-lg font-medium text-gray-700 opacity-75 group-hover:opacity-100 transition-opacity">
                         {temp.name} Preview
                     </span>
                  </div>
              </div>

              {/* Template Name */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 text-center">{temp.name}</h3>
              </div>

              {/* Checkmark for selection */}
              {selectedTemplate === temp.name && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-500 bg-opacity-20 transition-opacity duration-300">
                  <svg className="h-12 w-12 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Confirmation Button - Aligned to bottom right */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex justify-end">
          <button
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold
                       hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
                       transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={handleConfirm}
            disabled={!selectedTemplate}
            aria-label="Confirm selected template"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;