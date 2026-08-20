import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import Login from "./index";
import { AuthProvider } from "../../context/AuthContext";

const Dashboard = (): React.ReactElement => {
  return <h1>Inventory Dashboard</h1>;
};

describe("Login integration", () => {
  it("logs in the user and navigates to the dashboard", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    await user.type(
      screen.getByLabelText(/email address/i),
      "user@example.com",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "Password@123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /sign in/i,
      }),
    );

    expect(
      await screen.findByRole("heading", {
        name: /inventory dashboard/i,
      }),
    ).toBeInTheDocument();
  });
});