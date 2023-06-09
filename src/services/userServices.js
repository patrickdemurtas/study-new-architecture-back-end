import bcrypt from 'bcrypt';
import userRepositories from '../repositories/userRepositories.js';
import { v4 as uuidV4 } from 'uuid';
import { conflictError, invalidCredentialsError, duplicatedEmailError } from '../errors/index.js';


async function create({ name, email, password }) {

    const { rows: user } = await userRepositories.findByEmail(email);
    if (user.length !== 0) throw duplicatedEmailError(email)

    const hashPassword = await bcrypt.hash(password, 10);
    await userRepositories.create({ name, email, password: hashPassword });

}

async function signin({ email, password }){
   const { rowCount , rows: [user] } = await userRepositories.findByEmail(email);
   if (!rowCount) throw invalidCredentialsError();
    
   //const [user] = users //desestruturação de array: atribui a variável "user" o valor da primeira posição do array "users".
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw invalidCredentialsError();
     
    const token = uuidV4();
    await userRepositories.createSession({token, userId: user.id});
    return token; 

}



export default {
    create,
    signin,
};