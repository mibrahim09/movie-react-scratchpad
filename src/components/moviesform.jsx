import React, { Component } from "react";
import Form from "./form";
import Joi from "joi";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie } from "../services/fakeMovieService";
// ...
class MoviesForm extends Form {
  //   username = React.createRef();
  //   password = React.createRef();
  state = {
    data: {
      name: "",
      genreId: "",
      dailyRentalRate: "",
      numberInStock: "",
      _id: "",
    },
    errors: [],
  };

  schema = Joi.object({
    name: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    _id: Joi.optional().allow(""),
    dailyRentalRate: Joi.number().min(0).max(5).required().label("Rate"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
  });

  doSubmit = () => {
    // Call the server and redirect the user to another page.
    saveMovie(this.state.data);
    if (this.props.history) this.props.history.push("/movies");
  };
  componentDidMount() {
    const myMovie = this.props.movie;
    if (myMovie) {
      let data = this.state.data;
      data._id = myMovie._id;
      data.name = myMovie.title;
      data.genreId = myMovie.genre._id;
      data.dailyRentalRate = myMovie.dailyRentalRate;
      data.numberInStock = myMovie.numberInStock;
      this.setState({ data: data });
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Title")}
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">
              Genre
            </label>
            <select
              class="custom-select"
              onChange={this.handleChange}
              name="genreId"
              id="genreId"
            >
              <option value="" selected disabled>
                Please select
              </option>
              {getGenres().map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderBtn("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
