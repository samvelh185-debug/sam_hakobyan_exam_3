import Film from '../models/film.js';

const filmController = {
    
    getAllFilms: async (req, res, next) => {
        try {
            const search = req.query.search || '';
            const page = parseInt(req.query.page) || 1;
            const limit = 10; 

            const { films, totalResults, totalPages } = await Film.findAndCountAll(search, page, limit);

            res.status(200).json({
                status: 'success',
                meta: {
                    totalResults,
                    totalPages,
                    currentPage: page,
                    limit,
                    displaying: `${(page - 1) * limit + 1}-${Math.min(page * limit, totalResults)} of ${totalResults}`
                },
                data: films
            });
        } catch (error) {
            next(error);
        }
    },


    getFilmById: async (req, res, next) => {
        try {
            const film = await Film.findById(req.params.id);
            if (!film) {
                return res.status(404).json({ status: 'error', message: 'Film not found' });
            }
            res.status(200).json({ status: 'success', data: film });
        } catch (error) {
            next(error);
        }
    },

   
    createFilm: async (req, res, next) => {
        try {
            const filmId = await Film.create(req.body);
            res.status(201).json({
                status: 'success',
                message: 'Film created successfully',
                filmId
            });
        } catch (error) {
            next(error);
        }
    },

   
    updateFilm: async (req, res, next) => {
        try {
            const { id } = req.params;
            const film = await Film.findById(id);
            if (!film) {
                return res.status(404).json({ status: 'error', message: 'Film not found' });
            }

            await Film.update(id, req.body);
            res.status(200).json({ status: 'success', message: 'Film updated successfully' });
        } catch (error) {
            next(error);
        }
    },

  
    deleteFilm: async (req, res, next) => {
        try {
            const { id } = req.params;
            const film = await Film.findById(id);
            if (!film) {
                return res.status(404).json({ status: 'error', message: 'Film not found' });
            }

       
            const hasActiveBookings = await Film.hasBookings(id);
            if (hasActiveBookings) {
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'Cannot delete film. Active bookings exist for this film.' 
                });
            }

            await Film.delete(id);
            res.status(200).json({ status: 'success', message: 'Film deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
};

export default filmController;