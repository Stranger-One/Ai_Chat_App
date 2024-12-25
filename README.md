# AI Chat Application

Welcome to the **AI Chat Application**, a dynamic and interactive chat platform leveraging state-of-the-art technologies to deliver seamless real-time communication. This application integrates cutting-edge AI capabilities with robust backend and frontend frameworks.

## Features

- **AI-powered conversations** with generative AI capabilities.
- **Responsive UI** with smooth animations powered by GSAP.
- **Form validation and management** using React Hook Form.
- **Notification system** using React Hot Toast.
- **Customizable routes** with React Router.

---

## Tech Stack

### Frontend
- **React**: For building user interfaces.
- **GSAP**: For animations.
- **React Hook Form**: For form handling.
- **Redux Toolkit**: For state management.
- **React Router DOM**: For routing.

### Backend
- **Appwrite**: For backend services including authentication and database management.

### AI Integration
- **@google/generative-ai**: To enable AI-powered chat capabilities.

### Additional Libraries
- **react-icons**: For scalable vector icons.
- **html-react-parser**: For rendering HTML content dynamically.
- **react-hot-toast**: For elegant toast notifications.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (>= 14.x)
- npm or yarn package manager
- Appwrite backend configured

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd ai-chat-application
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure Appwrite in your environment variables:
   ```bash
   REACT_APP_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
   REACT_APP_APPWRITE_PROJECT=<your-appwrite-project-id>
   ```

---

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Scripts

- **`npm start`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for production.
- **`npm test`**: Launches the test runner.

---


## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- The [Google Generative AI](https://developers.google.com/) library for providing advanced AI capabilities.
- The [Appwrite](https://appwrite.io/) team for backend services.
- Open-source libraries and contributors who made this project possible.

---

Happy chatting! 😊
