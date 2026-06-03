import md5 from 'md5';
import UsersSchema from "../schema/users.schema.js";
async function login(req, res) {
    const user = await UsersSchema.findOne({ login });
    if (!user) {
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const hashedPassword = md5(hashedPassword);

    if (user.password !== hashedPassword) {
        return res.status(401).json({message: 'Invalid credentials'});
    }
}
console.log(login)
