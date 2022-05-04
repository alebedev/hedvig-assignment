import React from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";

import App from "./App";
import { store } from "./store";
import { fetchPerils, Peril } from "./perils/perilsApi";
import perilsSampleResponse from "./perils/perilsSampleResponse.json";

jest.mock("./perils/perilsApi");

beforeEach(() => {
  jest.resetAllMocks();
});

test("Perils screen", async () => {
  let mockResolve!: (value: Peril[]) => void;
  jest.mocked(fetchPerils).mockImplementation(
    () =>
      new Promise((resolve) => {
        mockResolve = resolve;
      })
  );

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(async () => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  expect(fetchPerils).toHaveBeenCalled();

  mockResolve(perilsSampleResponse);
  await waitFor(async () => {
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
  });
  // TODO: click on item, check details
});

test("Network error", async () => {
  jest.mocked(fetchPerils).mockRejectedValue(new Error("test error"));
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  await waitFor(async () => {
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
