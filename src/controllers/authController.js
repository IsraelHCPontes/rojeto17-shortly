import db from '../database/db.js'
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

export async function signUp (req, res) {
    const {name, email, password} = req.body;
    const passwordHash =  bcrypt.hashSync(password, 10);
    
    try{                
        console.log(name, email, password, passwordHash)
        await  db.query(`
        INSERT INTO users (name, email, "passwordHash")
        VALUES ($1, $2, $3)`,
        [name,email,passwordHash]); 
        res.sendStatus(201);
    }catch(err){
        console.log(err)
        res.status(422).send(err);
    }   
}

export  async function signIn(req, res) {
    const {user} = res.locals;
    const token = uuid();

    console.log(user)
    try{        
        const sessionAlready = await  db.query(`
        SELECT *
        FROM sessions
        WHERE "userId" = $1
        `,[user.id]);

        if(sessionAlready.rows.length > 0){
            await  db.query(`
            UPDATE sessions
            SET token = $1, "createdAt" = NOW()
            WHERE sessions."userId" = $2
            `,[token, user.id])
        }else{
            await  db.query(`
            INSERT INTO sessions ("userId", token)
            VALUES  ($1, $2)
            `,[user.id, token])
        }
        
        res.status(201).send({token: token, userId: user.id});
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}



