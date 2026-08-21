import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Dashboard from "./index";

describe("Dashboard", () => {
  const renderDashboard = (): void => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
  };

  it("renders the dashboard heading", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", {
        name: /inventory dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders inventory statistics", () => {
    renderDashboard();

    expect(screen.getAllByText("Total Products").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Low Stock").length).toBeGreaterThan(0);
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("displays dashboard values from stub data", () => {
    renderDashboard();

    expect(screen.getAllByText("248").length).toBeGreaterThan(0);
    expect(screen.getAllByText("18").length).toBeGreaterThan(0);
    expect(screen.getByText("76")).toBeInTheDocument();
    expect(screen.getByText("32")).toBeInTheDocument();
  });

  it("renders inventory overview widget", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", {
        name: /inventory overview/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Available")).toBeInTheDocument();
    expect(screen.getByText("Reserved")).toBeInTheDocument();
    expect(screen.getByText("Out of Stock")).toBeInTheDocument();
  });

  it("renders stock summary widget", () => {
    renderDashboard();

    expect(
      screen.getByRole("heading", {
        name: /stock summary/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Healthy Stock")).toBeInTheDocument();
  });

  it("renders profile navigation button", () => {
    renderDashboard();

    expect(
      screen.getByRole("button", {
        name: /open user profile/i,
      }),
    ).toBeInTheDocument();
  });
});
