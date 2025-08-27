import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormStructure from "../components/FormStructure";
import { vi } from "vitest";

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

describe("FormStructure extra coverage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("validates regex pattern", () => {
    render(<FormStructure schema={baseSchema} />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "bademail" },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  });

  test("validates min and max number", () => {
    render(<FormStructure schema={baseSchema} />);
    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: "10" },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Invalid age/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Invalid age/i)).toBeInTheDocument();
  });

  test("validates minLength and maxLength", () => {
    render(<FormStructure schema={baseSchema} />);
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Jo" },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Name length invalid/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: "Johnny" },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Name length invalid/i)).toBeInTheDocument();
  });

  test("validates minAge on DOB", () => {
    render(<FormStructure schema={baseSchema} />);
    const youngDate = new Date();
    youngDate.setFullYear(new Date().getFullYear() - 10);
    fireEvent.change(screen.getByLabelText(/DOB/i), {
      target: { value: youngDate.toISOString().split("T")[0] },
    });
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Too young/i)).toBeInTheDocument();
  });

  test("renders field validation error on empty submit", () => {
    render(<FormStructure schema={baseSchema} />);
    fireEvent.click(screen.getByText(/Submit/i));
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
  });

  test("renders timestamp and allows viewing summary", () => {
    localStorage.setItem("submissionTimestamp", "2025-08-27, 10:00 AM");
    localStorage.setItem("formData", JSON.stringify({ name: "Alice" }));
    render(<FormStructure schema={baseSchema} />);
    expect(screen.getByText(/Last submission:/i)).toBeInTheDocument();
    window.alert = vi.fn();
    fireEvent.click(screen.getByText(/View Summary/i));
    expect(window.alert).toHaveBeenCalled();
  });

  test("back button works", () => {
    const multiStep = {
      ...baseSchema,
      steps: [
        { title: "Step 1", fields: [{ id: "f1", label: "F1", type: "text" }] },
        { title: "Step 2", fields: [{ id: "f2", label: "F2", type: "text" }] },
      ],
    };
    render(<FormStructure schema={multiStep} />);
    fireEvent.click(screen.getByText(/Next/i));
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Back/i));
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
  });
});
