import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] =  useState(null)

   async function fetchMovieHandler(){
    setIsLoading(true)
    setError(null)
    try {
      const respose = await fetch("https://swapi.dev/api/films/")
      if(!respose.ok){
        throw new Error('somthing went wrong')
      }
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
      console.log(error.message);
    }
    
    setIsLoading(false)
    
    
  }
 

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length===0 && !error &&<p>Found no movies</p>} 
        {!isLoading && error &&<p>{error}</p>}
        {isLoading &&  <p>Loading...</p>}
      
      </section>
    </React.Fragment>
  );
}

export default App;
