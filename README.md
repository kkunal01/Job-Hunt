# Job Hunt

Job Hunt is a full-stack job portal where students can discover and apply for jobs, while recruiters can manage companies, publish jobs, and review applicants.

## Features

- Student and recruiter authentication
- Browse, search, and filter job listings
- Student profiles with skills, bio, resume, and profile photo support
- Recruiter company creation and management
- Job posting and recruiter job management
- Job applications and applicant status updates
- MongoDB persistence with Mongoose
- Cloudinary uploads for profile and company media

## Project Structure

```text
Job-Hunt/
├── backend/     Express API, MongoDB models, authentication, and seed data
└── frontend/    React and Vite client application
```

## Tech Stack

- **Frontend:** React, Vite, React Router, Redux Toolkit, Tailwind CSS, Radix UI
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT stored in an HTTP cookie
- **Uploads:** Multer and Cloudinary

## Requirements

- Node.js 18 or newer
- npm
- MongoDB database, local or MongoDB Atlas
- Cloudinary account for image uploads

## Setup

Clone the repository and install dependencies in both applications:

```bash
git clone <repository-url>
cd Job-Hunt
cd backend
npm install
cd ../frontend
npm install
```

### Backend environment

Create `backend/.env` with these values:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Do not commit `.env` or share real credentials. The backend loads environment variables when started from the `backend` directory.

### Frontend environment

The frontend defaults to:

```text
http://localhost:3000/api/v1
```

To use another backend URL, create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Restart Vite after changing frontend environment variables.

## Running Locally

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

The backend normally runs at `http://localhost:3000`. Its CORS configuration currently allows the Vite development URL `http://localhost:5173`.

## Seed Development Data

The seed command removes existing users, companies, jobs, and applications, then creates linked sample records:

- 10 recruiter users
- 10 student users
- 20 companies
- 20 jobs
- 20 applications

Run it from the backend directory:

```bash
cd backend
npm run seed
```

Every seeded account uses the password `Password123!`. Example accounts include:

```text
Recruiter: recruiter1@jobhunt.test
Student:   student1@jobhunt.test
Password:  Password123!
```

The seed script is for development only because it clears the four collections before inserting data.

## Available Scripts

### Backend

```bash
npm run dev    # Start the API with Nodemon
npm run seed   # Reset and populate development data
```

### Frontend

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## API Overview

All API routes use the `/api/v1` prefix and require authentication unless noted otherwise.

| Area | Endpoint | Methods |
| --- | --- | --- |
| Users | `/api/v1/user/register` | POST |
| Users | `/api/v1/user/login` | POST |
| Users | `/api/v1/user/logout` | GET |
| Users | `/api/v1/user/profile/update` | POST |
| Companies | `/api/v1/company/register` | POST |
| Companies | `/api/v1/company/get` | GET |
| Companies | `/api/v1/company/get/:id` | GET |
| Companies | `/api/v1/company/update/:id` | PUT |
| Jobs | `/api/v1/job/post` | POST |
| Jobs | `/api/v1/job/get` | GET |
| Jobs | `/api/v1/job/getadminjobs` | GET |
| Jobs | `/api/v1/job/get/:id` | GET |
| Applications | `/api/v1/application/apply/:id` | GET |
| Applications | `/api/v1/application/get` | GET |
| Applications | `/api/v1/application/:id/applicants` | GET |
| Applications | `/api/v1/application/status/:id/update` | POST |

## Troubleshooting

- **Signup cannot connect:** confirm the backend is running on port `3000`, or set `VITE_API_BASE_URL` to the correct API URL.
- **CORS errors:** use the Vite URL configured in the backend CORS settings, normally `http://localhost:5173`.
- **Database errors:** verify `MONGO_URI` and confirm the database allows your IP address.
- **Image upload errors:** verify all three Cloudinary variables and select a valid image file.
- **Port already in use:** stop the existing process or change `PORT` in `backend/.env` and update `VITE_API_BASE_URL` accordingly.

## License

This project does not currently declare a license.
