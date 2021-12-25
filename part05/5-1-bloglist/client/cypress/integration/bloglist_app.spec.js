const testUser = { username: 'root', password: '123456', name: 'Superuser' };
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users/', testUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('button', 'login').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.contains('button', 'login').click();
      cy.contains(`${testUser.name}`);
    });

    it('fails with wrong credentials', function () {
      cy.contains('button', 'login').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password + '1234');
      cy.contains('button', 'login').click();
      cy.contains('Wrong credentials');
    });
  });
});
