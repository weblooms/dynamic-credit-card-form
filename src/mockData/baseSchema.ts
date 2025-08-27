const baseSchema = {
  title: "Credit Card Application",
  description: "Please fill out the form",
  steps: [
    {
      title: "Step 1",
      fields: [
        {
          id: "name",
          label: "Name",
          type: "text",
          required: true,
          validation: {
            minLength: 3,
            maxLength: 5,
            message: "Name length invalid",
          },
        },
        {
          id: "age",
          label: "Age",
          type: "number",
          required: false,
          validation: { min: 18, max: 60, message: "Invalid age" },
        },
        {
          id: "dob",
          label: "DOB",
          type: "date",
          required: false,
          validation: { minAge: 18, message: "Too young" },
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          required: false,
          validation: {
            pattern: "^[^@]+@[^@]+\\.[^@]+$",
            message: "Invalid email",
          },
        },
      ],
    },
  ],
  submit: {
    label: "Submit",
    successMessage: "Form submitted successfully!",
    errorMessage: "Something went wrong",
    postSubmitAction: "credit card",
  },
};
export default baseSchema;
