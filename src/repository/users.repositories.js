import connection from "../database/db.js";

export function selectUserData(id) {
  return connection.query(
    `SELECT users."id", users."name", uu."visitCount"
    FROM (
      SELECT urls."userId", SUM(urls."visitCount") AS "visitCount"
      FROM urls
      WHERE urls."userId" = $1
      GROUP BY urls."userId") uu
    JOIN users ON users."id" = uu."userId"`,
    [id]
  );
}

export function selectUserUrls(id) {
  return connection.query(
    `SELECT urls."id", urls."shortUrl", urls."url", urls."visitCount"
  FROM urls WHERE urls."userId" = $1`,
    [id]
  );
}
