import db from '../database/db.js';

export async function listUrlsForId(req, res){
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