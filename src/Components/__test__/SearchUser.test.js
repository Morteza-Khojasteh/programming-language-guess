import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, screen, act } from "@testing-library/react";
import SearchUser from "../SearchUser";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchUser />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  render(<SearchUser />);
  expect(screen.getByTestId("search-user")).toBeTruthy();
  expect(screen.getByPlaceholderText("Github Username")).toBeTruthy();
});

describe("Input Value", () => {
  //describe the component
  it("should render the search input", () => {
    //it should render the search input
    render(<SearchUser />);
    const searchInput = screen.getByPlaceholderText("Github Username");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });
});

describe("Search Button", () => {
  //describe the component
  describe("when the query is empty", () => {
    it("does not trigger requestSearch function", () => {
      const requestSearch = jest.fn();
      render(<SearchUser />);
      fireEvent.click(screen.getByTestId("search-user"));
      expect(requestSearch).not.toHaveBeenCalled();
    });
  });
});
