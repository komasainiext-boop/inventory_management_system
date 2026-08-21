import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProfileProvider } from "../../context/ProfileContext";
import Profile from "./index";

const TEST_PROFILE = {
  id: "USR-001",
  firstName: "Inventory",
  lastName: "Manager",
  email: "manager@example.com",
  phone: "+91 9876543210",
  role: "Inventory Manager",
  avatarUrl: "",
};

describe("Profile integration", () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "inventory_user_profile",
      JSON.stringify(TEST_PROFILE),
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  const renderProfile = (): void => {
    render(
      <ProfileProvider>
        <Profile />
      </ProfileProvider>,
    );
  };

  test("loads, updates, and deletes the user profile", async () => {
    const user = userEvent.setup();

    renderProfile();

    // Load existing profile
    expect(await screen.findByDisplayValue("Inventory")).toBeInTheDocument();

    // Update profile
    const lastNameInput = screen.getByLabelText(/last name/i);

    await user.clear(lastNameInput);
    await user.type(lastNameInput, "Administrator");

    await user.click(
      screen.getByRole("button", {
        name: /update profile/i,
      }),
    );

    // Wait for update to finish
    await waitFor(() => {
      expect(screen.getByDisplayValue("Administrator")).toBeInTheDocument();
    });

    // Wait until Delete Profile is enabled
    const deleteProfileButton = screen.getByRole("button", {
      name: /delete profile/i,
    });

    await waitFor(() => {
      expect(deleteProfileButton).toBeEnabled();
    });

    // Open delete confirmation
    await user.click(deleteProfileButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    expect(
      screen.getByText(/are you sure you want to delete this profile/i),
    ).toBeInTheDocument();

    // Confirm deletion
    await user.click(
      screen.getByRole("button", {
        name: /^delete$/i,
      }),
    );

    // Wait until deletion finishes
    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /create profile/i,
        }),
      ).toBeInTheDocument();
    });
  });
});
