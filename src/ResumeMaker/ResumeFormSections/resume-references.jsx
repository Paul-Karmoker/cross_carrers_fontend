/* eslint-disable react/prop-types */
import SectionItem from "../../Components/SectionItem";
import { addReference, removeReference, updateReference } from "../../context/resumeSlice";

export default function ResumeReferences({
  resumeId,
  resume,
  errors,
  dispatch,
  loadingStates,
  handleSaveSectionItem,
  handleDeleteSectionItem,
}) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">References</h3>
      {resume.references.map((ref, index) => (
        <div key={index}>
          <SectionItem
            item={ref}
            index={index}
            fields={[
              { label: "Name", name: "name", required: true },
              { label: "Position", name: "position", required: true },
              { label: "Company", name: "company", required: true },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Email", name: "email", type: "email" },
              { label: "Relationship", name: "relationship" },
            ]}
            updateAction={updateReference}
            removeAction={removeReference}
            onSave={
              resumeId ? handleSaveSectionItem.bind(null, "reference") : null
            }
            onDelete={
              resumeId ? handleDeleteSectionItem.bind(null, "reference") : null
            }
            isSaving={loadingStates[`reference-${index}`]}
            isDeleting={loadingStates[`reference-${index}-delete`]}
            sectionName="Reference"
            dispatch={dispatch}
          />
          {errors[`reference-${index}`] && (
            <div className="text-red-500 text-sm mt-1">
              {errors[`reference-${index}`]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addReference())}
        aria-label="Add Reference"
      >
        Add Reference
      </button>
    </section>
  );
}
