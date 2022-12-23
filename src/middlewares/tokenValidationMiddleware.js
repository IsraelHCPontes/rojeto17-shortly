import db from '../database/db.js'

export async function tokenValidation(req, res, next){
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer ", "").split(`"`)[3] 
 


   if(!token){
    res.sendStatus(422) 
    return;
  }

  console.log('aseguir q veio n TOKEN =>', token)
  try{
    
    const session = await  db.query(`
    SELECT *
    FROM sessions
    WHERE token = $1
    `,[token])

    const user = await  db.query(`
    SELECT *
    FROM users 
    WHERE id = $1
    `,[session.rows[0].userId]);

    if(session.rows.length <= 0 || user.rows.length <= 0){
        res.sendStatus(404) 
        return;
    }
   
    res.locals.user = user.rows[0];
    next();
  }catch(error){
    res.status(500).send({message:"deu ruim"})
    console.log(error)
  }};



    