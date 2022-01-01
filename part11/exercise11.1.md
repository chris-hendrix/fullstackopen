# Exercise 11.1

I am joining a team of 6 that runs React.js on the frontend and Flask (Python) on the backend. It is a simple web app that displays customer data from a SQLite database.

- Linting will be PEP8 on the Python code, and eslint on the JavaScript code. Each team member will be given a configuration file defining the linting rules, ensuring code format amongst team members remains consistent. Plugins will be used to continuously lint the code.
- Integration testing of the backend Python code will be performed using pytest. Unit testing and integration testing of the JavaScript code will be performed using Jest and Cypress, respectively.
- The frontend will be transpiled to ES5 JavaScript using Babel, and will be statically built using webpack.
- The app performs and displays simple queries does not require GPU processing. Therefore a cloud based environment such as GitHub Actions should be an adequate solution to get the app up and running. As the app grows and adds features (such as an AI feature), a more customizable, self-hosted CI setup that has GPU processing may be a better option.
- GitHub Actions should be considered for the cloud-based CI environment, however alternatives should be considered if GitHub is not going to be used to store the app’s code. If using the Atlassian suite of tools is chosen, Bamboo should be used for CI/CD. Other options include GitLab and BuildMaster.
