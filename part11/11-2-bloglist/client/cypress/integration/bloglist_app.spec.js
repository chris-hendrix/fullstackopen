const testUser = { username: 'root', password: '123456', name: 'Superuser' };
const testBlog = { title: 'Testing Testing 123', author: 'Tom Ado', url: 'testingtesting123.com' };
const url = 'http://localhost:3003';
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${url}/api/testing/reset`);
    cy.request('POST', `${url}/api/users/`, testUser);
    cy.visit(url);
  });

  it('Home page is loaded', function () {
    cy.visit(url);
    cy.contains('blogs');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      window.localStorage.clear();
      cy.visit(url);
      cy.get('#login-link').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password);
      cy.get('#login-submit').click();
      cy.contains(`${testUser.name}`);
    });

    it('fails with wrong credentials', function () {
      cy.get('#login-link').click();
      cy.get('#username').type(testUser.username);
      cy.get('#password').type(testUser.password + '1234');
      cy.get('#login-submit').click();
      cy.contains('username');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(testUser);
    });

    it('A blog can be created', function () {
      cy.contains('button', 'create new').click();
      cy.get('#title').type(testBlog.title);
      cy.get('#author').type(testBlog.author);
      cy.get('#url').type(testBlog.url);
      cy.get('#submit-blog').click();
      cy.contains(`${testBlog.title} by ${testBlog.author}`);
    });
  });
});
