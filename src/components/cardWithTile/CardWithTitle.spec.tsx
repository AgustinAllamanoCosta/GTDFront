import React from "react";
import { CardTitle } from "./CardWithTitle";

describe("Card with title and subtitle", () => {
  it("render a card with title and sub title", () => {
    const title: string = "Some title";
    const label: string = "Some label";
    cy.mount(<CardTitle title={title} label={label} />);
    cy.get('[data-cy="Card-title"]').should("have.text", title);
    cy.get('[data-cy="Card-label"]').should("have.text", label);
  });
});
