import "./FormDetails.css";

type FormData = {
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  employment_status: string;
  annual_income: string;
  credit_card_type: string;
  address_line1: string;
  city: string;
  postal_code: string;
};

const FormDetails = ({ formData }: { formData: FormData }) => {
  return (
    <div>
      <div className="info-box">
        <h3 className="info-title">Submitted Details</h3>
        <ul className="info-list">
          <li>
            <strong>Name:</strong> {formData.first_name} {formData.last_name}
          </li>
          <li>
            <strong>DOB:</strong> {formData.dob}
          </li>
          <li>
            <strong>Email:</strong> {formData.email}
          </li>
          <li>
            <strong>Employment:</strong> {formData.employment_status}
          </li>
          <li>
            <strong>Income:</strong> ₹{formData.annual_income}
          </li>
          <li>
            <strong>Card Type:</strong> {formData.credit_card_type}
          </li>
          <li>
            <strong>Address:</strong> {formData.address_line1}, {formData.city}{" "}
            - {formData.postal_code}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormDetails;
