// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
import { getStore } from './store';

Cypress.Commands.add(
    'login',
    ({ email = 'testuser1@gmail.com', password = 'testuser1' } = {}) => {
        // Manually log the user in
        cy.location('pathname').then(pathname => {
            if (pathname === 'blank') {
                cy.visit('/');
            }
        });
        getStore().then(store => {
            cy.log(
                `calling store userLogin with email: ${email} password: ${password}`
            );
            store.dispatch('userLogin', { email, password });
        });
    }
);

Cypress.Commands.add('logout', () => {
    getStore().then(store => {
        cy.log('calling store userSignOut');
        store.dispatch('userSignOut');
    });
});

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
