# API Guidelines

Overview: Backend integration will use RESTful endpoints. Use a clear versioning scheme (`/api/v1/...`) and JSON for payloads.

Conventions:
- Use HTTP status codes correctly: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Server Error).
- All requests and responses use JSON and include an envelope: `{ data: ..., error: ... }` when appropriate.
- Authentication: initially support bearer token (JWT) for protected endpoints. Keep login mockable for local dev.

Example endpoints for authentication:
- `POST /api/v1/auth/login` — body `{ email, password }` → returns `{ token, user }`.
- `POST /api/v1/auth/send-otp` — body `{ email }` → returns `{ sent: true }`.
- `POST /api/v1/auth/verify-otp` — body `{ email, code }` → returns `{ token }` when valid.

Local mocks:
- Place mock endpoints in `src/data/mocks/*.ts` and use a simple fetch wrapper that points to mocks when `process.env.NODE_ENV === 'development'`.

Security notes:
- Never commit secrets. Provide `.env.example` documenting required env vars.
- Sanitize and validate inputs server-side.
