# FullstackAssignment-FE

**FullstackAssignment-FE** is a frontend project built with React, TypeScript, and Vite, providing a modern user interface for data management and analytics systems. The application supports authentication, user management, chart visualization, and many other features.

## Technologies Used

- **React**: UI library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Vite**: Fast frontend build and development tool.
- **Redux Toolkit**: State management for the application.
- **React Router**: Client-side routing.
- **Recharts**: Charting library for React.
- **Tailwind CSS**: Utility-first CSS framework for styling (if used).
- **Lucide-react**: SVG icon library for React.
- **Zod**: Form validation and schema definition.
- **ESLint**: Code linting and formatting.

## Installation

1. **Requirements:**
   - Node.js >= 16.x
   - npm >= 8.x

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or the port specified by Vite).

4. **Build for production:**
   ```sh
   npm run build
   ```

5. **Run lint:**
   ```sh
   npm run lint
   ```

## Testing

- **Manual testing:** Access features such as registration, login, dashboard, and charts to verify functionality.
- **Automated testing:** (If available) Run:
  ```sh
  npm test
  ```
  or
  ```sh
  npm run test
  ```

## Assumptions

- The application uses pre-configured backend APIs (update endpoints if needed).
- Some UI components may be custom or use third-party libraries.
- CI/CD, automated testing, or deployment are not integrated yet (should be added if required).
- Environment variables are configured in the `.env` file.

---