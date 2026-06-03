import Joi from 'joi';

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return next(error);
        }
        next();
    };
};


export const schemas = {

    register: Joi.object({
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        full_name: Joi.string().min(2).max(100).required()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),


    film: Joi.object({
        title: Joi.string().min(1).max(255).required(),
        description: Joi.string().min(10).required(),
        genre: Joi.string().valid('Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller').required(),
        duration: Joi.number().integer().positive().required()
    })
};


showtime: Joi.object({
    film_id: Joi.number().integer().required(),
    show_date: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required(),
    show_time: Joi.string().regex(/^\d{2}:\d{2}(:\d{2})?$/).required(),
    price: Joi.number().positive().required(),
    total_seats: Joi.number().integer().positive().default(50)
})