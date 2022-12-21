import connection from "../database/db.js";

export function selectUsersData() {
  return connection.query(
    `SELECT users."id", users."name", uu."visitCount", uu."linkCount"
  FROM (
    SELECT urls."userId", SUM(urls."visitCount") AS "visitCount", COUNT(urls."userId") AS "linkCount"
    FROM urls
    GROUP BY urls."userId") uu
  JOIN users ON users."id" = uu."userId"`
  );
}
