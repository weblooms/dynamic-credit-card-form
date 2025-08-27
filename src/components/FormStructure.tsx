import { useState } from "react";
import FieldRenderer from "./Fieldrenderer";
import "./FormStrucutre.css";
import VirtualCard from "./VirtualCard";
import FormDetails from "./FormDetails";

type ScehmaProps = {
  schema: any;
};
const FormStructure = ({ schema }: ScehmaProps) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState<string | null>(
    localStorage.getItem("submissionTimestamp")
  );
  const currentStep = schema.steps[stepIndex];

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  // validation function
  const validateField = (field: any, value: any): string | null => {
    if (field.required && !value) return `${field.label} is required.`;
    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) return field.validation.message;
    }
    if (field.validation?.min && value < field.validation.min)
      return field.validation.message;
    if (field.validation?.max && value > field.validation.max)
      return field.validation.message;
    if (
      field.validation?.minLength &&
      value.length < field.validation.minLength
    )
      return field.validation.message;
    if (
      field.validation?.maxLength &&
      value.length > field.validation.maxLength
    )
      return field.validation.message;
    if (field.type === "date" && field.validation?.minAge) {
      const dob = new Date(value);
      const age = new Date().getFullYear() - dob.getFullYear();
      if (age < field.validation.minAge) return field.validation.message;
    }
    return null;
  };

  const handleNext = () => {
    const stepErrors: any = {};
    currentStep.fields.forEach((f: any) => {
      const error = validateField(f, formData[f.id]);
      if (error) stepErrors[f.id] = error;
    });

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    if (stepIndex < schema.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      const ts = new Date().toLocaleString();
      localStorage.setItem("submissionTimestamp", ts);
      localStorage.setItem("formData", JSON.stringify(formData));
      setTimestamp(ts);
      setSubmitted(true);
    }
  };

  if (submitted) {
    const hasErrors = Object.keys(errors).length > 0;

    return (
      <div className="form-container">
        {hasErrors ? (
          <>
            <h2 className="error-msg">{schema.submit.errorMessage}</h2>
            <button
              className="btn clear-btn"
              onClick={() => {
                localStorage.clear();
                setSubmitted(false);
                setFormData({});
                setStepIndex(0);
              }}
            >
              Try Again
            </button>
          </>
        ) : (
          <>
            <h2 className="submit-msg">{schema.submit.successMessage}</h2>
            <p className="timestamp">Submitted at: {timestamp}</p>
            {console.log(formData, "hjgjhgjh")}
            <div>
              <FormDetails formData={formData} />
            </div>
            <VirtualCard
              first_name={formData.first_name}
              last_name={formData.last_name}
            />

            <button
              className="btn clear-btn"
              onClick={() => {
                localStorage.clear();
                setSubmitted(false);
                setFormData({});
                setStepIndex(0);
              }}
            >
              Clear Submission
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="form-container">
      {timestamp && (
        <p className="last-submission">
          Last submission: {timestamp}
          <button
            className="btn secondary-btn"
            onClick={() => alert(localStorage.getItem("formData"))}
          >
            View Summary
          </button>
        </p>
      )}

      <h2 className="form-title">{schema.title}</h2>
      <p className="form-description">{schema.description}</p>

      <h3 className="step-title">{currentStep.title}</h3>
      {currentStep.fields.map((f: any) => (
        <div key={f.id} className="form-field">
          <FieldRenderer
            field={f}
            value={formData[f.id] || ""}
            onChange={(val) => handleChange(f.id, val)}
            fieldLabel={f.label}
            required={f.required}
          />
          {errors[f.id] && <p className="error-text">{errors[f.id]}</p>}
        </div>
      ))}

      <div className="button-group">
        {stepIndex > 0 && (
          <button
            className="btn secondary-btn"
            onClick={() => setStepIndex(stepIndex - 1)}
          >
            Back
          </button>
        )}
        <button className="btn primary-btn" onClick={handleNext}>
          {stepIndex === schema.steps.length - 1 ? schema.submit.label : "Next"}
        </button>
      </div>
    </div>
  );
};
export default FormStructure;
