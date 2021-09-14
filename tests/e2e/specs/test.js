// https://docs.cypress.io/api/introduction/api.html


function generateRandomEmail() {
  const name = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 5);
  return `${name}@test.com`;
}

describe('Space.io', () => {
  beforeEach(() => {
      cy.visit('/');
  });

  describe('Testing Dashboard', () => {
    it('Dashboard loads', () => {
    });

  });

  describe('Testing App Navigation', () => {
    it('Redirects to homepage when not logged in', () => {
      cy.visit('/');
      cy.location('pathname').should('equal', '/sign-in');
  });

    it('Redirects to homepage when not logged in', () => {
        cy.visit('/dashboard');
        cy.location('pathname').should('equal', '/sign-in');
    });

    it('Shows the dashboard page when logged in', () => {
        cy.visit('/sign-in');
        cy.login();
        cy.location('pathname').should('equal', '/dashboard');
    });
  });

  describe('Testing Login Page', () => {
    beforeEach(() => {
        cy.get('[data-cy=signinBtn]');
    });

    it('should require all fields', () => {
        cy.get('[data-cy=signinPasswordField]').type('password');
        cy.get('[data-cy=signinBtn').should('be.disabled');
    });

    it('email must be valid', () => {
        cy.get('[data-cy=signinEmailField]').type('invalid@mail');
        cy.contains('E-mail must be valid');
        cy.get('[data-cy=signinEmailField]').type('valid@mail.com');
        cy.get('.v-messages__message').should('not.exist');
    });

    it('passwords must be at least 6 characters', () => {
        cy.get('[data-cy=signinPasswordField]').type('hi');
        cy.contains('Password must be greater than 6 characters');
        cy.get('[data-cy=signinPasswordField]').type('thisisaccepted');
        cy.get('.v-messages__message').should('not.exist');
    });

    it('should login user', () => {
        cy.get('[data-cy=signinEmailField]').type('testuser1@gmail.com');
        cy.get('[data-cy=signinPasswordField]').type('testuser1');
        cy.get('[data-cy=signinBtn]').click();
        cy.location('pathname').should('equal', '/dashboard');
        cy.logout();
        cy.location('pathname').should('equal', '/sign-in');
    });
  });

  describe('Testing Join Page', () => {
    it('Should register a new user', () => {
        cy.visit('/join');
        cy.get('[data-cy=joinEmailField]').type(generateRandomEmail());
        cy.get('[data-cy=joinPasswordField]').type('Password123');
        cy.get('[data-cy=joinSubmitBtn').click();
        cy.location('pathname').should('equal', '/dashboard');
        cy.logout();
        cy.location('pathname').should('equal', '/sign-in');
    });
  });

});


