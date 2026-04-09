# Voyager Deployment Notes

This project is split into:

- `frontend`: Create React App
- `backend`: Node.js + Express + MongoDB

The cleanest deployment setup is:

- `frontend` on Vercel or Render Static Site
- `backend` on Render Web Service

## What Changed

The repo has been updated so deployment settings come from environment variables instead of hardcoded `localhost` values.

Changes made:

- frontend API requests now use `REACT_APP_API_URL`
- image URLs now use the deployed API base URL
- backend CORS now uses `FRONTEND_URL`
- password reset links now use `FRONTEND_URL`
- backend production start command now uses `node server.js`
- added `render.yaml` and `frontend/vercel.json`

## Environment Variables

Frontend (`frontend/.env`):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Backend (`backend/.env`):

```env
PORT=5000
MONGO_URI=mongodb+srv://your-mongodb-connection-string
JWT=replace-with-a-secure-random-secret
FRONTEND_URL=http://localhost:3000
```

## Option 1: Vercel Frontend + Render Backend

This is the setup I recommend.

### Backend on Render

1. Create a new `Web Service`.
2. Point it to this repo.
3. Set `Root Directory` to `backend`.
4. Set build command to `npm install`.
5. Set start command to `npm start`.
6. Add env vars:
   `MONGO_URI`, `JWT`, `FRONTEND_URL`
7. Deploy and copy the backend URL, for example:
   `https://voyager-api.onrender.com`

### Frontend on Vercel

1. Import the same repo into Vercel.
2. Set the project root to `frontend`.
3. Framework preset can stay as React / Create React App.
4. Add env var:

```env
REACT_APP_API_URL=https://your-render-backend.onrender.com/api
```

5. Deploy.
6. After Vercel gives you the frontend URL, update Render backend env:

```env
FRONTEND_URL=https://your-vercel-app.vercel.app
```

7. Redeploy the backend so CORS and password reset links use the real frontend domain.

## Option 2: Render for Both Frontend and Backend

You can also deploy both services on Render.

Use the included `render.yaml`, then set these values in Render:

- `REACT_APP_API_URL=https://your-api-service.onrender.com/api`
- `FRONTEND_URL=https://your-frontend-service.onrender.com`
- `MONGO_URI=...`
- `JWT=...`

## Things You Still Need To Watch

- File uploads are stored in `backend/images` on the server filesystem. On Render, local disk is not durable across deploys/restarts unless you attach persistent storage, and Vercel serverless is not a good fit for this backend because of that.
- Your backend currently contains hardcoded email credentials in `backend/controllers/authController.js`. Those should be moved into environment variables before public deployment.
- If you use custom domains, update `FRONTEND_URL` to the final domain.

## Local Development

Backend:

```bash
cd backend
npm install
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm start
```
