import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Navbar from "./Navbar";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

function WatchList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [buttonClass, setButtonClass] = useState("");

  /* ------------------ FETCH ALL MOVIES ------------------ */
  useEffect(() => {
    axios
      .get("https://movies-data-api.onrender.com/movies")
      .then((res) => {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ------------------ FETCH SELECTED MOVIE ------------------ */
  useEffect(() => {
    if (!selectedId) return;

    axios
      .get(`https://movies-data-api.onrender.com/movies/${selectedId}`)
      .then((res) => {
        setSelectedMovie(res.data);

        if (res.data.WatchList === "true") {
          setButtonText("Remove from list");
          setButtonClass("redbtn");
        } else {
          setButtonText("Add to list");
          setButtonClass("greenbtn");
        }
      });
  }, [selectedId]);

  /* ------------------ HANDLERS ------------------ */
  const openLightbox = (id) => {
    setSelectedId(id);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    setSelectedMovie(null);
    setSelectedId(null);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleButtonClick = () => {
    const newValue = buttonClass === "redbtn" ? "false" : "true";

    axios.patch(
      `https://movies-data-api.onrender.com/movies/${selectedId}`,
      { WatchList: newValue }
    );

    setButtonText(
      newValue === "true" ? "Remove from list" : "Add to list"
    );
    setButtonClass(
      newValue === "true" ? "redbtn" : "greenbtn"
    );

    setMovies((prev) =>
      prev.map((m) =>
        m._id === selectedId ? { ...m, WatchList: newValue } : m
      )
    );
  };

  /* ------------------ DERIVED DATA ------------------ */
  const watchlistMovies = movies.filter(
    (movie) => movie.WatchList === "true"
  );

  /* ------------------ RENDER ------------------ */
  return (
    <div>
      <Navbar />

      <section className="main-container">
        <h1>Watchlist</h1>

        <div className="box">
          {loading && <Loader />}

          {!loading && watchlistMovies.length === 0 && (
            <p>Watchlist is empty</p>
          )}

          {!loading &&
            watchlistMovies.map((movie) => (
              <a
                key={movie._id}
                onClick={() => openLightbox(movie._id)}
              >
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </a>
            ))}

          {lightboxVisible && selectedMovie && (
            <div
              className="lightbox-overlay lightbox-overlay-watchlist"
              onClick={closeLightbox}
            >
              <div
                className="lightbox hideScrollBar"
                onClick={stopPropagation}
              >
                <span
                  className="close-btn"
                  onClick={closeLightbox}
                >
                  &times;
                </span>

                <div>
                  <div className="player-wrapper">
                    <ReactPlayer
                      className="react-player"
                      controls
                      playing
                      muted
                      url={selectedMovie.Trailer}
                      width="100%"
                    />
                  </div>

                  <h2>{selectedMovie.Title}</h2>
                  <p>
                    {selectedMovie.Year} | {selectedMovie.Rated} |{" "}
                    {selectedMovie.Runtime} | HD
                  </p>
                  <p>{selectedMovie.Plot}</p>
                  <p>Cast: {selectedMovie.Actors}</p>
                  <p>Director: {selectedMovie.Director}</p>
                  <p>Writer: {selectedMovie.Writer}</p>

                  <button
                    className={buttonClass}
                    onClick={handleButtonClick}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default WatchList;
