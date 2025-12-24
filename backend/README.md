# GShock Backend

Minimal setup instructions to run the backend locally.

Required environment variables (create a `.env` file in `backend/`):

- `MONGODB_URI` or `MONGO_URI` - MongoDB connection string.
- `JWT_SECRET` - Secret used to sign backend JWT tokens.
- `FIREBASE_SERVICE_ACCOUNT_KEY` - (optional) JSON string of Firebase service account credentials. If not provided, the code expects a local file at `src/config/firebaseAdminKey.json` (not committed).
- `PORT` - optional; defaults to `5000`.

Install and run:

```bash
cd backend
npm install
# development with auto-reload
npm run dev
# or production
npm start
```

Notes:
- The server will attempt to connect to MongoDB using `MONGODB_URI`.
- Admin-only endpoints require a valid backend JWT issued by the `/api/auth` login flow (Firebase token exchange).
