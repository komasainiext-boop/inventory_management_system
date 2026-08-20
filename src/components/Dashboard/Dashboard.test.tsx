import { render, screen } from "@testing-library/react";

import Dashboard from "./index";

describe("Dashboard", () => {
  it("renders the dashboard heading", () => {
    render(<Dashboard />);

    expect(
      screen.getByRole("heading", {
        name: /inventory dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders inventory statistics", () => {
    render(<Dashboard />);

    expect(screen.getByText("Total Products")).toBeInTheDocument();

    expect(screen.getByText("Low Stock")).toBeInTheDocument();

    expect(screen.getByText("Orders")).toBeInTheDocument();

    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("displays the total product count", () => {
    render(<Dashboard />);

    expect(screen.getByText("248")).toBeInTheDocument();
  });
});
