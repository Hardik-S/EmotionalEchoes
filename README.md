# Emotional Echoes - Mindfulness Tool MVP

A frontend-only React application that serves as an MVP for Emotional Echoes, an AI-inspired mindfulness tool. This project focuses on UI/UX and uses browser-based storage to demonstrate core functionality without a backend.

## Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Mock Authentication Flow**: Basic sign-up and login functionality
- **Mood Tracking**: Record your mood with a slider and optional notes
- **Timeline Visualization**: View your mood history in a simple chart
- **AI Insights**: Mock intelligence that provides personalized suggestions
- **Guided Meditations**: Recommendations for mindfulness practices
- **Local Storage**: Your data persists across browser sessions
- **Notification System**: Reminders for daily mood checks

## Installation and Setup

1. Clone the repository
   ```
   git clone https://github.com/Hardik-S/emotionalechoes.git
   cd emotionalechoes
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

- **App.js**: Main application component with routing and state management
- **components.js**: All UI components for the application
- **styles.css**: Styling for the entire application
- **index.js** (not shown): Entry point that renders the App component

## Dependencies

- React
- React Router DOM
- No external API calls or backend services

## User Flow

1. Landing page → Sign up/Login
2. Dashboard home with mood widgets and insights
3. Record mood using the check-in form
4. View your mood history on the timeline
5. Explore AI insights and guided meditations
6. Receive periodic notifications for mood checks

## Data Management

All data is stored in the browser's localStorage. The application creates mock data for initial use and saves user entries locally, allowing for a realistic demonstration of the application's capabilities without a backend.

## Design Principles

- **Calm Aesthetics**: Soft colors and clean layouts to promote mindfulness
- **Intuitive Navigation**: Simple flows and clear calls-to-action
- **Responsive Layout**: Adapts to different screen sizes
- **Accessibility**: Semantic HTML and logical tab order

## Extending the Project

To extend this project for production:
1. Implement a proper backend API for data persistence
2. Add actual authentication with JWT or similar
3. Implement real AI analysis for personalized insights
4. Create a proper notification system
5. Add more detailed visualizations and reports

## License

MIT
