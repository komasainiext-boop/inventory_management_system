import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import ForgotPassword from "./index";

describe("ForgotPassword", () => {
  it("renders the forgot password form", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /forgot password/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /send reset instructions/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /back to login/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows validation error for an empty email", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /send reset instructions/i,
      }),
    );

    expect(
      await screen.findByText("Email address is required"),
    ).toBeInTheDocument();
  });

  it("shows validation error for an invalid email", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/email address/i), "invalid-email");

    await user.click(
      screen.getByRole("button", {
        name: /send reset instructions/i,
      }),
    );

    expect(
      await screen.findByText("Please enter a valid email address"),
    ).toBeInTheDocument();
  });

  it("successfully submits a valid email", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );

    await user.click(
      screen.getByRole("button", {
        name: /send reset instructions/i,
      }),
    );

    expect(
      await screen.findByText(
        "If an account exists with this email, password reset instructions have been sent.",
      ),
    ).toBeInTheDocument();
  });
});
