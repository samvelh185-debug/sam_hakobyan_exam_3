import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js'
import md5 from 'md5';

const authController = {
    register: async (req, res, next) => {
        try {
            const { username, email, password, full_name } = req.body;

            const existingEmail = await User.findByEmail(email);
            if (existingEmail) {
                return res.status(400).json({ status: 'error', message: 'Email is already registered' });
            }

            const existingUsername = await User.findByUsername(username);
            if (existingUsername) {
                return res.status(400).json({ status: 'error', message: 'Username is already taken' });
            }

            await User.create({ username, email, password, full_name });

            res.status(201).json({
                status: 'success',
                message: 'User registered successfully! You can now log in.'
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            }

            const hashedPassword = md5(password);
            if (user.password !== hashedPassword) {
                return res.status(401).json({ status: 'error', message: 'Invalid email or password' });
            }

            const token = generateToken(user);

            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    full_name: user.full_name,
                    role: user.role
                }
            });
        } catch (error) {
            next(error);
        }
    }
};

export default authController