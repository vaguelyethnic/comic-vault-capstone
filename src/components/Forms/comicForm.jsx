import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGenres } from '../../services/genresServices';
import { getAllPublishers } from '../../services/publisherServices';
import { createComic } from '../../services/comicServices'; // Ensure correct path

export const ComicForm = ({ currentUser }) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [comic, setComic] = useState({
        title: '',
        url: '',
        summary: '',
        publicationDate: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        getAllGenres().then((genreArray) => {
            setGenres(genreArray);
        });
    }, []);

    useEffect(() => {
        getAllPublishers().then((publisherArray) => {
            setPublishers(publisherArray);
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

        const newComic = {
            title: comic.title,
            genreId: parseInt(selectedGenre),
            summary: comic.summary,
            publicationDate: comic.publicationDate,
            publisherId: parseInt(selectedPublisher),
            userID: currentUser.id,
            url: comic.url
        };

        createComic(newComic).then(() => {
            navigate(`/personal-vault`);
        }).catch(error => {
            console.error('Error creating comic:', error);
        });
    };

    return (
        <form className='editing-page'>
            <h1>Add New Comic</h1>
            <fieldset>
                <div className='form-group'>
                    <label>Add Photo Url</label>
                    <input
                        type='url'
                        value={comic.url || ''}
                        className='form-control'
                        onChange={(e) => setComic({ ...comic, url: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label>Edit Title</label>
                    <input
                        type='text'
                        value={comic.title || ''}
                        className='form-control'
                        onChange={(e) => setComic({ ...comic, title: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label>Choose Genre</label>
                    <select
                        className='form-control'
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value=''>Select Genre</option>
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
                        <option value=''>Select Publisher</option>
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
                        className='form-control'
                        onChange={(e) => setComic({ ...comic, publicationDate: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <label>Edit Summary</label>
                    <input
                        type='text'
                        value={comic.summary || ''}
                        className='form-control'
                        onChange={(e) => setComic({ ...comic, summary: e.target.value })}
                    />
                </div>
                <div className='form-group'>
                    <button className='form-btn' onClick={handleSave}>Save Comic Details</button>
                </div>
            </fieldset>
        </form>
    );
};