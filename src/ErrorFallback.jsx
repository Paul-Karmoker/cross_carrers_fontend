import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
 
  React.useEffect(() => {
    toast.error('An unexpected error occurred. Please try again.');
  }, [error]);

  return (
    <div role="alert" className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-bold text-red-600">Something Went Wrong</h2>
        <pre className="mb-4 max-h-40 overflow-auto rounded bg-gray-50 p-2 text-sm text-gray-700">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired
};

export default ErrorFallback;