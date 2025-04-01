# React Company Authentication

This project is a React application that provides authentication functionality for users and allows companies to manage their profiles. It includes a login page, a sign-up page, and a company profile form.

## Features

- **User Authentication**: Users can log in with their email and password.
- **Sign-Up**: New users can create an account, and their credentials are saved to a simulated database.
- **Company Profile Management**: Companies can fill out and manage their profile details.

## Project Structure

```
react-company-auth
├── public
│   ├── favicon.ico
│   └── logo.svg
├── src
│   ├── app
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── signup
│   │   │   └── page.tsx
│   │   ├── company
│   │   │   ├── profile
│   │   │   │   └── page.tsx
│   │   │   └── dashboard
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── auth
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── company
│   │   │   └── ProfileForm.tsx
│   │   ├── layout
│   │   │   ├── Header.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── textarea.tsx
│   │       └── toast.tsx
│   ├── lib
│   │   ├── auth.ts
│   │   └── db.ts
│   ├── types
│   │   ├── auth.ts
│   │   └── company.ts
│   └── styles
│       └── globals.css
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd react-company-auth
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```

Visit `http://localhost:3000` in your browser to view the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for details.