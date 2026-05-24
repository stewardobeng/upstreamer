# PostgreSQL Setup

The app currently runs on the local JSON store in `data/db.json`. PostgreSQL is the recommended production database for the VPS.

## Local Windows Setup

1. Install PostgreSQL.
2. Create a database and user:

```sql
CREATE USER streammaster WITH PASSWORD 'streammaster';
CREATE DATABASE streammaster OWNER streammaster;
```

3. Apply the schema:

```powershell
psql "postgres://streammaster:streammaster@localhost:5432/streammaster" -f database.sql
```

4. Add this to `.env`:

```env
DATABASE_URL=postgres://streammaster:streammaster@localhost:5432/streammaster
```

## VPS Setup

Use the same `database.sql` file, then set `DATABASE_URL` in the VPS environment.

The `pg` package is already installed so the backend can be moved from the JSON adapter to PostgreSQL without changing the app UI.
