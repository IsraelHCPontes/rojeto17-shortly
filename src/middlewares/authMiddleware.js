import db from '../database/db.js'
import signUpSchema from '../schemas/signUpSchema.js'
import signInSchema from '../schemas/signInSchema.js';
import bcrypt from 'bcrypt';

export async function signUpValidation(req, res, next){
    const user = req.body;

    const validation = signUpSchema.validate(user, {abortEarly: false})
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(422).send(erros);
        return;
    }

    if(user.password !==  user.confirmPassword){
        res.status(422).send({message:"As senhas precisam ser iguais"})
        return;
     }

     try{                
        const emailAlready = await db.query(`
        SELECT * 
        FROM users 
        WHERE users.email = $1`,
        [user.email]);

        if(emailAlready.rows.length > 0){
            res.status(422).send({message:"Email já existe"});
            return;
          }
          
        next();
    }catch(err){
        console.log(err)
        res.status(402).send(err);
    }   
}

export async function signInValidation(req, res, next){
    const user = req.body;
    const validation = signInSchema.validate(user, {abortEarly: false});
    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(422).send(erros);
        return;
    } 
    try{
       const userAready =  await db.query(`
       SELECT * 
       FROM users 
       WHERE users.email = $1
       `,
       [user.email])
       
       if(userAready.rows.length > 0 && bcrypt.compareSync(user.password, userAready.rows[0].passwordHash)){
        delete userAready.rows[0].passwordHash
        res.locals.user = userAready.rows[0];
        next();
       }else{
        res.status(422).send({message:'Email ou Senha incorreto'})
        return;
       }
    }catch(err){
        console.log(err)
        res.status(500).send({message: 'Deu erro no Midd'})
    }
};