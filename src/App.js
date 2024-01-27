import React,{useState,useEffect,useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] =  useState(null)

  

   const fetchMovieHandler = useCallback(async()=>{
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
    
    
  },[])
  
  useEffect(()=>{
    fetchMovieHandler()
  },[fetchMovieHandler])
 let content = <p>Found No Movies</p>
if (movies.length>0) {
  content = <MoviesList movies={movies}/>
}
 if(error){
  content = <p>{error}</p>
 }
 if (isLoading) {
  content = <p>Loading...</p>
 }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
       
      {content}
      </section>
    </React.Fragment>
  );
}

export default App;
