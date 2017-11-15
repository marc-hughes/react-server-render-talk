import React from 'react';
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import { createStore } from '../../../../../Library/Caches/typescript/2.6/node_modules/redux';


// ----------------------------- Redux stuff
let initial =  {
  firstName: '',
  lastName: '',
  books: [],
  loading: true
};

const reducer = (state=initial, action=null) => {
  switch(action && action.type) {
    case 'BOOKS_LOADED':
      return {
        ...state,
        ...action.payload,
        loading: ! state.firstName
      }
    case 'NAME_LOADED':
      return {
        ...state,
        ...action.payload,
        loading: ! state.books
      }
    default:
      return state;
  }
}

const actions = {
  nameLoaded: (firstName, lastName) => ({type:'NAME_LOADED', payload:{firstName, lastName}}),
  booksLoaded: (books) => ({type:'BOOKS_LOADED', payload:{books}})
}


// ----------------------------- React stuff
const Book = (props) => <li>{props.name}</li>

const BookList = (props) => (
  <ul>
    {props.books.map((book,idx) => <Book key={idx} name={book} />)}
  </ul>
);

const App = (props) => props.loading ? <div>Loading...</div> :
            <div>
              Hello {props.first_name} {props.last_name} <br/>
              <BookList books={props.books} />
            </div>;



// -------------------------------- Wire it together

const AppContainer = connect((state) => state, actions)(App);

console.log('Loading state', window.__INITIAL_STATE_);

const store = createStore(reducer, window.__INITIAL_STATE_)

console.log('State', store.getState());

// --------------------------------- And render it out.


ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'));


// -------------------------------- Hit our API and load up some data

const loadData = (store) => {
  const url = 'https://runkit.io/marc-hughes/sample-api/branches/master';
  fetch(url)
    .then(response => response.json())
    .then(result => {
      store.dispatch(actions.booksLoaded(result.favorte_books));
      store.dispatch(actions.nameLoaded(result.first_name, result.last_name));
      console.log(store.getState())
    })
}

// We don't have to do this, but we can if we want to, could simulate a later load or something.
// loadData(store);