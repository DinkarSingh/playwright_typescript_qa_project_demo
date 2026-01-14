# 🎭 Playwright Test Automation Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for testing the RealWorld application.

## 🎯 Project Objective

This project demonstrates a robust and maintainable test automation strategy using Playwright with TypeScript. The framework focuses on:

• **Critical user journey coverage** - Testing essential application workflows
• **API and UI testing integration** - Combining both approaches for comprehensive coverage  
• **Maintainable architecture** - Clean separation of concerns and reusable components
• **Real-world scenarios** - Practical testing patterns for production applications

## 🌐 Application Under Test

This framework tests the **RealWorld** demo application - a Medium.com clone that demonstrates real-world functionality.

🔗 **UI Application**: [https://demo.realworld.show](https://demo.realworld.show)  
🔗 **API Endpoint**: [https://api.realworld.show/api](https://api.realworld.show/api)

The application includes realistic scenarios for:
• User authentication (signup/login)
• Article creation and management  
• User interactions and workflows
• Data persistence and state management

## 🏗️ Framework Architecture

### 📁 Project Structure

```
├── data/                   → Test data and configuration
│   ├── default.ts         → Environment URLs and credentials
│   └── index.ts           → Data exports
├── fixtures/              → Playwright fixtures and test setup
│   └── user.ts            → User authentication fixture
├── services/              → API service layer
│   ├── http.ts            → HTTP client configuration
│   ├── login.ts           → Authentication services
│   └── article.ts         → Article management services
├── support/               → Utility functions and helpers
│   └── date.ts            → Date formatting utilities
├── tests/                 → Test specifications
│   ├── UI/                → User interface tests
│   └── API/               → API integration tests
├── types/                 → TypeScript type definitions
└── utils/                 → Page helpers and utilities
```

## 🧠 Key Testing Principles

### 1️⃣ Layered Testing Strategy

• **UI Tests**: End-to-end user workflows with browser interactions
• **API Tests**: Fast, reliable service-level testing  
• **Integrated Approach**: UI tests with API setup for optimal test performance

### 2️⃣ Service Layer Architecture

The `services/` folder provides:
• **Centralized API calls** - Reusable service functions
• **Type safety** - Full TypeScript interfaces for requests/responses
• **Authentication handling** - Token management and session control
• **Error handling** - Consistent error reporting across services

### 3️⃣ Data Management

The `data/` folder centralizes:
• **Environment configuration** - URLs for different environments
• **Test credentials** - Secure handling of authentication data
• **API endpoints** - Centralized endpoint management

### 4️⃣ Private API Integration

Tests leverage private API calls for:
• **Test setup** - Creating users and test data via API
• **State verification** - Confirming backend state changes
• **Performance optimization** - Faster test execution through API shortcuts

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or later)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DinkarSingh/playwright_typescript_qa_project_demo.git
   cd playwright-project
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install Playwright browsers**:

   ```bash
   npx playwright install
   ```

4. **Set up environment variables**:
   ```bash
   # Create .env file with your credentials
   USER_EMAIL=your-email@example.com
   USER_PASSWORD=your-password
   ```

## ▶️ Running Tests

### UI Tests (User Interface)

```bash
# Run all UI tests in headed mode
npx playwright test --project='default' --workers=1 --headed

# Run UI tests in headless mode
npx playwright test --project='default' --workers=1

# Run with debugging
npx playwright test --project='default' --workers=1 --debug
```

### API Tests (Service Level)

```bash
# Run all API tests
npx playwright test --project='public-api' --workers=1

# Run specific API test files
npx playwright test tests/API/ --workers=1
```

### Full Test Suite

```bash
# Run all tests (UI + API)
npx playwright test

# Run with static code analysis
npm run static:test
```

## 🔧 Framework Features

### Authentication Management

- **Automated login** via fixture system
- **Token extraction** from API responses
- **Session persistence** across test scenarios
- **Multiple authentication strategies** (UI + API)

### Service Layer Benefits

- **Reusable API calls** for test setup and verification
- **Type-safe interfaces** for all API interactions
- **Centralized configuration** for different environments
- **Built-in debugging** with comprehensive logging

### Support Functions

- **Date utilities** for dynamic test data
- **Page helpers** for common UI interactions
- **Custom fixtures** for test setup and teardown
- **Error handling** with detailed debugging information

## 🏷️ Test Organization

| Category      | Purpose                       | Location     |
| ------------- | ----------------------------- | ------------ |
| **UI Tests**  | End-to-end user workflows     | `tests/UI/`  |
| **API Tests** | Service integration testing   | `tests/API/` |
| **Services**  | Reusable API functions        | `services/`  |
| **Fixtures**  | Test setup and authentication | `fixtures/`  |
| **Data**      | Configuration and test data   | `data/`      |

## 🔄 CI/CD Integration

The framework integrates with GitHub Actions:
• **Pull Requests**: Fast regression testing  
• **Main Branch**: Complete test suite execution
• **Retry Logic**: CI environments get 2 retries, local development gets 0
• **Reporting**: HTML and JUnit reports with artifacts

## 📊 Reports and Debugging

### Test Reports

- **HTML Reports**: Generated in `playwright-report/`
- **JUnit XML**: Available for CI integration
- **Screenshots**: Captured on test failures
- **Videos**: Recorded for failed test scenarios

### Debugging Features

- **Console logging** for API requests and responses
- **Network request inspection** with detailed payloads
- **Step-by-step debugging** with `--debug` flag
- **Screenshot capture** on failures

## 📌 Best Practices

This framework demonstrates:
• **Clean architecture** with separation of concerns
• **Type safety** throughout the testing stack  
• **Maintainable test design** with reusable components
• **Performance optimization** through strategic API usage
• **Real-world patterns** applicable to production testing

The goal is to showcase not just test automation, but **strategic test architecture** that scales with application complexity.
