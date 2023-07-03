# NasaExplorer

NasaExplorer is a web application that allows users to sign up, log in, and view the latest image from the NASA API.

## Features

- User registration: Users can create a new account by providing their email and password.
- User login: Existing users can log in to their account using their credentials.
- Authentication: User authentication is implemented using JWT (JSON Web Tokens) for secure access to protected routes.
- NASA API integration: The application fetches the latest image from the NASA API and displays it to the authenticated users.
- Responsive design: The application is designed to be responsive and compatible with different screen sizes.

## Technologies Used

- Next.js: A React framework for server-side rendering and building web applications.
- MongoDB: A NoSQL database used for storing user information.
- Express: A Node.js web application framework used for handling server-side logic.
- JSON Web Tokens (JWT): Used for user authentication and authorization.
- NASA API: The application interacts with the NASA API to fetch the latest image.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/NasaExplorer.git
```

2. Navigate to the project directory:

```shell
cd NasaExplorer
```

3. Install the dependencies:

```shell
npm install
```

4. Set up environment variables:

   - Create a `.env` file in the project root directory.
   - Define the following variables in the `.env` file:

     ```plaintext
     MONGODB_URI=your-mongodb-uri
     JWT_SECRET=your-jwt-secret
     NASA_API_KEY=your-nasa-api-key
     ```

     Replace `your-mongodb-uri`, `your-jwt-secret`, and `your-nasa-api-key` with your own values.

5. Start the development server:

```shell
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

- Sign up: Click on the "Sign up" link and provide your email and password to create a new account.
- Log in: After signing up, you can log in with your credentials on the login page.
- View latest NASA image: Once logged in, you will be redirected to the dashboard where you can view the latest image from the NASA API.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
