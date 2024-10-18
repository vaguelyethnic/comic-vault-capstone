export const getAllGenres = () => {
    return fetch(`http://localhost:8088/genres`).then((res) => res.json())
}

export const getGenreByGenreId = (genreId) => {
    return fetch(`http://localhost:8088/comics?genreId=${genreId}&_expand=genre`).then((res) => res.json())
}