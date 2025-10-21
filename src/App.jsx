import React, { useState, useEffect } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/search.jsx'
import Spinner from './components/Spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = ``
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


export default function App() {
    const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceSearch, setDebounceSearch] = useState('');
useDebounce(() => setDebounceSearch(searchTerm), 500, [searchTerm])
  useEffect(() => {
  fetchMovies(debounceSearch)
}, [debounceSearch]) 

const fetchMovies = async (query = '') =>{
  setLoading(true);
  setErrorMessage('');
  try{
    const endpoint = query
  ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS)
  
    if(!response.ok){
      throw new Error('Network response was not ok');
      setMovies([])
      return
    }
  const data = await response.json()
 setMovies(data.results || [])
  } catch(error){
    console.error(`failed to fetch movie ${error}`)
    setErrorMessage('Failed to fetch movies. Please try again later.')
  } finally{
    setLoading(false)
  }
}
  return (
  <main>
    <div className='pattern'/>
    <div className='wrapper'>
      <header>
        <img src="./hero.png" alt="hero image" />
        <h1>Find a <span className='text-gradient'>specific</span> movie which matches your criteria</h1>
        
      <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
      </header>
      <section className='all-movies'>
    <h2>All movies</h2>
    {loading ? (
      <Spinner />
    ): errorMessage ? (
      <p className='text-red-500'>{errorMessage}</p>
    ) : (
      <ul>
        {movies.map((movie) => (
        <MovieCard  key = {movie.id} movie = {movie}/>
        ))}
      </ul>
    ) }
      </section>
    </div>
  </main>
  )
}
