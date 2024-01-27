import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])

   async function fetchMovieHandler(){
    try {
      const respose = await fetch("https://swapi.dev/api/films/")
      const data =   await respose.json()
      const transformData = data.results.map(movieData=>{
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseData: movieData.release_date
        }
      })
      setMovies(transformData);
    } catch (error) {
      console.error("Error in fetching", error);
    }
    
  }
 

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
