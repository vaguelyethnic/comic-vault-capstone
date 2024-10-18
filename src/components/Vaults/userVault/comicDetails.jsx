import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteComic, getComicById } from "../../../services/comicServices";
import { getAllGenres } from "../../../services/genresServices";
import { getAllPublishers } from "../../../services/publisherServices";
import { Link } from "react-router-dom";
import './comicDetails.css'

export const ComicDetails = ({ currentUser }) => {

    console.log(currentUser)

    const [comic, setComic] = useState({});
    const [allGenres, setAllGenres] = useState([]);
    const [allPublishers, setAllPublishers] = useState([]);

    const { comicId } = useParams();

    useEffect(() => {
        getComicById(comicId).then((comic) => {
            setComic(comic);
        });
    }, [comicId]);

    useEffect(() => {
        getAllGenres().then((genreArray) => {
            setAllGenres(genreArray);
        });
    }, []);

    const getGenreNameById = (id) => {
        const genre = allGenres.find((genre) => genre.id === id);
        return genre ? genre.genreName : 'Genre not found';
    };

    useEffect(() => {
        getAllPublishers().then((publisherArray) => {
            setAllPublishers(publisherArray);
        });
    }, []);

    const getPublisherById = (id) => {
        const publisher = allPublishers.find((publisher) => publisher.id === id);
        return publisher ? publisher.publisherName : 'Publisher not found';
    };

    const navigate = useNavigate()

    const handleDelete = () => {
        deleteComic(comicId).then(() => {
            { navigate('/personal-vault') }
        });
    };

    return (
        <div className="comic-details-container">
            <section className="comic-info">
                <img className="comic-image" src={comic.url} alt={comic.title} />
                <h1 className="comic-title">{comic.title}</h1>
                <p className="comic-genre">Genre: {comic.genreId ? getGenreNameById(comic.genreId) : 'Unknown'}</p>
                <p className="comic-publisher">Publisher: {comic.publisherId ? getPublisherById(comic.publisherId) : 'Unknown'}</p>
                <p className="comic-date">{comic.publicationDate}</p>
                <p className="comic-summary">{comic.summary}</p>
            </section>
            <div className="comic-actios">
                <Link to={`/personal-vault/${comic.id}/editing-page`}>
                    <button className="btn-edit">Edit Comic</button>
                </Link>
            </div>
            {currentUser && currentUser.id && (
                <button className="btn-delete" onClick={handleDelete}>
                    Delete Comic
                </button>
            )}
        </div>
    );
};







