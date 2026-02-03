# Marrfee Notes

Full‑stack notes app with a React + Vite frontend and a Flask + PostgreSQL backend. It includes user authentication with JWTs, note CRUD with soft‑delete/restore, and an automatic cleanup job for old deleted notes.

**Tech stack**
React 19, Vite, React Router, Flask, PostgreSQL (psycopg), JWT (flask‑jwt‑extended), bcrypt, APScheduler.

**Folder structure**
```
.
├── backend/
│   ├── app/
│   │   ├── __init__.py      # app factory, JWT, CORS, scheduler
│   │   ├── routes.py        # auth + notes API
│   │   ├── db.py            # DB helper + schema loader
│   │   ├── schema.sql       # users + notes tables + indexes
│   │   └── task.py          # scheduled purge job
│   ├── main.py              # bootstraps app + schema
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── API/             # API client
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── styles/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

**Key features implemented**
1. **JWT authentication** for register/login with token‑protected routes on the backend.
2. **Password hashing** using bcrypt before storing credentials.
3. **Notes CRUD** with validation, partial updates, and consistent JSON responses.
4. **Soft delete + restore** (trash) and **hard delete** for permanently removing notes.
5. **Scheduled cleanup job** that purges deleted notes older than 30 days.
6. **PostgreSQL schema + indexes** optimized for active/deleted note queries.
7. **React context‑based state** for auth + note data fetching and caching.
8. **API client abstraction** with centralized request handling and auth headers.

**Setup**
1. Create environment files:
   - `backend/.env`
   - `frontend/.env`
2. Required environment variables:
   - `MARRFEE_OS_DB_URI` = Postgres connection string
   - `JWT_SECRET_KEY` = secret used to sign JWTs
   - `PORT` = backend port (default `4000`)
   - `VITE_NOTED_API_URL` = backend URL (ex: `http://localhost:4000`)

**Run the project**
1. Backend:
   ```bash
   cd backend
   python -m venv .venv
   . .venv/bin/activate  # or .venv\Scripts\activate on Windows
   pip install -r requirements.txt
   python main.py
   ```
2. Frontend (separate terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   This runs both Vite and the backend via the `concurrently` script. Make sure `PORT` and `VITE_NOTED_API_URL` match.

**Notes**
- The backend auto‑creates the schema on boot (`main.py -> create_schema()`).
