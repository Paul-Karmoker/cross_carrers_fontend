/* eslint-disable react/prop-types */
import InputField from "../../Components/InputField";
import {
  updateCareerObjective,
  updateCareerSummary,
} from "../../context/resumeSlice";

export default function ResumeObjectiveAndSummary({
  resume,
  dispatch,
  errors,
  handleGetCareerObjective,
  handleGetCareerSummary,
  loadingStates,
}) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Career Objective & Summary
      </h3>
      <div className="space-y-4">
        <div>
          <InputField
            label="Career Objective"
            type="textarea"
            value={resume.careerObjective}
            onChange={(e) => dispatch(updateCareerObjective(e.target.value))}
            error={errors.careerObjective}
          />
          <button
            type="button"
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
            onClick={handleGetCareerObjective}
            disabled={loadingStates.careerObjective}
            aria-label="Get AI-generated career objective"
          >
            {loadingStates.careerObjective ? (
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
                Generating...
              </>
            ) : (
              "Get AI Career Objective"
            )}
          </button>
          {errors.careerObjective && (
            <div className="text-red-500 text-sm mt-1">
              {errors.careerObjective}
            </div>
          )}
        </div>
        <div>
          <InputField
            label="Career Summary"
            type="textarea"
            value={resume.careerSummary}
            onChange={(e) => dispatch(updateCareerSummary(e.target.value))}
            error={errors.careerSummary}
          />
          <button
            type="button"
            className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
            onClick={handleGetCareerSummary}
            disabled={loadingStates.careerSummary}
            aria-label="Get AI-generated career summary"
          >
            {loadingStates.careerSummary ? (
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
                Generating...
              </>
            ) : (
              "Get AI Career Summary"
            )}
          </button>
          {errors.careerSummary && (
            <div className="text-red-500 text-sm mt-1">
              {errors.careerSummary}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
