/* eslint-disable react/prop-types */

import { addDescriptionToEducation, addEducation, removeDescriptionFromEducation, removeEducation, updateDescriptionToEducation, updateEducation } from "../../context/resumeSlice";
import SectionItem from "../../Components/SectionItem";

export default function ResumeEducation({
    resumeId,
    resume,
    dispatch,
    errors,
    handleSaveSectionItem,
    handleDeleteSectionItem,
    loadingStates,
}) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Education</h3>
      {resume.education.map((edu, index) => (
        <div key={index}>
          <SectionItem
            item={edu}
            index={index}
            fields={[
              {
                label: "Institution Name",
                name: "institutionName",
                required: true,
              },
              { label: "Field of Study", name: "fieldOfStudy", required: true },
              { label: "Degree", name: "degree", required: true },
              { label: "City", name: "city" },
              { label: "Country", name: "country" },
              { label: "From", name: "from", type: "date", required: true },
              { label: "To", name: "to", type: "date" },
              {
                label: "GPA",
                name: "gpa",
                type: "number",
                min: 0,
                max: 4,
                step: "0.01",
              },
              { label: "Honors", name: "honors" },
            ]}
            updateAction={updateEducation}
            removeAction={removeEducation}
            addDescAction={addDescriptionToEducation}
            updateDescAction={updateDescriptionToEducation}
            removeDescAction={removeDescriptionFromEducation}
            checkboxField={{
              name: "currentlyStudying",
              label: "Currently Studying",
            }}
            onSave={
              resumeId ? handleSaveSectionItem.bind(null, "education") : null
            }
            onDelete={
              resumeId ? handleDeleteSectionItem.bind(null, "education") : null
            }
            isSaving={loadingStates[`education-${index}`]}
            isDeleting={loadingStates[`education-${index}-delete`]}
            sectionName="Education"
            dispatch={dispatch}
          />
          {errors[`education-${index}`] && (
            <div className="text-red-500 text-sm mt-1">
              {errors[`education-${index}`]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addEducation())}
        aria-label="Add Education"
      >
        Add Education
      </button>
    </section>
  );
}
