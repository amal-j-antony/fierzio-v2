# Fierzio API server

Express + TypeScript API for Fierzio. Uses Drizzle/Neon for persistence and JWT cookie sessions.

## Scripts

- `npm run dev` — start the API with `tsx watch`
- `npm run build` — type-check and compile to `dist/`
- `npm start` — run the compiled server
- `npm test` — run Vitest unit tests (`INTEGRATION_TEST=true npm test` for DB-backed integration tests)

## Logging

Structured logging uses [Pino](https://getpino.io). There is a single application logger; do not create additional Pino instances.

### Usage

```ts
import { logger } from "../utils/logger.js";

logger.info({ userId }, "User logged in");
```

For a module/service with a stable context, use a child logger:

```ts
import { createModuleLogger } from "../utils/logger.js";

const logger = createModuleLogger("tournament");
logger.info({ tournamentId }, "Tournament created");
```

### Levels

`fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`. Use them consistently:

- `debug` — detailed diagnostics (development only).
- `info` — significant normal events (registration, login, resource lifecycle).
- `warn` — recoverable/unexpected situations (failed login, denied authorization, rate limits).
- `error` — failures needing investigation, including database errors.

### Structured logging convention

Always pass a context object first and a stable message second:

```ts
// Preferred
logger.info({ userId, organizationId }, "Organization loaded");

// Avoid
logger.info(`Organization ${organizationId} loaded`);
logger.info("Organization loaded", userId, organizationId);
```

Include meaningful fields such as `requestId`, `userId`, `operation`, `route`, `method`, `statusCode`, `duration`, and `err`. Do not duplicate context in the message.

### Errors

Pass exceptions via the `err` key so Pino serializes them correctly, and never swallow them:

```ts
try {
  await operation();
} catch (err) {
  logger.error({ err, operation: "createTournament" }, "Failed to create tournament");
  throw err;
}
```

### Request IDs

Every request receives an `x-request-id` (reused from the inbound header when present, otherwise generated). The ID is propagated through `AsyncLocalStorage`, so every log emitted during a request automatically includes `requestId`; it is also returned in the response header and logged on request completion.

### Configuration

Set `LOG_LEVEL` (defaults to `info`):

```env
LOG_LEVEL=info
```

- **development** — `pino-pretty` colorized output.
- **production** — structured JSON to stdout.
- **test** — `silent`, to keep test output clean.

### Sensitive data

Never log passwords, password hashes, JWTs, tokens, cookies, authorization headers, API keys, database credentials, or private user data. Pino redaction is configured as defense-in-depth, but callers are responsible for sending only safe fields. Do not log entire `req`/`res` objects, request/response bodies, or full database documents.
