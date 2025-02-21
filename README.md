# Mural Pay Challenge

## Overview

This project was developed as part of the technical challenge for Mural Pay. It demonstrates my expertise in front-end development using modern technologies and best practices.

## Technologies Used

- **Frontend:** React.js, Next.js, TypeScript, Emotion CSS

- **API Integration:** Axios / REST

- **Testing:** Jest, React Testing Library

- **State Management:** Zustand

- **Tooling:** ESLint, Prettier, Husky

- **CI/CD:** GitHub Actions for automated testing and deployment

## Features

### Main Functionalities

- **Organization Authentication:** Secure login and signup process using cookies to improve security.

- **Home:** Interactive user dashboard displaying relevant information.

- **Transaction Processing:** Integration with transactions API for transactions.

- **Account Management:** Allow the possibility of creating organization's accounts.

- **Responsive UI:** Optimized layout for mobile and desktop devices.

- **Data Fetching:** REST API using Axios and creating a custom hook to consume the services.

- **Error Handling:** Graceful error messages and logging for debugging.

- **Performance Optimization:** Lazy loading, code splitting and CDN configuration for vercel.

## Installation & Setup

**Prerequisites:**

- **Node.js version 14 or higher** is required. Ensure you have the correct version installed before proceeding.

1.  git clone https://github.com/yourusername/mural-challenge.git

2.  cd mural-challenge

3.  nvm use*(Ensure you have* [_**Node Version Manager (nvm)**_](https://github.com/nvm-sh/nvm) _installed.)_

4.  npm install

5.  Create a .env file in the root directory and configure the required environment variables.

6.  npm run dev

## Environments

- **Pre-production:** [Mural Pay Challenge Preview](https://muralpay-challenge-preview.vercel.app) (triggered by develop branch)

- **Production:** [Mural Pay Challenge](https://muralpay-challenge.vercel.app) (triggered by main branch)

## CI/CD Pipeline

- **GitHub Actions** is used to automate testing and deployment.

- On each push, unit tests are executed with **Jest** to ensure code quality.

- When merging into the develop or main branches, the application is automatically deployed to the corresponding environment.

- **Husky** is used to enforcing pre-commit hooks, running linters, and tests before allowing commits.

## Usage

- Open http://localhost:3000 in your browser.

- Follow the authentication process (if applicable) and interact with the application.

## Improvements & Next Steps

While the challenge requirements have been met, the following improvements could further enhance the project:

- Web Accessibility Standards

- Fix Responsivity

- Add App Error Boundary

- SEO improvements

- CDN configs

- Implement tests

- config Observability

## Contact

For any questions or feedback, feel free to reach out:📧 Email: pablo.thobias@gmail.com🔗 LinkedIn: [linkedin.com/in/pablothobias](https://www.linkedin.com/in/pablothobias/)

**Note:** This repository is intended for technical evaluation purposes as part of the hiring process at Mural Pay.
