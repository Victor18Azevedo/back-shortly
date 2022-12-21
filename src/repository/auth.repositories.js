import connection from "../database/db.js";

export function insertUser(name, email, passwordHash) {
  return connection.query(
    `INSERT INTO users ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

export function selectUser(email) {
  return connection.query(
    `SELECT "id", "name", "password" FROM users WHERE "email" ILIKE $1`,
    [email]
  );
}
