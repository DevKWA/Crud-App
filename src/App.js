//import React from 'react';
//import logo from './logo.svg';
//import './App.css';
//import axios from 'axios';

import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,

} from "react-router-dom";
//const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/816e04/wines'
const BOOK_URL = 'http://myapi-profstream.herokuapp.com/api/099fa3/books'
const PERSON_URL = 'http://myapi-profstream.herokuapp.com/api/8ea62e/persons'
const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/bda385/wines'
class App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {} }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
            <li>
            <Link to = "/books">Books</Link>
            </li>
            <li>
              <Link to = "/persons">Persons</Link>
            </li>
          </ul>
          <Switch>
            <Route path ="/books">
              <Books />
            </Route>
            <Route path="/wines">
              <Wines />
            </Route>
            <Route path ="/persons">
              <Persons />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Home extends React.Component {
  render() {
    return(
      <h1>Home component works!</h1>
    )
  }
}
class Wines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async getWines() {
    try {
      const res = await axios.get(WINES_URL);
      this.setState({ wines: res.data });
    } catch(e) {
      console.error(e);
      
    }
  }

  async handleDelete(id) {
    try {
      const res = await axios.delete(WINES_URL + id); // target wine id
      console.log(res.data);
      const updateRes = await axios.get(WINES_URL);
      this.setState({ wines: updateRes.data });
    } catch(er) {
      console.error(er.message)
    }
  }

  componentDidMount() {
    this.getWines();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  handleSubmit() {
    console.log('something')
  }
  render() {
    return (
      <div className="wines">
        <ul>
          {/* render info */}
          {
            this.state.wines && this.state.wines.map(wine => <li> <br></br> <ul><button onClick={ () => this.handleDelete(wine.id)}>Delete Wine</button> </ul> <br></br> <br></br> Wine Name: { wine.name } <br></br> <br></br> Wine Year: { wine.year } <br></br> <br></br> Wine Grapes: {wine.grapes} <br></br> <br></br>
              
            Wine Country: {wine.country} <br></br> <br></br> Wine Region: {wine.region} <br></br> <br></br> Wine Description: {wine.description} <br></br><br></br> Wine URL: {wine.picture} <br></br> <br></br> Wine Price: {wine.price}
            </li>    
              )
          } 
  
        </ul>
        <form className="new-wine-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Wine Name:
            <input type="text" name="name" />
          </label>
          <label>
            Wine Year:
            <input type="text" name="year" />
          </label>
          <label>
            Wine Grapes:
            <input type="text" name="grapes" />
          </label>
          <label>
            Wine Country:
            <input type="text" name="country" />
          </label>
          <label>
            Wine Region:
            <input type="text" name="region" />
          </label>
          <label>
             Wine Description:
            <input type="text" name="description" />
          </label>
          <label>
            URL Picture:
            <input type="text" name="picture" />
          </label>
          <label>
            Wine Price:
            <input type="text" name="price" />
          </label>
        </form>
      </div>
    )
  }
}





class Persons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async getPersons() {
    try {
      const res = await axios.get(PERSON_URL);
      this.setState({ persons: res.data });
    } catch(e) {
      console.error(e);
    }
  }


  async handleDelete(id) {
    try {
      const res = await axios.delete(PERSON_URL + id); // target person id
      console.log(res.data);
      const updateRes = await axios.get(PERSON_URL);
      this.setState({ wines: updateRes.data });
    } catch(er) {
      console.error(er.message)
    }
  }



  componentDidMount() {
    this.getPersons();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  handleSubmit() {
    console.log('something')
  }
  render() {
    return (
      <div className="persons">
        <ul>
          {/* render info */}
          {
            this.state.persons && this.state.persons.map(person => <li>   <br></br> <ul><button onClick={ () => this.handleDelete(person.id)}>Delete Person</button> </ul> <br></br> <br></br> First Name: {person.firstname } <br></br><br></br> Last Name: { person.lastname } <br></br> <br></br>Email: {
              person.email} <br></br><br></br> Username: { person.username} <br></br><br></br> InstanceID: {person.instance_id} <br></br><br></br> </li>)
          }
        </ul>
        <form className="new-persons-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            First Name:
            <input type="text" name="firstname" />
          </label>
          <label>
            Last Name:
            <input type ="text" name="lastname" />
          </label>
          <label>
            Email:
            <input type ="text"  name="email"/>
          </label>
          <label>
            Username:
            <input type = "text" name="username"/>
          </label>
          <label>
            Instance_ID:
            <input type = "text" name="instanceid"/>
          </label>
        </form>
      </div>
    )
  }
}







class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async getBooks() {
    try {
      const res = await axios.get(BOOK_URL);
      this.setState({ books: res.data });
    } catch(e) {
      console.error(e);
    }
  }


  async handleDelete(id) {
    try {
      const res = await axios.delete(BOOK_URL + id); // target book id
      console.log(res.data);
      const updateRes = await axios.get(BOOK_URL);
      this.setState({ wines: updateRes.data });
    } catch(er) {
      console.error(er.message)
    }
  }



  componentDidMount() {
    this.getBooks();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }
  handleSubmit() {
    console.log('something')
  }
  render() {
    return (
      <div className="books">
        <ul>
          {/* render info */}
          {
            this.state.books && this.state.books.map(book => <li>  <br></br> <ul><button onClick={ () => this.handleDelete(book.id)}>Delete Book</button> </ul> <br></br>Title: { book.title } <br></br> <br></br> Author: { book.author } <br></br> <br></br>
             Release Date: {book.release_date} <br></br> <br></br> Image: {book.image} <br></br> <br></br> </li>)
          }
        </ul>
        <form className="new-book-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Book Title:
            <input type="text" name="title" />
          </label>
          <label>
            Release Date:
            <input type="text" name="date" />
          </label>
          <label>
             Author:
            <input type="text" name="author" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
        </form>
      </div>
    )
  }
}




export default App;
  