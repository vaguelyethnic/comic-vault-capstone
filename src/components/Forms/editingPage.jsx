import './editingPage.css';
import { getAllGenres } from '../../services/genresServices';
import { getAllPublishers } from '../../services/publisherServices';
import { useEffect, useState } from 'react';
import { getComicById, updateComic } from '../../services/comicServices';
import { useParams, useNavigate } from 'react-router-dom';

export const EditingForm = () => {
    const [comic, setComic] = useState({});
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState('');

    const navigate = useNavigate();
    const { comicId } = useParams();

    useEffect(() => {
        getComicById(comicId).then((comic) => {
            setComic(comic);
            setSelectedGenre(comic.genreId || '');
            setSelectedPublisher(comic.publisherId || '');
        });
    }, [comicId]);

    useEffect(() => {
        getAllGenres().then((genre) => {
            setGenres(genre);
        });
    }, []);

    useEffect(() => {
        getAllPublishers().then((publisher) => {
            setPublishers(publisher);
        });
    }, []);

    const handleGenreChange = (event) => {
        setSelectedGenre(event.target.value);
    };

    const handlePublisherChange = (event) => {
        setSelectedPublisher(event.target.value);
    };

    const handleSave = (event) => {
        event.preventDefault();

        const editedComic = {
            id: comic.id,
            title: comic.title,
            genreId: parseInt(selectedGenre),
            summary: comic.summary,
            publicationDate: comic.publicationDate,
            publisherId: parseInt(selectedPublisher),
            userID: comic.userID,
            url: comic.url
        };

        updateComic(editedComic).then(() => {
            navigate(`/personal-vault`);
        });
    };

    return (
        <form className='editing-page'>
            <h1>Edit Comic Information</h1>
            <fieldset>
                <div className='form-group'>
                    <label>Add Photo Url</label>
                    <input 
                        type='url' 
                        value={comic.url || ''}
                        className='form-contol'
                        onChange={(event) => {
                            const copy = { ...comic };
                            copy.url = event.target.value;
                            setComic(copy);
                        }}
                    />
                </div>
                <div className='form-group'>
                    <label>Edit Title</label>
                    <input 
                        type='text' 
                        value={comic.title || ''}
                        onChange={(event) => {
                            const copy = { ...comic };
                            copy.title = event.target.value;
                            setComic(copy);
                        }}
                        className='form-contol'
                    />
                </div>
                <div className='form-group'>
                    <label>Choose Genre</label>
                    <select 
                        className='form-control'
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value=''>Edit Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.genreName}    
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Choose Publisher</label>
                    <select 
                        required
                        value={selectedPublisher} 
                        onChange={handlePublisherChange}
                        className='form-control'
                    >
                        <option value=''>Edit Publisher</option>
                        {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.publisherName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                    <label>Edit Publication Date</label>
                    <input 
                        type='date'
                        value={comic.publicationDate || ''}
                        onChange={(event) => {
                            const copy = { ...comic };
                            copy.publicationDate = event.target.value;
                            setComic(copy);
                        }} 
                        className='form-contol'
                    />
                </div>
                <div className='form-group'>
                    <label>Edit Summary</label>
                    <input 
                        type='text'
                        value={comic.summary || ''}
                        onChange={(event) => {
                            const copy = { ...comic };
                            copy.summary = event.target.value;
                            setComic(copy);
                        }} 
                        className='form-contol'
                    />
                </div>
                <div className='form-group'>
                    <button className='form-btn' onClick={handleSave}>Update Comic Details</button>
                </div>
            </fieldset>
        </form>
    );
};
