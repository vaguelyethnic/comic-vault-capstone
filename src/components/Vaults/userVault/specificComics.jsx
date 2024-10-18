import { getComicByUserId } from "../../../services/comicServices"
import { getAllGenres } from "../../../services/genresServices"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import './specificComics.css' 

export const UserSpecificComicList = ({ currentUser }) => {
  const [userComics, setUserComics] = useState([])
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.id ) {
        getComicByUserId(currentUser.id).then((comicsArray) => {
            setUserComics(comicsArray)
        }
        )
    }
}, [ currentUser ])

    useEffect(() => {
      getAllGenres().then((genreArray) => {
        setAllGenres(genreArray);
      });
    }, [ currentUser ]);
  
    const getGenreNameById = (id) => {
      const genre = allGenres.find((genre) => genre.id === id);
      return genre? genre.genreName : 'Genre not found'
    };

    const navigate = useNavigate()
  return (
    
    <div className='main-content'>
      <h1>Vault {currentUser.id} </h1> 
      <article className='comic-grid'>
        {userComics.map((comic) => {
          return (
            <section key={comic.id} className='comic'>
              <Link to={`/personal-vault/${comic.id}`}>
                <img className='comic-image' src={comic.url} alt="comic"/>
              </Link>
              <h2>{comic.title}</h2>
              <p><strong>Genre: </strong>{getGenreNameById(comic.genreId)}</p>
            </section>
          )
        })}
      </article>
      <footer>
          <button onClick={() => { navigate('/personal-vault/add-comic') }}>Add Comic</button>
      </footer>
    </div>
  )
}