import React from "react";
import { expect } from '@jest/globals';
import { render, act, screen } from "@testing-library/react";
import { AppContext} from "../../storybook/decorators/phone";
import * as credentials from "../../assets/google/client_secret_153375467669-bl3575q27tmq97cf359v0unoegk06opn.apps.googleusercontent.com.json";
import MainView from "./Main";

describe("Login View", () => {

  test("Should render a login view with singin and login buttons", async () => {

    const { container } = render(
      <AppContext  credential={credentials}>
        <MainView/>
      </AppContext>
    );
    expect(container).toMatchSnapshot();
  });
});
