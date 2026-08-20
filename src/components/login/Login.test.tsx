import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "./index";
import { AuthProvider } from "../../context/AuthContext";

describe("Sign In component", () => {
  const renderLogin = (): void => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </MemoryRouter>,
    );
  };

  it("renders the sign in page", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    ).toBeInTheDocument();
  });

  it("allows the user to enter an email address", async () => {
    const user = userEvent.setup();

    renderLogin();

    const emailInput = screen.getByLabelText(/email/i);

    await user.type(emailInput, "user@example.com");

    expect(emailInput).toHaveValue("user@example.com");
  });

  it("allows the user to enter a password", async () => {
    const user = userEvent.setup();

    renderLogin();

    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(passwordInput, "Password@123");

    expect(passwordInput).toHaveValue("Password@123");
  });

  it("shows required validation errors when fields are empty", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    );

    expect(
      await screen.findByText(/email address is required/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/password is required/i),
    ).toBeInTheDocument();
  });

  it("renders the Forgot Password link", () => {
    renderLogin();

    expect(
      screen.getByRole("link", {
        name: /forgot password/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the registration link", () => {
    renderLogin();

    expect(
      screen.getByRole("link", {
        name: /register|sign up/i,
      }),
    ).toBeInTheDocument();
  });
});
