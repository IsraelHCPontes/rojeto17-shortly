import db from '../database/db.js';

export async function listUrlsById(req, res){
    const id = req.params.id;
    
    try{
       const {rows} = await db.query(`
        SELECT id, "shortlyUrl", url
        FROM urls
        WHERE id = $1
        `, [id]);
 
        console.log(rows)

        if(!rows[0]){
            res.sendStatus(404);
            return;
        }

        const body = rows[0];
        
        res.status(200).send(body)
    }catch(error){
        console.log(error)
        res.send(error)
    }
}

export async function redirectToLink(req, res){
    const shortly = req.params.shortUrl;
    console.log('teste', shortly );

    try{
       const {rows} = await db.query(`
        SELECT id, url
        FROM urls
        WHERE "shortlyUrl" = $1
       `, [shortly]) 

       if(!rows[0]){
        res.sendStatus(404);
        return;
       }
       
       await db.query(`
       UPDATE  urls 
       SET "visitCount" = "visitCount" + 1
       WHERE id = $1
       `, [rows[0].id])

        res.redirect(rows[0].url)
    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
}
