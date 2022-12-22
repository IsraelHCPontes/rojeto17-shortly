import db from '../database/db.js';
import {customAlphabet} from 'nanoid';

export async function createShortly(req, res){
    const {url} = req.body;
    const user = res.locals.user;
    const nanoid = customAlphabet('1234567890abcdef', 5)
    const shortly = nanoid(8);
   
    try{
        db.query(`
        INSERT INTO urls("shortUrl", url, "userId")
        VALUES ($1, $2, $3)
        `, [shortly, url, user.id ])

        const body = { shortly }

        res.status(201).send(body)
    }catch(error){
        console.log(error)
        res.status(200).send('to aqui')
    }
}