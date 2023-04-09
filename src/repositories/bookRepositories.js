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

export default {
  create,
  findByName,
  findAll,
}