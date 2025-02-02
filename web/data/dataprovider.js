const peliculas = require('./data.json');
var usuarios = require("./users.json");

function getAllData() {
    return peliculas;
}

function getItemData(id) {
    const item = peliculas.find(a => a.id == id);
    return item;
}

function validateUser(email,password){
    let u = usuarios.filter(
        (u)=>{
            return( (u.email==email) && (u.password==password) )
        }
    )
    if(u.length>0)
        return u[0]
    else
        return null
    
}

function getMoviesByUser(email) {
    const user = usuarios.find(u => u.email === email);
    if (!user || !user.copias) return [];

    return peliculas.filter(movie => user.copias.some(copia => copia.pelicula_id === movie.id));
}


module.exports = {
    getAllData,
    getItemData,
    validateUser,
    getMoviesByUser
};
