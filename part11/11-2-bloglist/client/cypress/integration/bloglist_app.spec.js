const testUser = { username: 'root', password: '123456', name: 'Superuser' };
const testBlog = { title: 'Testing Testing 123', author: 'Tom Ado', url: 'testingtesting123.com' };
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.request('POST', 'http://localhost:3003/api/users/', testUser);
    cy.visit('http://localhost:3003');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3003');
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(testUser);
    });

    it('A blog can be created', function () {
      cy.contains('button', 'create new').click();
      cy.get('#title').type(testBlog.title);
      cy.get('#author').type(testBlog.author);
      cy.get('#url').type(testBlog.url);
      cy.contains('button', 'Submit').click();
      cy.contains(`${testBlog.title} by ${testBlog.author}`);
    });

    it('A blog can be deleted', function () {
      // create blog
      cy.contains('button', 'create new').click();
      cy.get('#title').type(testBlog.title);
      cy.get('#author').type(testBlog.author);
      cy.get('#url').type(testBlog.url);
      cy.contains('button', 'Submit').click();
      // delete blog
      cy.contains('button', 'view').click();
      cy.contains('button', 'remove').click();
      cy.get('.blogList').should('not.contain', `${testBlog.title} by ${testBlog.author}`);
    });

    describe('When one blog is created', function () {
      beforeEach(function () {
        cy.createBlog(testBlog);
      });

      it('a user can like a blog', function () {
        cy.contains('button', 'like').click();
        cy.contains('button', 'view').click();
        cy.contains('likes: 1');
      });
    });
  });
});
