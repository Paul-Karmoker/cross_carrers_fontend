/* eslint-disable react/prop-types */
import SectionItem from "../../Components/SectionItem";
import { addCertification, addDescriptionToCertification, removeCertification, removeDescriptionFromCertification, updateCertification, updateDescriptionToCertification } from "../../context/resumeSlice";

export default function ResumeCertifications({ resume, errors, dispatch }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        Certifications
      </h3>
      {resume.certifications.map((cert, index) => (
        <div key={index}>
          <SectionItem
            item={cert}
            index={index}
            fields={[
              { label: "Name", name: "name", required: true },
              { label: "Authority", name: "authority", required: true },
              { label: "URL/Code", name: "urlCode" },
              { label: "Date", name: "date", type: "date", required: true },
            ]}
            updateAction={updateCertification}
            removeAction={removeCertification}
            addDescAction={addDescriptionToCertification}
            updateDescAction={updateDescriptionToCertification}
            removeDescAction={removeDescriptionFromCertification}
            sectionName="Certification"
            dispatch={dispatch}
          />
          {errors[`certification-${index}`] && (
            <div className="text-red-500 text-sm mt-1">
              {errors[`certification-${index}`]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addCertification())}
        aria-label="Add Certification"
      >
        Add Certification
      </button>
    </section>
  );
}
