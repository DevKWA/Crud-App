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
    this.selectWine = this.selectWine.bind(this);
    this.editWine = this.editWine.bind(this);
    this.submitEditedWine = this.submitEditedWine.bind(this);
  }
  async getWines() {
    try {
      const res = await axios.get(WINES_URL);
      this.setState({ wines: res.data });
    } catch(e) {
      console.error(e);
      
    }
  }

  componentDidMount() {
    this.getWines();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {name, year, grapes, country, region, description, picture, price} = this.state;
    const wine = {name, year, grapes, country, region, description, picture, price};

    try {
    const res = await axios.post(WINES_URL, wine);
    console.log(res.data);

    const updateRes = await axios.get(WINES_URL);
    this.setState({wines: updateRes.data});
  } catch(e){
    console.error(e.message);
  }
}

  async handleDelete (id)  {
    console.log(WINES_URL + id);
    try {
      const res = await axios.delete(WINES_URL + id); // target wine id
      console.log(res.data);

      const updateRes = await axios.get(WINES_URL);
      this.setState({ wines: updateRes.data });
    } catch(e) {
      console.error(e.message)
    }
  }


selectWine(selectedWine){
  this.setState({ selectedWine});
}

editWine(e){
  const {name, value } = e.target;
  this.setState({...this.state, selectedWine:{
...this.state.selectedWine,[name]: value}})
}

async submitEditedWine(e){
  e.preventDefault();
  try{
    const editedWine = this.state.selectedWine;
    console.log(editedWine)
    const focusWine = WINES_URL + editedWine.id
    //eslint-disable-next-line
    const res = await axios.patch(focusWine, editedWine);
    const resRefresh = await axios.get(WINES_URL);
    this.setState({ wines: resRefresh.data});
  } catch(e){
    console.log(e);
  }
}

  render() {
    return (
      <div className="wines">
        <ul>
          {/* render info */}
          {
            this.state.wines && this.state.wines.map(wine => <li key = {wine.id}> <br></br> <ul><button onClick={ () => this.handleDelete(wine.id)}>Delete Wine</button> 
            <button onClick={ () => this.selectWine(wine)}>Edit Wine</button> </ul> <br></br> <br></br> Wine Name: { wine.name } <br></br> <br></br> Wine Year: { wine.year } <br></br> <br></br> Wine Grapes: {wine.grapes} <br></br> <br></br>
              
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
                  <input type ="submit"/>
                  </form>  
                    <hr></hr>
{
                this.state.selectedWine && <form className ="wine-edit-form"
                onChange = { this.editWine }
                onSubmit = { this.submitEditedWine}>
                  
                  <label>
              Wine Names:
              <input type="text" name="name" defaultValue={ this.state.selectedWine.name } />
            </label>
            <label>
              Wine Year:
              <input type="text" name="year" defaultValue={ this.state.selectedWine.year } />
            </label>
            <label>
              Wine Grapes:
              <input type="text" name="grapes" defaultValue={ this.state.selectedWine.grapes } />
            </label>
            <label>
              Wine Country:
              <input type="text" name="country" defaultValue={ this.state.selectedWine.country } />
            </label>
            <label>
              Wine Region:
              <input type="text" name="region" defaultValue={ this.state.selectedWine.region } />
            </label>
            <label>
              Wine Description:
              <input type="text" name="description" defaultValue={ this.state.selectedWine.description } />
            </label>
            <label>
              URL Picture:
              <input type="text" name="picture" defaultValue={ this.state.selectedWine.picture } />
            </label>
            <label>
              Wine Price:
              <input type="text" name="price" defaultValue={ this.state.selectedWine.price } />
            </label>
            <input type="submit" />
        </form>
  }
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
    this.selectPerson = this.selectPerson.bind(this);
    this.editPerson= this.editPerson.bind(this);
    this.submitEditedPerson = this.submitEditedPerson.bind(this);

  }
  async getPersons() {
    try {
      const res = await axios.get(PERSON_URL);
      this.setState({ persons: res.data });
    } catch(e) {
      console.error(e);
    }
  }


  componentDidMount() {
    this.getPersons();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  async handleSubmit(e) {
    e.preventDefault();
    const {firstName, lastName, email, userName, instanceID} = this.state;
    const person = {firstName, lastName, email, userName, instanceID};

    try {
    const res = await axios.post(PERSON_URL, person);
    console.log(res.data);

    const updateRes = await axios.get(PERSON_URL);
    this.setState({persons: updateRes.data});
  } catch(e){
    console.error(e.message);
  }
}


  async handleDelete(id) {
    try {
      const res = await axios.delete(PERSON_URL + id); // target person id
      console.log(res.data);
      const updateRes = await axios.get(PERSON_URL);
      this.setState({ persons: updateRes.data });
    } catch(er) {
      console.error(er.message)
    }
  }

  selectPerson(selectedPerson){
    this.setState({ selectedPerson});
  }
  
  editPerson(e){
    const {name, value } = e.target;
    this.setState({...this.state, selectedPerson:{
  ...this.state.selectedPerson,[name]: value}})
  }
  

  async submitEditedPerson(e){
    e.preventDefault();
    try{
      const editedPerson = this.state.selectedPerson;
      console.log(editedPerson)
      const focusPerson = PERSON_URL + editedPerson.id
      //eslint-disable-next-line
      const res = await axios.patch(focusPerson, editedPerson);
      const resRefresh = await axios.get(PERSON_URL);
      this.setState({ persons: resRefresh.data});
    } catch(e){
      console.log(e);
    }
  }




  render() {
    return (
      <div className="persons">
        <ul>
          {/* render info */}
          {
            this.state.persons && this.state.persons.map(person => <li>   <br></br> <ul><button onClick={ () => this.handleDelete(person.id)}>Delete Person</button> 
            <button onClick={ () => this.selectPerson(person)}>Edit Person</button> </ul> <br></br> <br></br> First Name: {person.firstname } <br></br><br></br> Last Name: { person.lastname } <br></br> <br></br>Email: {
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
            <input type = "text" name="instance_id"/>
          </label>
                    <input type ="submit"/>

                      </form>
                      <hr></hr>

   {
    this.state.selectedPerson&& <form className ="person-edit-form"
    onChange = { this.editPerson }
    onSubmit = { this.submitEditedPerson}>
      
      <label>
  First Name:
  <input type="text" name="firstname" defaultValue={ this.state.selectedPerson.firstname } />
</label>
<label>
  Last Name:
  <input type="text" name="lastname" defaultValue={ this.state.selectedPerson.lastname } />
</label>
<label>
  Email:
  <input type="text" name="email" defaultValue={ this.state.selectedPerson.email } />
</label>
<label>
  Username:
  <input type="text" name="username" defaultValue={ this.state.selectedPerson.username } />
</label>
<label>
  Instance_ID:
  <input type="text" name="instance_id" defaultValue={ this.state.selectedPerson.instanceid } />
</label>
                            <input type ="submit"/>
</form>
}
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
    this.selectBook = this.selectBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.submitEditedBook = this.submitEditedBook.bind(this);
  }
  async getBooks() {
    try {
      const res = await axios.get(BOOK_URL);
      this.setState({ books: res.data });
    } catch(e) {
      console.error(e);
    }
  }



  componentDidMount() {
    this.getBooks();
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }


  async handleSubmit(e) {
    e.preventDefault();
    const {title, date, author, image} = this.state;
    const book = {title, date, author, image};

    try {
    const res = await axios.post(BOOK_URL, book);
    console.log(res.data);

    const updateRes = await axios.get(BOOK_URL);
    this.setState({books: updateRes.data});
  } catch(e){
    console.error(e.message);
  }
}



  async handleDelete(id) {
    try {
      const res = await axios.delete(BOOK_URL + id); // target book id
      console.log(res.data);
      const updateRes = await axios.get(BOOK_URL);
      this.setState({ books: updateRes.data });
    } catch(er) {
      console.error(er.message)
    }
  }


selectBook(selectedBook){
  this.setState({ selectedBook});
}

editBook(e){
  const {name, value } = e.target;
  this.setState({...this.state, selectedBook:{
...this.state.selectedBook,[name]: value}})
}

async submitEditedBook(e){
  e.preventDefault();
  try{
    const editedBook = this.state.selectedBook;
    console.log(editedBook)
    const focusBook = BOOK_URL + editedBook.id
    //eslint-disable-next-line
    const res = await axios.patch(focusBook, editedBook);
    const resRefresh = await axios.get(BOOK_URL);
    this.setState({ books: resRefresh.data});
  } catch(e){
    console.log(e);
  }
}


  render() {
    return (
      <div className="books">
        <ul>
          {/* render info */}
          {
            this.state.books && this.state.books.map(book => <li>  <br></br> <ul><button onClick={ () => this.handleDelete(book.id)}>Delete Book</button> 
            <button onClick={ () => this.selectBook(book)}>Edit Book</button> </ul> <br></br>Title: { book.title } <br></br> <br></br> Author: { book.author } <br></br> <br></br>
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
            <input type="text" name="release_date" />
          </label>
          <label>
             Author:
            <input type="text" name="author" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
                 <input type ="submit"/>
        </form>

        <hr></hr>
 {
    this.state.selectedBook&& <form className ="book-edit-form"
    onChange = { this.editBook }
    onSubmit = { this.submitEditedBook}>
      
      <label>
  Book Title:
  <input type="text" name="title" defaultValue={ this.state.selectedBook.title } />
</label>
<label>
  Release Date:
  <input type="text" name="release_date" defaultValue={ this.state.selectedBook.date } />
</label>
<label>
  Author:
  <input type="text" name="author" defaultValue={ this.state.selectedBook.author } />
</label>
<label>
  Image:
  <input type="text" name="image" defaultValue={ this.state.selectedBook.image } />
</label>
            <input type ="submit"/>
</form>
}
</div>
    )
  }
}














export default App;
  