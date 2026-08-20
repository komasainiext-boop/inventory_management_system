import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NotFound from "./index";

describe("NotFound", () => {
  it("renders the 404 message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /page not found/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the dashboard navigation button", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("button", {
        name: /back to dashboard/i,
      }),
    ).toBeInTheDocument();
  });
});
