# SocialLoginPostgers - Example Website

SocialLoginPostgers is a demonstration website that showcases the integration of PostgreSQL as a database with Express.js for the backend and React.js for the frontend. The project also utilizes Google and Facebook login APIs to enable seamless user registration and authentication.

![Project Demo](link_to_project_demo_screenshot)

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Usage](#usage)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

## Introduction

SocialLoginPostgers demonstrates a practical implementation of user authentication using popular social media platforms. By integrating Google and Facebook login APIs, this project enables users to sign up and log in seamlessly, while securely storing user data in a PostgreSQL database.

## Features

-   User registration and authentication using Google and Facebook login APIs.
-   Secure storage of user information in a PostgreSQL database.
-   Express.js server providing a RESTful API for user management.
-   React.js frontend for a user-friendly and responsive interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   Node.js and yarn installed on your machine.
-   PostgreSQL database up and running.
-   Google and Facebook developer accounts and API keys.

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/SocialLoginPostgers.git
    ```

2. Navigate to the project root:

    ```bash
    cd SocialLoginPostgers
    ```

3. Install backend dependencies:

    ```bash
    cd backend
    yarn
    ```

4. Install frontend dependencies:

    ```bash
    cd ../frontend
    yarn
    ```

## Configuration

Configure your environment variables by creating a `config.env` file in the `backend/config` directory

```
    PORT=3000
    NODE_ENV=dev

    DB_HOST=your_db_host
    DB_DATABASE=your_db_name
    DB_USER=your_db_username
    DB_PASSWORD=your_db_password
    DB_PORT=your_db_port

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FACEBOOK_APP_ID=your_facebook_app_id
    FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## Usage

1. Start the backend dev server:
    ```bash
    cd backend
    yarn dev
    ```
2. Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```
3. Access the frontend by navigating to `localhost:5173` in your web browser

## Technologies Used

-   Node.js
-   Express.js
-   React.js
-   PostgreSQL
-   Google and Facebook Login APIs

## Contributing

Contributions are welcome! To contribute to SocialLoginPostgers, follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

None
