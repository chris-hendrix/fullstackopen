const cy = window.cy;
const testUser = { username: 'root', password: '123456', name: 'Superuser' };

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = { ...testUser };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021');
  });

  it('login form can be opened', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in').click();
  });

  it('user can log in', function () {
    cy.contains('log in').click();
    cy.get('#username').type(testUser.username);
    cy.get('#password').type(testUser.password);
    cy.get('#login-button').click();

    cy.contains(`${testUser.name} logged-in`);
  });

  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');
    cy.get('html').should('not.contain', `${testUser.name} logged-in`);
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('input:first').type(testUser.username);
      cy.get('input:last').type(testUser.password);
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      cy.contains('button', 'new note').click();
      cy.get('#note-input').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('button', 'new note').click();
        cy.get('input').type('another note cypress');
        cy.contains('save').click();
      });

      it('can be made important', function () {
        cy.contains('another note cypress').contains('make important').click();

        cy.contains('another note cypress').contains('make not important');
      });
    });
  });
});
