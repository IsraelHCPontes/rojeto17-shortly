import urlSchema from '../schemas/urlSchema.js';

export async function urlValidation(req, res, next){
    const url = req.body;

    const validation = urlSchema.validate(url, {abortEarly: false})

    if(validation.error){
        const erros = validation.error.details.map(detail => detail);
        res.status(422).send(erros);
        return;
    }

    next();
}