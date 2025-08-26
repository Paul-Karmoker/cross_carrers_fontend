/* eslint-disable react/prop-types */

export default function ResumeActions({
  resumeId,
  isCreating,
  isUpdating,
  isDeleting,
  handleDelete,
}) {
  return (
    <div className="flex gap-4 justify-center">
      <button
        type="submit"
        className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
        disabled={isCreating || isUpdating}
        aria-label="Save and Generate Resume"
      >
        {isCreating || isUpdating ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Saving...
          </>
        ) : (
          "Save & Generate Resume"
        )}
      </button>
      {resumeId && (
        <button
          type="button"
          className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 disabled:bg-red-400 flex items-center"
          onClick={handleDelete}
          disabled={isDeleting}
          aria-label="Delete Resume"
        >
          {isDeleting ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Deleting...
            </>
          ) : (
            "Delete Resume"
          )}
        </button>
      )}
    </div>
  );
}
