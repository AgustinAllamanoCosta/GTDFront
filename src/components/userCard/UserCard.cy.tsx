import React from 'react';
import { UserCard } from './UserCard';

describe('User Card with title Getting Things Done and subtitle Agustin Allamano Costa ', () => {
  it('render a user card with name and without photo', async () => {
    const userName: string = 'Agustin Allamano Costa';
    const userPhoto: string = 'https://i.stack.imgur.com/Dj7eP.jpg';
    const cardTitle: string = 'Getting Things Done';

    cy.mount(
      <UserCard
        userName={userName}
        userPhoto={userPhoto}
      />,
    );

    cy.get('[data-cy="Card-title"]').should('have.text', cardTitle);
    cy.get('[data-cy="Card-SubTitle"]').should('have.text', `Hi ${userName} !`);
    cy.get('[data-cy="Avatar-photo"]').should(
      'have.attr',
      'imageurl',
      userPhoto,
    );
  });
});
