# Sancrisoft Challenge

This project is a **Next.js** application built with the **App Router**, utilizing **TypeScript** and **styled-components** for a modern, type-safe, and modular development experience. The project structure indicates a focus on organized, feature-based development with clear separation of concerns.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (preferably the latest LTS version)
- Yarn or npm (Yarn is indicated by the `yarn.lock` file)

### Installation

Clone the repository:

```bash
git clone [your-repo-url]
cd sancrisoft-challange
```

Install the dependencies using your preferred package manager:

```bash
yarn install
# or
npm install
```

## Development Server

To start the development server, run the following command:

```bash
yarn dev
# or
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application. The application will automatically reload as you make changes to the source code.

## Available Scripts

In the project directory, you can run:

- `yarn dev`: Starts the development server.
- `yarn build`: Creates a production build of the application.
- `yarn start`: Starts the production server.
- `yarn lint`: Runs ESLint to identify and report on patterns in the code.

## Project Structure

The project follows a well-organized structure, primarily using the Next.js App Router convention along with a dedicated `src` directory.

```
/
├── .next/                         # Next.js build artifacts
├── node_modules/                  # Project dependencies
├── public/                        # Static assets (images, fonts, etc.)
├── src/
│   ├── app/                       # App Router root directory
│   │   ├── home/                  # A specific page directory (e.g., the landing page)
│   │   ├── api/                   # API routes/handlers
│   │   ├── components/            # App-level components
│   │   ├── client.tsx             # Client-side specific logic or entry point
│   │   ├── favicon.ico
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout for the application
│   │   └── page.tsx               # Main page component
│   ├── components/                # Reusable, shared components
│   ├── data/                      # Data files (e.g., mock data, constants)
│   ├── models/                    # Data models or interfaces
│   ├── persistences/              # Data persistence logic
│   └── utils/                     # Utility functions
├── .gitignore                     # Git ignore file
├── eslint.config.mjs              # ESLint configuration
├── next-env.d.ts                  # TypeScript declaration file for Next.js
├── next.config.ts                 # Next.js configuration
├── package.json                   # Project manifest
├── tsconfig.json                  # TypeScript configuration
└── yarn.lock                      # Yarn lock file
```

## Technologies

- **Next.js 15.4.5**: A powerful React framework for production, including the App Router.
- **React 19.1.0**: The core library for building the user interface.
- **TypeScript 5**: Provides static typing to enhance code quality and developer experience.
- **Styled Components 6.1.19**: For writing component-level CSS.
- **ESLint**: Used for linting to enforce a consistent coding style and catch potential errors.

## Styling

The project uses styled-components for all component styling. This approach allows for dynamic, encapsulated styles that are tied directly to their respective React components. Remember to ensure proper Server-Side Rendering (SSR) configuration if needed.

## Deployment

The application can be deployed to various platforms. After running `yarn build`, the optimized output can be served using `yarn start` or deployed to a platform like Vercel, Netlify, or a custom server.

For more information, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

---

**Note**: This README is a starting point. Feel free to add more sections, such as a "Contributing" guide, a list of features, or more detailed explanations of the project's architecture.