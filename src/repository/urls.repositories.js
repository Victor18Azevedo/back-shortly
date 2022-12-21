import connection from "../database/db.js";

export function selectUrlById(id) {
  return connection.query(
    `SELECT "id", "url", "shortUrl" FROM urls WHERE "id" = $1`,
    [id]
  );
}

export function selectUrlByShortUrl(shortUrl) {
  return connection.query(
    `SELECT "id", "url" FROM urls WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

export function updateVisitCount(id) {
  return connection.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1
  WHERE "id" = $1`,
    [id]
  );
}

export function insertShortUrl(url, shortUrl, id) {
  return connection.query(
    `INSERT INTO urls ("url", "shortUrl", "userId") VALUES
  ($1, $2, $3);`,
    [url, shortUrl, id]
  );
}

export function deleteUrlById(id) {
  return connection.query(`DELETE FROM urls WHERE "id" = $1`, [id]);
}
