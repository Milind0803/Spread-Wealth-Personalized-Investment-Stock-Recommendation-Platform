# Spread-Wealth-Personalized-Investment-Stock-Recommendation-Platform
“Spread Wealth” is a full-stack web application that helps users plan and manage investments based on their financial profile. The platform collects a user’s personal and investment preferences, analyzes their risk tolerance, and provides personalized stock and sector recommendations.
Frontend:

Framework: React

Styling: Tailwind CSS, UI components from custom ui library

Form Validation: react-hook-form + zod

Features:

User Signup: Collects name, email, password, and age.

Investment Questionnaire: Multi-step form collecting:

Risk tolerance (low, medium, high)

Investment term (short, medium, long)

Investment amount & monthly contribution

Preferred sectors (Technology, Healthcare, ETFs, etc.)

Results Page: Displays personalized stock recommendations based on the questionnaire.

API Integration: Sends user profile and investment data to backend using fetch.

Backend:

Framework: Node.js + Express

Database: MongoDB (Atlas cloud)

Features:

User Management: Signup endpoint with validation and duplicate email checks.

Investment Management: Stores user investment preferences including:

Investment type/term

Risk level

Amount and monthly contribution

Sectors of interest

Data Retrieval: Provides endpoints to fetch user + investment profile.

Middleware:

cors for cross-origin requests

express.json() to parse incoming JSON payloads

MongoDB Schemas:

User: { name, email, password, age }

Investment: { userId, type, amount, monthlyContribution, riskLevel, sectors }

Flow of the Application:

User Signup:

User submits personal details → data saved in MongoDB → userId stored in localStorage.

Investment Questionnaire:

User completes multi-step form → data sent to /investment endpoint → saved in MongoDB under userId.

Recommendations:

Backend returns investment data → frontend calculates stock recommendations → results displayed to user.

Technologies Used:

Frontend: React, Tailwind CSS, lucide-react (icons), react-hook-form, zod

Backend: Node.js, Express, MongoDB, Mongoose

Tools: Nodemon (dev), fetch API for HTTP requests

Unique Features / Highlights:

Multi-step investment questionnaire with smooth UX.

Stores both personal and investment-related user data.

Sector-based investment selection.

Personalized stock recommendations based on risk profile.

Fully functional full-stack application with MongoDB as backend storage.
