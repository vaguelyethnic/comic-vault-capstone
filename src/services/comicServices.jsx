export const getAllComics = () => {
    return fetch('http://localhost:8088/comics').then((res) => res.json())
}

export const getComicByUserId = (userID) => {
    return fetch(`http://localhost:8088/comics?userID=${userID}`).then((res) => res.json())
}

export const getComicById = (id) => {
    return fetch(`http://localhost:8088/comics/${id}`)
        .then(response => response.json())
};

export const updateComic = (comic) => {
    return fetch(`http://localhost:8088/comics/${comic.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(comic)
    })
    .then(response => response.json())
}

export const deleteComic = (comicId) => {
    return fetch(`http://localhost:8088/comics/${comicId}`, {
        method: "DELETE",
    })
    }

export const createComic = (newComic) => {
    return fetch('http://localhost:8088/comics', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComic),
    })
}