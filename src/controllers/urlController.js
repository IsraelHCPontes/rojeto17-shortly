import db from '../database/db.js';

export async function getUrlById(req, res){
    const id = req.params.id;
    
    try{
       const {rows} = await db.query(`
        SELECT id, "shortUrl", url
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
        WHERE "shortUrl" = $1
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

export async function deleteUrlById(req, res){
    const id = req.params.id;
    const user = res.locals.user;

    try{
        const {rows} = await db.query(`
        SELECT *
        FROM urls
        WHERE id = $1
        `,[id])

        if(!rows[0]){
            res.sendStatus(404)
            return;
        }

        if(rows[0].userId !== user.id){
            res.sendStatus(401)
            return;
        }

        await db.query(`
        DELETE FROM urls
        WHERE id = $1
        `,[id])

        res.sendStatus(204)
     }catch(error){
        console.log(error)
        res.sendStatus(500);
     }

}

export async function rankingUrlsByVisit(req, res){

    try{
        const ranking =  await db.query(`
        SELECT  users.id, users.name, COUNT(urls) AS "linksCount",  COALESCE(SUM("visitCount"), 0) AS "visitCount"
        FROM users
      	LEFT JOIN urls ON users.id = urls."userId"
		GROUP BY  users.id 
		ORDER BY   "visitCount"  DESC LIMIT 10 
        `)

        res.send(ranking.rows)
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}
