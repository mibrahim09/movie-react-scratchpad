import { getMovies, deleteMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import React, { Component } from "react";
import Like from "./like";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import { Route, Link } from "react-router-dom";
import Input from "./input";
import MovieForm from "./moviesform";
class Movies extends Component {
  state = {
    moviesList: getMovies(),
    moviesToShow: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "1",
    currentItemsCount: 0,
  };
  handleSaveMovie(id) {
    this.props.history.replace("/movies"); // Redirect back to movies
    // this.props.history.push('/movies');// Redirect back to movies
  }
  handleLike = (mov) => {
    const newMoviesList = this.state.moviesList;
    const index = newMoviesList.indexOf(mov);

    newMoviesList[index].liked = true;
    this.setState({ moviesList: newMoviesList });
  };
  handleDislike = (mov) => {
    const newMoviesList = this.state.moviesList;
    const index = newMoviesList.indexOf(mov);

    newMoviesList[index].liked = false;
    this.setState({ moviesList: newMoviesList });
  };
  handleChangePage = (page) => {
    this.setState({ currentPage: page });
  };
  handleSearch = (e) => {
    const input = e.currentTarget.value;
    const moviesToSearch = [...this.state.moviesList];
    if (input) {
      const filteredOutput = moviesToSearch.filter(
        (item) => item.title.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
      this.setState({ currentPage: 1, moviesToShow: filteredOutput });
    } else
      this.setState({ currentPage: 1, moviesToShow: this.state.moviesList });
  };
  getMoviesCount(movieToShow) {
    // if (this.state.moviesToShow.length == 0)
    //   return <h5>There are no movies in the database</h5>;
    const { pageSize, currentPage } = this.state;
    let moviesList = this.state.moviesToShow;

    if (movieToShow != null) {
      const myMovie = getMovie(movieToShow);
      if (myMovie == null) return <h3>No such movie found!</h3>;
      return (
        <div>
          <h5>Movie id: {myMovie._id}</h5>
          <MovieForm movie={myMovie}></MovieForm>
        </div>
      );
    } else {
      if (this.state.currentGenre !== "1")
        moviesList = moviesList.filter(
          (e) => e.genre._id == this.state.currentGenre
        );
    }
    const movies = paginate(moviesList, currentPage, pageSize);
    return (
      <div>
        <Link to="/movies/new">
          <button className="btn btn-primary mb-3">New movie</button>
        </Link>
        <h5>Showing {movies.length} movies in the database!</h5>

        <Input
          name="search"
          onChange={this.handleSearch}
          placeholder="Search.."
          className="mb-3"
        ></Input>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((mov) => (
              <tr>
                <th>{<Link to={`/movies/${mov._id}`}>{mov.title}</Link>}</th>
                <td>{mov.genre.name}</td>
                <td>{mov.numberInStock}</td>
                <td>{mov.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={mov.liked}
                    onLike={() => this.handleLike(mov)}
                    onDislike={() => this.handleDislike(mov)}
                  ></Like>
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(mov._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={moviesList.length}
          pageSize={this.state.pageSize}
          onPageChange={this.handleChangePage}
          currentPage={this.state.currentPage}
        ></Pagination>
      </div>
    );
  }
  componentDidMount() {
    this.setState({ moviesToShow: this.state.moviesList });
  }
  handleGenreChange(genreId) {
    this.setState({ currentGenre: genreId, currentPage: 1 });
  }

  handleDelete(_id) {
    deleteMovie(_id);
    this.setState({ movieList: getMovies() });
  }

  render() {
    const movieToShow = this.props.match.params.id;
    return (
      <div className="row">
        <div className="col-2">
          <div class="btn-group-vertical">
            <button
              genreId="1"
              type="button"
              class="btn btn-outline-dark"
              onClick={() => {
                this.handleGenreChange("1");
              }}
            >
              All Genres
            </button>
            {getGenres().map((genre) => (
              <button
                genreId={genre._id}
                onClick={() => {
                  this.handleGenreChange(genre._id);
                }}
                className="btn btn-outline-dark"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        <div className="col-8">{this.getMoviesCount(movieToShow)}</div>
      </div>
    );
  }
}

export default Movies;
