import promisePool from '../config/data.js';
import md5 from 'md5';

const User = {
    findByEmail: async (email) => {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    },

    findByUsername: async (username) => {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    create: async (userData) => {
        const { username, email, password, full_name } = userData;
        const hashedPassword = md5(password);

        const [result] = await promisePool.query(
            'INSERT INTO users (username, email, password, full_name, role) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, full_name, 'user']
        );
        
        return result.insertId;
    }
};

export default User;