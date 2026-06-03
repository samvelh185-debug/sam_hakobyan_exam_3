import db from 'config/data.js';

const Film = {

    create: async (filmData) => {
        const { title, description, genre, duration } = filmData;
        const [result] = await db.query(
            'INSERT INTO films (title, description, genre, duration) VALUES (?, ?, ?, ?)',
            [title, description, genre, duration]
        );
        return result.insertId;
    },

    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM films WHERE id = ?', [id]);
        return rows[0];
    },

    hasBookings: async (filmId) => {
        const [rows] = await db.query(
            `SELECT COUNT(*) as count FROM bookings b
             JOIN showtimes s ON b.showtime_id = s.id
             WHERE s.film_id = ? AND b.status = 'confirmed'`,
            [filmId]
        );
        return rows[0].count > 0;
    },

    update: async (id, filmData) => {
        const { title, description, genre, duration } = filmData;
        const [result] = await db.query(
            'UPDATE films SET title = ?, description = ?, genre = ?, duration = ? WHERE id = ?',
            [title, description, genre, duration, id]
        );
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const [result] = await db.query('DELETE FROM films WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },


    findAndCountAll: async (searchTitle = '', page = 1, limit = 10) => {
        const offset = (page - 1) * limit;
        const searchPattern = `%${searchTitle}%`;

     
        const [countRows] = await db.query(
            'SELECT COUNT(*) as total FROM films WHERE title LIKE ?',
            [searchPattern]
        );
        const totalResults = countRows[0].total;

    
        const [films] = await db.query(
            'SELECT * FROM films WHERE title LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
            [searchPattern, limit, offset]
        );

        return {
            films,
            totalResults,
            totalPages: Math.ceil(totalResults / limit)
        };
    }
};

export default Film;