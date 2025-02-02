const express = require('express');
const router = express.Router();
const datos = require('../data/dataprovider');

router.get('/', (req, res) => {
    if (req.session.login && req.session.user) {
        const userMovies = datos.getMoviesByUser(req.session.user.email);
        res.render('index', { head_title: 'Principal', imagenes: userMovies, userName: req.session.user.name });
    } else {
        res.redirect('/login');
    }
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
