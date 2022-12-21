import db from '../database/db.js'
import signUpSchema from '../schemas/signUpSchema.js'

export async function signUpValidation(req, res, next){
    const user = req.body;

    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(422).send(erros);
        return;
    }

    if(user.password !==  user.confirmPassword){
        res.status(409).send({message:"As senhas precisam ser iguais"})
        return;
     }

     try{                
        const emailAlready = await db.query(`
        SELECT * 
        FROM users 
        WHERE users.email = $1`,
        [user.email]);

        if(emailAlready.rows.length > 0){
            res.status(409).send({message:"Email já existe"});
            return;
          }
          
        next();
    }catch(err){
        console.log(err)
        res.status(402).send(err);
    }   

}