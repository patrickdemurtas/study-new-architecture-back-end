import connectionDb from "../config/database.js"

async function create({ name, author, userId }) {
  await connectionDb.query(`INSERT INTO books (name, author, "userId") VALUES ($1,$2,$3)`, [name, author, userId]);

}

async function findByName(name) {
  return await connectionDb.query(`SELECT * FROM books WHERE name=$1`, [name]);
}


async function findAll() {

  //o "apelido" dado ao u.name (createdBy) foi necessário pois já há um campo "name" na tabela de 
  //"books", o que causa conflito na hora de executar a query!

  return await connectionDb.query(`
  SELECT b.id, b.name, b.author, b.available,
  u.name AS "createdBy" 
  FROM books AS b
  JOIN users AS u
  ON b."userId" = u.id;
  `);

}

async function findById(id) {
  return await connectionDb.query(`SELECT * FROM books WHERE id=$1`, [id]);
}


async function updateStatusBook(status, bookId) {
  await connectionDb.query(`
  UPDATE books
  SET available=$1
  WHERE id=$2
`, [status, bookId]);
}

async function takeBook(userId, bookId) {
  await connectionDb.query(`INSERT INTO "myBooks" ("userId", "bookId") VALUES ($1,$2);`, [userId, bookId]);
}


async function findAllMyBooks(userId) {
  return await connectionDb.query(
    `
    SELECT 
      u.name as "user_name",
      b.name as "book_name",
      b.author as "book_author" 
    FROM "myBooks" m
      JOIN users u ON m."userId" = u.id
      JOIN books b ON m."bookId" = b.id
    WHERE m."userId" = $1
    `,
    [userId]
  );
}

export default {
  create,
  findByName,
  findAll,
  findById,
  updateStatusBook,
  takeBook,
  findAllMyBooks,
}