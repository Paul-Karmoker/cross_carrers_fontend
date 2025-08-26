/* eslint-disable react/prop-types */
import SectionItem from "../../Components/SectionItem";
import { addDescriptionToTraining, addTraining, removeDescriptionFromTraining, removeTraining, updateDescriptionToTraining, updateTraining } from "../../context/resumeSlice";

export default function ResumeTrainings({ resume, errors, dispatch }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Trainings</h3>
      {resume.trainings.map((train, index) => (
        <div key={index}>
          <SectionItem
            item={train}
            index={index}
            fields={[
              { label: "Name", name: "name", required: true },
              { label: "Institution", name: "institution", required: true },
              { label: "Duration", name: "duration" },
              { label: "From", name: "from", type: "date", required: true },
              { label: "To", name: "to", type: "date" },
            ]}
            updateAction={updateTraining}
            removeAction={removeTraining}
            addDescAction={addDescriptionToTraining}
            updateDescAction={updateDescriptionToTraining}
            removeDescAction={removeDescriptionFromTraining}
            sectionName="Training"
            dispatch={dispatch}
          />
          {errors[`training-${index}`] && (
            <div className="text-red-500 text-sm mt-1">
              {errors[`training-${index}`]}
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        className="text-blue-600 hover:text-blue-800 font-medium"
        onClick={() => dispatch(addTraining())}
        aria-label="Add Training"
      >
        Add Training
      </button>
    </section>
  );
}
