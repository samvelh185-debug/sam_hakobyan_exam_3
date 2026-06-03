import Showtime from '../models/showTime.js';
import Film from '../models/film.js';

const adminController = {
    
    createShowtime: async (req, res, next) => {
        try {
            const { film_id, show_date } = req.body;

            const film = await Film.findById(film_id);
            if (!film) {
                return res.status(404).json({ status: 'error', message: 'Film not found' });
            }

            const currentShowtimesCount = await Showtime.countShowtimesForFilmPerDay(film_id, show_date);
            if (currentShowtimesCount >= 3) {
                return res.status(400).json({
                    status: 'error',
                    message: `Limit reached. You cannot create more than 3 showtimes for this film on ${show_date}.`
                });
            }

            const showtimeId = await Showtime.create(req.body);

            res.status(201).json({
                status: 'success',
                message: 'Showtime created successfully!',
                showtimeId
            });
        } catch (error) {
            next(error);
        }
    }
};

export default adminController;