// src/components/InputField.js

// eslint-disable-next-line react/prop-types
const InputField = ({ label, name, value, onChange, type = 'text', className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />
    )}
  </div>
);

export default InputField;