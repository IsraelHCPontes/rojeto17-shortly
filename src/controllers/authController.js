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
    const newSession = {
        userId: user._id,
        token:token,
        time:Date.now()
    }

    
    try{
        const { db } = await connectDB();
        
        const sessionAlready = await  db.collection("sessions").findOne({userId: user._id});

        if(sessionAlready){
            await  db.collection("sessions").deleteOne({userId: user._id});
        }
        await  db.collection("sessions").insertOne(newSession);
        res.status(201).send({token: token, name: user.name});
    }catch(err){
        console.log(err)
        res.status(500).send(err);
    }
}