import db from 'config/data.js';

const Showtime = {
  
    create: async (showtimeData) => {
        const { film_id, show_date, show_time, price, total_seats } = showtimeData;
        const [result] = await db.query(
            `INSERT INTO showtimes (film_id, show_date, show_time, price, total_seats, available_seats) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [film_id, show_date, show_time, price, total_seats || 50, total_seats || 50]
        );
        return result.insertId;
    },

   
    countShowtimesForFilmPerDay: async (filmId, showDate) => {
        const [rows] = await db.query(
            'SELECT COUNT(*) as count FROM showtimes WHERE film_id = ? AND show_date = ?',
            [filmId, showDate]
        );
        return rows[0].count;
    },

 
    findByFilmId: async (filmId) => {
        const [rows] = await db.query(
            'SELECT * FROM showtimes WHERE film_id = ? ORDER BY show_date ASC, show_time ASC',
            [filmId]
        );
        return rows;
    },

    
    findById: async (id) => {
        const [rows] = await db.query('SELECT * FROM showtimes WHERE id = ?', [id]);
        return rows[0];
    }
};

export default Showtime;