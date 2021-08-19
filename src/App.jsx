import logo from "./logo.svg";
import "./App.css";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import NotFound from "./components/notfound";
import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerform";
import MoviesForm from "./components/moviesform";
function App() {
  return (
    <div>
      <NavBar />
      <main className="container">
        <Switch>
          {/* Routes can be used when we need to go to another page but with postback!

              Switch: On using Switch we must order the links from the most specific ones to the most generic ones because it only 
              takes the first one it finds.

              We use render instead of component so if we need to pass props  

              Adding ? to the end of the paramater makes it optional.
          */}
          <Route path="/movies/new" component={MoviesForm}></Route>
          <Route path="/movies/:id" component={Movies}></Route>
          <Route path="/movies/:year?/:month?/" component={Movies}></Route>
          <Route path="/movies" component={Movies}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/customers" component={Customers}></Route>
          {/* <Route
            path="/products"
            render={() => <Products maxCount="10" />}
          ></Route> */}
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/" exact component={Home}></Route>
          <Redirect to="/not-found"></Redirect>
        </Switch>
      </main>
    </div>
  );
}

export default App;
