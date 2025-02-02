const express = require('express');
const router = express.Router();
const datos = require('../data/dataprovider');

router.get('/', (req, res) => {
    // Verifica si ya hay un usuario en la sesión, si no, crea uno por defecto
    if (!req.session.user) {
        req.session.user = {
            id: 1,
            name: "Alvaro Cozano",
            email: "alvarocozano@gmail.com",
            password: "123"
        };
        req.session.login = true;  // Marcar como usuario autenticado
    }

    // Obtener las películas del usuario
    const userMovies = datos.getMoviesByUser(req.session.user.email);
    res.render('index', { head_title: 'Principal', imagenes: userMovies, userName: req.session.user.name });
});

router.get('/login', (req, res) => {
    res.render("login", { head_title: "Login" });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = datos.validateUser(email, password);

    if (user) {
        req.session.login = true;
        req.session.user = user;
        res.redirect("/");
    } else {
        res.render("login", { head_title: "Login", error: "Credenciales incorrectas" });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

router.get('/data/:id', function(req, res) {
    const pelicula = datos.getItemData(req.params.id);
    if (pelicula) {
        res.render('data', { head_title: pelicula.title, pelicula: pelicula });
    } else {
        res.status(404).send("Película no encontrada");
    }
});

module.exports = router;
