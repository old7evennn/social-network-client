export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NODE_ENV
    : "http://localhost:3000"