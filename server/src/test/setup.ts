process.env.NODE_ENV ??= "test";
process.env.DATABASE_URL ??=
  "postgresql://test:test@localhost:5432/fierzio_test?sslmode=disable";
process.env.ACCESS_TOKEN_SECRET ??=
  "test-access-token-secret-min-32-characters-long";
process.env.REFRESH_TOKEN_SECRET ??=
  "test-refresh-token-secret-min-32-characters-long";
process.env.CLIENT_ORIGIN ??= "http://localhost:3000";
