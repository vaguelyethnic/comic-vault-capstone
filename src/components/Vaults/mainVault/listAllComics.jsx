import { useEffect, useState } from 'react';
import { getAllComics } from '../../../services/comicServices';
import { getAllGenres } from '../../../services/genresServices';
import './listAllComics.css';

export const ListAllComics = () => {
  const [allComics, setAllComics] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    getAllComics().then((comicArray) => {
      setAllComics(comicArray);
    });
  }, []);

  useEffect(() => {
    getAllGenres().then((genreArray) => {
      setAllGenres(genreArray);
    });
  }, []);

  const getGenreNameById = (id) => {
    const genre = allGenres.find((genre) => genre.id === id);
    return genre ? genre.genreName : 'Genre not found';
  };

  const filteredComics = selectedGenre
    ? allComics.filter((comic) => comic.genreId === parseInt(selectedGenre))
    : allComics;

  return (
    <div className='main-content'>
      <h1>Main Vault Comics</h1> 
      <div className='filter-genre'>
        <label htmlFor='genre'>Filter by Genre: </label>
        <select
          id='genre'
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value=''>All Genres</option>
          {allGenres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
        </select>
      </div>
      <article className='comic-grid'>
        {filteredComics.map((comic) => ( 
          <section key={comic.id} className='comic'>
            <img className='comic-image' src={comic.url} alt="comic" />
            <h2>{comic.title}</h2>
            <p><strong>Genre: </strong>{getGenreNameById(comic.genreId)}</p>
          </section>
        ))}
      </article>
    </div>
  );
};

