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
        res.sendStatus(500)
    }
}

export async function listUserData(req, res){
    const {id, name} = res.locals.user;

    try{
        const {rows} =  await db.query(`
        SELECT  SUM("visitCount") 
        FROM users
        JOIN urls ON users.id = urls."userId"
        WHERE users.id = $1
        `, [id])

        const urls = await db.query(`
            SELECT id, "shortUrl", url, "visitCount"
            FROM urls
            WHERE "userId"= $1
        `, [id])

        
        const body =  {
            id,
            name,
            visitCount: rows[0].sum,
            shortenedUrls: urls.rows
        }
        console.log(body)
        res.send(body)

    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}