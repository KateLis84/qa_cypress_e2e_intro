/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Sign In page', () => {
  let username;
  let email;
  let password;

  beforeEach(() => {
    cy.visit('');

    username = faker.internet.userName().replace('.', '');
    email = faker.internet.email();
    password = faker.internet.password();
  });

  it('should sign in with valid credentials', () => {
    cy.request('POST', '/api/users/', {
      user: { username, email, password }
    }).its('status').should('eq', 200);

    cy.contains('.nav-link', 'Sign in').click();

    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.get('.navbar').should('contain.text', username);
  });
});
