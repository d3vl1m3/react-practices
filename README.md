# Getting started

## Installation
To install the necessary dependencies, run:
```bash
npm install
```
## Run the Unit Tests
To execute the unit tests, run:
```bash
npm run test
```

# Stratergies considered
- Routing: Strategy for mapping URLs to specific handlers or views.
- Form Creation: Strategy for creating user input forms.
- Form Submissions: Strategy for handling user form submissions.
- API Abstraction: Strategy for abstracting API calls into a separate layer or module.
- Network Request Interception (during development): Strategy for mocking API calls, often used in testing or development.
- Static Type-Checking: Strategy for catching type errors at compile time, often used in languages like TypeScript.
- Run Time Validation: Strategy for validating data at runtime, often used when dealing with external data.
- Error Handling: Strategy for handling and responding to errors that occur during the execution of your application.
- Application Data Caching: Strategy for storing frequently accessed data to improve performance.
- Testing: Strategy for testing your application to ensure it works as expected

# Stratergies to consider
- UI/UX feedback
- Multi-page/Multi-modal Forms
- E2E testing

# Technology Used
This project utilizes various technologies to enhance development and code reliability:
- TypeScript: A statically typed superset of JavaScript that adds static types to the language, aiding in building robust components.
- Zod: A TypeScript-first schema declaration and validation library that provides static type inference and ensures data aligns with the expected structure.
- Hookform: A type-safe library for handling forms, automating basic form validation and keeping code cleaner and safer.
- Fetch: A modern, promise-based API for making asynchronous HTTP requests in the browser, providing a powerful and flexible feature set.
- SWR: A React Hooks library for remote data fetching, ensuring continuous and automatic data updates for a fast and reactive UI.
- React Testing Library: A lightweight solution for testing React components, focusing on behavior rather than implementation details.
- MSW (Mock Service Worker): A tool used to mock API requests at the network level, creating realistic mock APIs for faster development.

# Design Patterns
This project demonstrates modern best practices for developing an application in React. It incorporates the following design patterns:
- API Agents: Organizes API calls and separates them from the rest of the application logic for improved code maintainability.
- Domain Hook: Manages meter readings data using hooks for data fetching, caching, and local state management, enhancing code maintainability and testability.
- Container Pattern: Separates business logic from presentation, enhancing code organization and reusability.
- Behavior-Driven Testing: Utilizes Behavior-Driven Development (BDD) to describe the expected behavior of components, improving communication among stakeholders.