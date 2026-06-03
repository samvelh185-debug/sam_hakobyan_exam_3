import md5 from 'md5';
import UsersSchema from "../schema/users.schema.js";

 const register = async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await UsersSchema.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = md5(password);

    const user = await UsersSchema.create({
        email,
        password: hashedPassword
    });

    res.json({ message: 'User created', userId: user._id });
};
 export default register;