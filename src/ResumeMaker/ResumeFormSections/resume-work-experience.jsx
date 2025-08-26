/* eslint-disable react/prop-types */

import SectionItem from "../../Components/SectionItem";
import {
  addDescriptionToWork,
  addWorkExperience,
  removeDescriptionFromWork,
  removeWorkExperience,
  updateDescriptionToWork,
  updateWorkExperience,
} from "../../context/resumeSlice";

export default function ResumeWorkExperience({
  resumeId,
  resume,
  dispatch,
  errors,
  handleGetJobDescription,
  handleSaveSectionItem,
  handleDeleteSectionItem,
  loadingStates,
}) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Work Experience
      </h3>
      {resume.workExperience.map((exp, index) => (
        <div key={index}>
          <SectionItem
            item={exp}
            index={index}
            fields={[
              { label: "Company Name", name: "companyName", required: true },
              { label: "Position", name: "position", required: true },
              { label: "City", name: "city" },
              { label: "Country", name: "country" },
              { label: "From", name: "from", type: "date", required: true },
              { label: "To", name: "to", type: "date" },
            ]}
            updateAction={updateWorkExperience}
            removeAction={removeWorkExperience}
            addDescAction={addDescriptionToWork}
            updateDescAction={updateDescriptionToWork}
            removeDescAction={removeDescriptionFromWork}
            checkboxField={{
              name: "currentlyWorking",
              label: "Currently Working",
            }}
            onSave={
              resumeId
                ? handleSaveSectionItem.bind(null, "workExperience")
                : null
            }
            onDelete={
              resumeId
                ? handleDeleteSectionItem.bind(null, "workExperience")
                : null
            }
            onGetDescription={handleGetJobDescription}
            isSaving={loadingStates[`workExperience-${index}`]}
            isDeleting={loadingStates[`workExperience-${index}-delete`]}
            isSuggestingDesc={loadingStates[`workExperience-${index}-desc`]}
            sectionName="Work Experience"
            dispatch={dispatch}
          />
          {errors[`workExperience-${index}`] && (
            <div className="text-red-500 text-sm mt-1">
              {errors[`workExperience-${index}`]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addWorkExperience())}
        aria-label="Add Work Experience"
      >
        Add Work Experience
      </button>
    </section>
  );
}
