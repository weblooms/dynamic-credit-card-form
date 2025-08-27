import "./Fieldrenderer.css";
type FieldProps = {
  field: any;
  value: any;
  onChange: (value: any) => void;
  fieldLabel: string;
  required: boolean;
};

const FieldRenderer = ({
  field = "",
  value = "",
  onChange = () => {},
  fieldLabel = "",
  required = false,
}: FieldProps) => {
  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <>
          <label htmlFor={field.id}>
            <span className="required-field">{required && "*"}</span>
            {fieldLabel}:
          </label>
          <input
            id={field.id}
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      );
    case "select":
      return (
        <>
          <label htmlFor={field.id}>
            <span className="required-field">{required && "*"}</span>
            {fieldLabel}:
          </label>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            id={field.id}
          >
            <option value="">Select...</option>
            {field.options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </>
      );
    default:
      return null;
  }
};
export default FieldRenderer;
