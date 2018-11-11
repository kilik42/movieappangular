import React, { Component } from 'react';

import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'
class App extends Component {
  constructor(props){
    super(props)

    this.state = {}
    //console.log("this is my initializer")

//dummie data
   //  const movies = [
   //    {id: 0, poster_src: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fscottmendelson%2Ffiles%2F2018%2F04%2Fimage001.jpg", title: "Avengers: Infinity War", overview: "When Thor's evil brother, Loki (Tom Hiddleston), gains access to the unlimited power of the energy cube called the Tesseract, Nick Fury (Samuel L. Jackson), director of S.H.I.E.L.D., initiates a superhero recruitment effort to defeat the unprecedented threat to Earth. Joining Fury's  are Iron Man (Robert Downey Jr.), Captain America (Chris Evans), the Hulk (Mark Ruffalo), Thor (Chris Hemsworth), the Black Widow (Scarlett Johansson) and Hawkeye (Jeremy Renner)"},
   //    {id: 1, poster_src: "https://upload.wikimedia.org/wikipedia/en/f/f9/TheAvengers2012Poster.jpg",title: "Avengers", overview: "This is my second overview"}
   //
   //  ]
   //
   //
   // var movieRows = []
   //  movies.forEach((movie)=>{
   //    console.log(movie.title)
   //
   //    const movieRow = <MovieRow movie={movie} />
   //
   //    movieRows.push(movieRow)
   //
   //  })
   //
   //  this.state = {rows: movieRows}

   //consuming api
   this.performSearch("avengers")

  }

performSearch(searchTerm){
  console.log("perform search using moviedb")
  //https://api.themoviedb.org/3/account/{account_id}/watchlist/movies?api_key=09b613d69993f8c295104c0f118be209&language=en-US&sort_by=created_at.asc&page=1

//hard coded search string
 // const urlString = "https://api.themoviedb.org/3/search/movie?query=marvel&api_key=09b613d69993f8c295104c0f118be209"

 //for search bar to be interactive
 const urlString = "https://api.themoviedb.org/3/search/movie?&api_key=09b613d69993f8c295104c0f118be209&query=" + searchTerm



  $.ajax({
    url: urlString,
    success: (searchResults)=>{
      console.log("fetched data successfully")
      console.log(searchResults)
      const results = searchResults.results
      //console.log(results[0])
      var movieRows = []
      results.forEach((movie)=> {

        movie.poster_src  =  "https://image.tmdb.org/t/p/w185" + movie.poster_path
          //console.log(movie.poster_path)
          const movieRow = <MovieRow key = {movie.id} movie={movie}/>
          movieRows.push(movieRow)
      })

      this.setState({rows: movieRows})
    },
    error: (xhr, status, err) => {
      console.error("failed to fetch data")
    }

  })
}

searchChangeHandler(event){
  console.log(event.target.value)
  const searchTerm = event.target.value
  this.performSearch(searchTerm)
}

  render() {
    return (
      <div >

          <table className="titleBar">
            <tbody>
              <tr>
                <td>
                  <img width="50" src="film2.svg" alt="app icon"/>
                </td>
                <td width="8"/>
                <td>
                  <h2>MoviesDB Search</h2>
                </td>
              </tr>
            </tbody>
          </table>

          <input type="text"placeholder="enter search term" style={{
            fontSize: 24,
            display: 'block',
            width: "99%",
            paddingTop:8,
            paddingBottom: 8,
            paddingLeft: 16

          }} onChange={this.searchChangeHandler.bind(this)}/>

          {this.state.rows}

      </div>
    );
  }
}

export default App;
