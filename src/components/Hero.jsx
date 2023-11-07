import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

function Hero() {

    const [id, setId] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonClass, setButtonClass] = useState("");


    // Function to get data for all movies
    const useFetch = (url) => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
          axios.get(url).then((response) => {
            setData(response.data);
            setLoading(false);
          });
        }, [url]);
        return { data, loading };
    };

    // Function to get data for a movie with id
    const fetchMovie = (url) => {
        const [movie, setMovie] = useState();
        useEffect(() => {
            axios.get(url).then((response) => {
                setMovie(response.data);
                if(response.data.WatchList === "true"){
                    setButtonText("Remove from list");
                    setButtonClass("redbtn");
                }
                if(response.data.WatchList === "false"){
                    setButtonText("Add to list");
                    setButtonClass("greenbtn");
                }
            });
        }, [url]);
        return { movie };
    }

    // Function to render all movies as tiles on home page
    const renderData = (data, displayGenre) => {
        return data.map((movie, index) => {
            const { _id, Poster, Title, Genre, Trailer} = movie; //destructuring
            if(Genre.includes(displayGenre)){
            return (
                <a onClick={openLightbox} key={index}>
                <img src={Poster} alt={Title} id={_id} />
            </a>
            )}
        })
    }
    
    // Function to render lightbox
    const renderMovie = (movie) => {
        return (
            <div className="lightbox-overlay" onClick={closeLightbox}>
                <div className="lightbox hideScrollBar" onClick={stopPropagation}>
                    <div>
                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='react-player'
                                controls
                                playing={true}
                                muted={true}
                                url={movie.Trailer}
                            />
                        </div>
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year} | {movie.Rated} | {movie.Runtime} | HD </p>
                        <p>{movie.Plot}</p>
                        <p>Cast: {movie.Actors}</p>
                        <p>Director: {movie.Director}</p>
                        <p>Writer: {movie.Writer}</p>
                        <button 
                            className={buttonClass}
                            onClick={handleClick}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    function handleClick(){
        if(buttonText === "Add to list"){
            setButtonText("Remove from list");
            setButtonClass("redbtn");
        }
        else{
            setButtonText("Add to list");
            setButtonClass("greenbtn");
        }
        const data = {
            WatchList: buttonClass === "redbtn" ? "false" : "true"
        }
        axios.patch(`https://movies-data-api.onrender.com/movies/${id}`, data)
    }

    const [lightboxVisible, setLightboxVisible] = useState(false);

    const openLightbox = (e) => {
        setId(e.target.id);
        setLightboxVisible(true);
    };
    
    const closeLightbox = () => {
        setLightboxVisible(false);
    };
    
    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const { data, loading } = useFetch(
        "https://movies-data-api.onrender.com/movies"
    );

    const { movie } = fetchMovie(
        `https://movies-data-api.onrender.com/movies/${id}`
    );
    
    return (
        <section className="main-container" >
            <h1 id="home">Trending Now</h1>
            <div className="box">
              {
                loading && <p>Fetching data from database</p>
              }
              {
                !loading && (renderData(data, "Trending"))
              }
              {
                lightboxVisible && (renderMovie(movie))
              }
            </div>

          <h1 id="tvShows">TV Shows</h1>
          <div className="box">
            {
                loading && <p>Fetching data from database</p>
            }
            {
                !loading && (renderData(data, "TV"))
            }

            {
            lightboxVisible && (renderMovie(movie)) 
            }       
          </div>
          
          <h1 id="movies">Action & Adventure</h1>
          <div className="box">
            {
                loading && <p>Fetching data from database</p>
            }
            {
                !loading && (renderData(data, "Action"))
            }

            {
            lightboxVisible && (renderMovie(movie)) 
            }
          </div>

          <h1 id="anime">Anime</h1>
          <div className="box">
            {
                loading && <p>Fetching data from database</p>
            }
            {
                !loading && (renderData(data, "Anime"))
            }

            {
            lightboxVisible && (renderMovie(movie)) 
            }
          </div>
          
          <h1 id="originals">Netflix Originals</h1>
          <div className="box">
            {
                loading && <p>Fetching data from database</p>
            }
            {
                !loading && (renderData(data, "Original"))
            }

            {
            lightboxVisible && (renderMovie(movie)) 
            }          
          </div>
        </section>
    )
}

export default Hero;