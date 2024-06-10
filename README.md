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

# Technology Used

## TypeScript
TypeScript is a statically typed superset of JavaScript that compiles to plain JavaScript. It adds static types to the language, helping developers catch errors early in the development process. TypeScript also includes the latest JavaScript features, including those from ECMAScript 2015 and future proposals like async functions and decorators, aiding in building robust components.

## Zod
Zod is a TypeScript-first schema declaration and validation library. It allows developers to build schemas that mirror their data structures and provides static type inference. Zod schemas can validate data at runtime safely and efficiently, ensuring data aligns with the expected structure. Zod's integration with TypeScript enhances code reliability and maintainability.

## Hookform
A type-safe library for handling forms. Using the `zod-resolver` package, we can automate basic form validation and have this handled for us outside of the `handleSubmit` functions, keeping our code cleaner and safer at the same time.

## Fetch
Fetch is a modern, promise-based API for making asynchronous HTTP requests in the browser. It's built into most modern browsers and is used in this project to interact with the API. Fetch provides a more powerful and flexible feature set for fetching resources compared to the older XMLHttpRequest.

## SWR
SWR is a React Hooks library for remote data fetching. The name SWR stands for "stale-while-revalidate," an HTTP cache invalidation strategy popularized by HTTP RFC 5861. SWR first returns data from the cache (stale), then sends the fetch request (revalidate), and finally returns the up-to-date data. With SWR, components receive continuous and automatic data updates, keeping the UI fast and reactive.

## React Testing Library
React Testing Library is a lightweight solution for testing React components. It provides utility functions on top of react-dom and react-dom/test-utils, promoting better testing practices. Its primary guiding principle is that tests should focus on the component's behavior rather than implementation details. This approach makes tests more maintainable and resilient to changes, ensuring they reflect what users would experience.

## MSW (Mock Service Worker)
MSW is a tool used to mock API requests at the network level. It intercepts outgoing requests and returns predefined responses, effectively simulating the behavior of a real API. This is particularly useful during development when actual APIs are not yet available. MSW allows developers to create realistic mock APIs, speeding up the development process and ensuring the application handles expected data correctly.


# Design Patterns

## Description
This project demonstrates modern best practices for developing an application in React.

## Design Pattern Decisions
Various design patterns have been implemented to improve the structure, flexibility, and maintainability of the codebase:

### API Agents
The API agent pattern is used to manage API interactions. The `addMeterReading` function in `meterReadings.ts` encapsulates a POST request to the meter readings API. It takes an `accountId` and a payload as parameters and sends a request to add a new meter reading for the specified account. This function also includes basic error handling, ensuring proper management of any issues with the API request. This pattern keeps API calls organized and separate from the rest of the application logic, enhancing code maintainability.

### Domain Hook
The `useMeterReadings` function is a custom React hook that manages meter readings data. It uses the `useSWR` hook for data fetching and caching, and `useState` for local state management. The hook takes an `accountId` and fetches the corresponding meter readings. It also provides a `create` function to add new meter readings. The state of these operations, including loading and error states, is managed within the hook and exposed for use in the UI. This separation of API interactions and state management enhances code maintainability and testability.

### Container Pattern
The `LoginContainer.tsx` component demonstrates the container pattern in React. This pattern separates business logic from presentation, enhancing code organization and reusability. In this component, hooks like `useLogin` and `useUserStateContext` are used to manage login state and user actions. Navigation logic is encapsulated within the component, using the `useNavigate` hook from React Router. The `LoginContainer` then passes these state and action handlers as props to the `Login` presentation component. This separation allows the `Login` component to focus solely on rendering the UI based on the provided props, keeping it clean and reusable.

### Behavior-Driven Testing
This project employs Behavior-Driven Development (BDD), enhancing communication among stakeholders by using a language that is easy to understand and describes the system's expected behavior. The `Login.test.tsx` file exemplifies BDD in action. It contains tests that describe the behavior of the `Login` component under various scenarios. Each test clearly describes the expected outcome, making it easy to understand the component's intended functionality.
