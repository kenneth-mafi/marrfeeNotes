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
9. **Code notes + workbench** with SQL/JavaScript/Python editor modes.

**Local setup (run on your machine)**
**Prerequisites**
- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL 14+

**Database setup**
1. Create a database (example: `marrfee_notes`).
2. Create a schema named `notes` in that database (required by the SQL):
   ```sql
   CREATE SCHEMA IF NOT EXISTS notes;
   ```
3. Build your Postgres connection string:
   `postgresql://USER:PASSWORD@localhost:5432/marrfee_notes`

**Environment variables**
1. Create these files:
   - `backend/.env`
   - `frontend/.env`
2. Add the required values:
   - `MARRFEE_OS_DB_URI` = Postgres connection string
   - `JWT_SECRET_KEY` = secret used to sign JWTs
   - `PORT` = backend port (default `4000`)
   - `VITE_NOTED_API_URL` = backend URL (example: `http://localhost:4000`)

**Run the project**
1. Backend (terminal 1):
   ```bash
   cd backend
   python -m venv .venv
   . .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```
2. Frontend (terminal 2):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

**Notes**
- The backend auto‑creates tables and indexes on boot (`main.py -> create_schema()`).
- If you prefer a single command for dev, you can run `npm run dev` inside `frontend/` after your backend deps are installed, but it uses your system `python` (not the venv).
