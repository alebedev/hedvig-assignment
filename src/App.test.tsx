import React from "react";
import { Provider } from "react-redux";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
  expect(fetchPerils).toHaveBeenCalledTimes(1);

  mockResolve(perilsSampleResponse);
  await waitFor(async () => {
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
  });

  await userEvent.click(screen.getByText(/water leaks/i));
  let dialog = await screen.findByRole("dialog");
  expect(
    within(dialog).getByText(/leaking fire extinguisher/i)
  ).toBeInTheDocument();

  await userEvent.click(within(dialog).getByTitle(/next/i));
  dialog = await screen.findByRole("dialog");
  expect(within(dialog).getByText(/burglary/i)).toBeInTheDocument();

  await userEvent.click(within(dialog).getByTitle(/close/i));
  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
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
