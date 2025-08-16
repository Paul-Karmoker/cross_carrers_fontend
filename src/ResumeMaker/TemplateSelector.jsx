// src/pages/TemplateSelector.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTemplate } from '../context/resumeSlice';

const templates = [
  { name: 'Smart', class: 'bg-white font-sans text-gray-800' },
  { name: 'Sharp', class: 'bg-gray-100 font-serif border-sharp' },
  { name: 'OATS', class: 'bg-white grid-ats' },
  { name: 'Classy', class: 'bg-ivory font-elegant' },
  { name: 'Bubbles', class: 'bg-light-blue rounded-bubbles' },
  { name: 'Ladder', class: 'bg-white ladder-layout' },
  { name: 'White', class: 'bg-white minimalist' },
  { name: 'Imessage', class: 'bg-chat bubbles-chat' },
  { name: 'Puddle', class: 'bg-gradient-puddle' },
  { name: 'Themis', class: 'bg-dark professional' },
  { name: 'Traditional', class: 'bg-white traditional-font' },
  { name: 'Minimalist', class: 'bg-white clean-lines' },
  { name: 'Combined', class: 'bg-gray-50 combined-sections' },
  { name: 'Harry Hanson', class: 'bg-beige creative' },
  { name: 'Ella Elmer', class: 'bg-white modern' },
  { name: 'Martha Valer', class: 'bg-light-gray artistic' },
];

const TemplateSelector = () => {
  // eslint-disable-next-line no-unused-vars
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelect = (template) => {
    setSelected(template.name);
    dispatch(setTemplate(template.name));
    navigate('/editor/1');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Select a template</h1>
      <select className="mb-4 border p-2 rounded"> 
        <option>Filter by profession</option>
        {/* Add options */}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {templates.map((temp) => (
          <div key={temp.name} className="border rounded-lg p-4 cursor-pointer hover:shadow-lg" onClick={() => handleSelect(temp)}>
            <div className="h-48 bg-gray-200 mb-2"></div> {/* Placeholder for preview image */}
            <h3 className="text-center font-semibold">{temp.name}</h3>
          </div>
        ))}
      </div>
      <button className="mt-4 text-gray-500 hover:underline">Skip</button>
    </div>
  );
};

export default TemplateSelector;