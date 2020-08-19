import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/API.js';
import Book from '../../components/Book/Book';
import './Account.css';
import Navbar from '../../components/Navbar/Navbar.jsx';

class Account extends Component {
  state = {
    ownedBooks: [],
    renting: [],
  };

  // Make an axios call to get the User
  // on the User route, make sure we call .populate("books")
  // on a successful call return, set the books on state.npm star
  // map through the books array and display them on the page.
  componentDidMount() {
    console.log(this.props.match.params.id);
    API.getOwnedBooks(this.props.match.params.id)

      .then((res) => {
        console.log('Owned Books', res.data.ownedBooks);
        console.log('Renting', res.data.renting);
        console.log(res.data);
        const ownedBooks = res.data.ownedBooks;
        const renting = res.data.renting;
        // console.log(ownedBooks);
        this.setState({ ownedBooks: ownedBooks, renting: renting });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="section accountSection">
          <section class="hero is-dark">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">Your Library</h1>
                <h2 class="subtitle">Add books for others to rent</h2>
                <Link to={`/addbook/${this.props.match.params.id}`}>
                  <button className="button is-success is-large">
                    Add Books
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <div className="container is-fluid bookContainer">
            <div className="columns bookrow level">
              {this.state.ownedBooks.map((book) => (
                <div className="bookcover level-item">
                  <Book key={book._id} book={book} isRental={false}/>
                </div>
              ))}
            </div>
          </div>
          <div className="polygon"></div>

          <section class="hero is-dark">
            <div class="hero-body">
              <div class="container">
                <h1 class="title">Borrowed Library</h1>
                <h2 class="subtitle">The books you are currently borrowing</h2>
                <Link to={`/main/${this.props.match.params.id}`} className="">
                  {' '}
                  <button className="button findbtn is-large">
                    {' '}
                    Find Books
                  </button>
                </Link>
              </div>
            </div>
          </section>
          <div className="container is-fluid bookContainer">
            <div className="columns borrowrow level">
              {this.state.renting.map((book) => (
                <div className="bookcover level-item">
                  <Book book={book} isRental={true} />
                </div>
              ))}
            </div>
          </div>
          <div className="polygon"></div>
        </div>
      </div>
    );
  }
}

export default Account;
