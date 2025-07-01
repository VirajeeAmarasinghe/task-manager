# Task Manager Frontend

This is the Angular frontend for the Task Manager application.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (install globally with `npm install -g @angular/cli`)

## Setup Instructions

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure API endpoint**

   Edit `src/environments/environment.ts` and set the correct `apiUrl` for your backend, for example:

   ```typescript
   export const environment = {
     production: false,
     apiUrl: "http://localhost:8000/api",
   };
   ```

   > Adjust the URL if your backend runs on a different port or path.

3. **Start the development server**

   ```bash
   ng serve
   ```

   Open your browser at [http://localhost:4200/].

## Building for Production

To build the project for production, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

To execute unit tests via [Karma](https://karma-runner.github.io):

```bash
ng test
```
