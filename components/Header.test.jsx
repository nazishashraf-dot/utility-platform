// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Header from "./Header";
import { converterTools } from "@/features/converters/toolsList";

afterEach(() => cleanup());

describe("Header mobile menu", () => {
  it("does not render the mobile menu by default", () => {
    render(<Header />);
    expect(document.getElementById("mobile-menu")).toBeNull();
  });

  it("opens the mobile menu when the hamburger button is clicked", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const mobileMenu = document.getElementById("mobile-menu");
    expect(mobileMenu).not.toBeNull();
  });

  it("overlays the menu instead of pushing content down: absolutely positioned, solid background, elevated", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const mobileMenu = document.getElementById("mobile-menu");
    expect(mobileMenu.className).toMatch(/\babsolute\b/);
    expect(mobileMenu.className).toMatch(/\btop-full\b/);
    expect(mobileMenu.className).toMatch(/\bbg-white\b/);
    expect(mobileMenu.className).toMatch(/\bshadow-lg\b/);

    // The overlay must be positioned relative to the header, not the page,
    // so it floats over content rather than displacing it.
    const header = mobileMenu.closest("header");
    expect(header.className).toMatch(/\brelative\b/);
  });

  it("renders a working link to every converter tool inside the mobile menu", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const mobileMenu = document.getElementById("mobile-menu");
    const links = [...mobileMenu.querySelectorAll("a")];

    expect(links).toHaveLength(converterTools.length);
    converterTools.forEach((tool) => {
      const link = links.find((a) => a.getAttribute("href") === tool.href);
      expect(link).toBeTruthy();
      expect(link.textContent).toBe(tool.name);
    });
  });

  it("closes the mobile menu when the button is clicked again", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.getElementById("mobile-menu")).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.getElementById("mobile-menu")).toBeNull();
  });

  it("closes the mobile menu after clicking a link inside it", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const firstLink = document
      .getElementById("mobile-menu")
      .querySelector("a");

    fireEvent.click(firstLink);

    expect(document.getElementById("mobile-menu")).toBeNull();
  });

  it("does not block navigation when a link closes the menu (no preventDefault)", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const firstLink = document
      .getElementById("mobile-menu")
      .querySelector("a");

    let capturedEvent;
    firstLink.addEventListener("click", (event) => {
      capturedEvent = event;
    });

    fireEvent.click(firstLink);

    expect(capturedEvent.defaultPrevented).toBe(false);
  });

  it("renders no backdrop while the menu is closed", () => {
    render(<Header />);
    expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it("renders a full-viewport backdrop behind the menu, hidden on desktop, that closes the menu when clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

    const backdrop = document.querySelector('[aria-hidden="true"]');
    expect(backdrop).not.toBeNull();
    expect(backdrop.className).toMatch(/\bfixed\b/);
    expect(backdrop.className).toMatch(/\binset-0\b/);
    expect(backdrop.className).toMatch(/\bmd:hidden\b/);

    fireEvent.click(backdrop);

    expect(document.getElementById("mobile-menu")).toBeNull();
    expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
