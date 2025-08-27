import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          title: "Credit Card Application",
          description: "Please fill out the form",
          steps: [{ title: "Step 1", fields: [] }],
          submit: { label: "Submit Application" },
        }),
    } as any)
  ) as unknown as typeof global.fetch;
});

afterEach(() => {
  vi.resetAllMocks();
});

test("renders loading state initially", () => {
  render(<App />);
  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});

test("renders error state if fetch fails", async () => {
  global.fetch = vi.fn(() =>
    Promise.reject("API is down")
  ) as typeof global.fetch;

  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Error while Loading/i)).toBeInTheDocument();
  });
});

test("renders FormStructure after successful fetch", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Credit Card Application/i)).toBeInTheDocument();
    expect(screen.getByText(/Please fill out the form/i)).toBeInTheDocument();
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
  });
});
