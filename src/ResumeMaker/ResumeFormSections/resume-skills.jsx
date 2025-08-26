/* eslint-disable react/prop-types */

import InputField from "../../Components/InputField";
import { addSkillCategory, addSkillToCategory, removeSkillCategory, removeSkillFromCategory, updateSkillCategory, updateSkillInCategory } from "../../context/resumeSlice";

export default function ResumeSkills({ resume, errors, handleGetSkillsSuggestion, dispatch, loadingStates }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Skills</h3>
      <button
        type="button"
        className="mb-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center"
        onClick={handleGetSkillsSuggestion}
        disabled={loadingStates.skills}
        aria-label="Get AI-generated skills suggestion"
      >
        {loadingStates.skills ? (
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
          "Get AI Skills Suggestion"
        )}
      </button>
      {errors.skills && (
        <div className="text-red-500 text-sm mb-2">{errors.skills}</div>
      )}
      {resume.skills.map((cat, catIndex) => (
        <div key={catIndex} className="border p-4 mb-4 rounded-md bg-gray-50">
          <InputField
            label="Category"
            name="category"
            value={cat.category}
            onChange={(e) =>
              dispatch(
                updateSkillCategory({
                  index: catIndex,
                  category: e.target.value,
                })
              )
            }
            required
            error={errors[`skills[${catIndex}].category`]}
          />
          {cat.skills.map((skill, skillIndex) => (
            <div key={skillIndex} className="flex gap-4 mb-2 items-end">
              <InputField
                label="Skill Name"
                name="name"
                value={skill.name}
                onChange={(e) =>
                  dispatch(
                    updateSkillInCategory({
                      catIndex,
                      skillIndex,
                      data: { name: e.target.value },
                    })
                  )
                }
                className="flex-1"
                required
                error={errors[`skills[${catIndex}][${skillIndex}].name`]}
              />
              <div className="flex-1">
                <label
                  htmlFor={`skill-level-${catIndex}-${skillIndex}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Level
                </label>
                <select
                  id={`skill-level-${catIndex}-${skillIndex}`}
                  name="level"
                  value={skill.level || ""}
                  onChange={(e) =>
                    dispatch(
                      updateSkillInCategory({
                        catIndex,
                        skillIndex,
                        data: { level: e.target.value },
                      })
                    )
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                {errors[`skills[${catIndex}][${skillIndex}].level`] && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[`skills[${catIndex}][${skillIndex}].level`]}
                  </div>
                )}
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() =>
                  dispatch(removeSkillFromCategory({ catIndex, skillIndex }))
                }
                aria-label={`Remove skill ${skillIndex + 1}`}
              >
                Remove Skill
              </button>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-blue-500 hover:text-blue-700 text-sm"
            onClick={() => dispatch(addSkillToCategory({ index: catIndex }))}
            aria-label={`Add skill to category ${cat.category}`}
          >
            Add Skill
          </button>
          <button
            type="button"
            className="mt-2 ml-4 text-red-500 hover:text-red-700 text-sm"
            onClick={() => dispatch(removeSkillCategory(catIndex))}
            aria-label={`Remove category ${cat.category}`}
          >
            Remove Category
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addSkillCategory())}
        aria-label="Add Skill Category"
      >
        Add Skill Category
      </button>
    </section>
  );
}
