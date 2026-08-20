import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileProvider } from "../../context/ProfileContext";
import Profile from "./index";

describe("Profile component", () => {
  const renderProfile = (): void => {
    render(
      <ProfileProvider>
        <Profile />
      </ProfileProvider>,
    );
  };

  test("renders the profile page", async () => {
    renderProfile();

    expect(
      await screen.findByRole("heading", {
        name: /user profile/i,
      }),
    ).toBeInTheDocument();
  });

  test("loads and displays profile information", async () => {
    renderProfile();

    expect(
      await screen.findByDisplayValue("Inventory"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Manager"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("manager@example.com"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("+91 9876543210"),
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Inventory Manager"),
    ).toBeInTheDocument();
  });

  test("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();

    renderProfile();

    await screen.findByDisplayValue("Inventory");

    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const phone = screen.getByLabelText(/phone number/i);
    const role = screen.getByLabelText(/^role/i);

    await user.clear(firstName);
    await user.clear(lastName);
    await user.clear(email);
    await user.clear(phone);
    await user.clear(role);

    await user.click(
      screen.getByRole("button", {
        name: /update profile/i,
      }),
    );

    expect(
      await screen.findByText(/first name is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/last name is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/email is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/phone number is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/role is required/i),
    ).toBeInTheDocument();
  });

  test("shows delete confirmation dialog", async () => {
    const user = userEvent.setup();

    renderProfile();

    await screen.findByDisplayValue("Inventory");

    await user.click(
      screen.getByRole("button", {
        name: /delete profile/i,
      }),
    );

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/are you sure you want to delete this profile/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /^cancel$/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /^delete$/i,
      }),
    ).toBeInTheDocument();
  });

  test("closes delete dialog when cancel is clicked", async () => {
    const user = userEvent.setup();

    renderProfile();

    await screen.findByDisplayValue("Inventory");

    await user.click(
      screen.getByRole("button", {
        name: /delete profile/i,
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /^cancel$/i,
      }),
    );

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();
    });
  });
});