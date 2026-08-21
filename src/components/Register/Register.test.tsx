import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Register from "./index";

const renderRegister = () => {
  return render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>,
  );
};

describe("Register", () => {
  test("renders all registration fields", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^password\s*\*/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create account/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /already have an account\? sign in/i,
      }),
    ).toBeInTheDocument();
  });

  test("shows an error when passwords do not match", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByLabelText(/full name/i), "Test User");

    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );

    await user.type(screen.getByLabelText(/^password\s*\*/i), "Password@123");

    await user.type(
      screen.getByLabelText(/confirm password/i),
      "Different@123",
    );

    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords must match/i)).toBeInTheDocument();
    });
  });

  test("successfully registers a valid user", async () => {
    const user = userEvent.setup();

    renderRegister();

    await user.type(screen.getByLabelText(/full name/i), "Test User");

    await user.type(
      screen.getByLabelText(/email address/i),
      "test@example.com",
    );

    await user.type(screen.getByLabelText(/^password\s*\*/i), "Password@123");

    await user.type(screen.getByLabelText(/confirm password/i), "Password@123");

    await user.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(
        screen.queryByText(/passwords must match/i),
      ).not.toBeInTheDocument();
    });
  });
});
