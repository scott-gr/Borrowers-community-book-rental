import React, { Component } from "react";
import BookInfo from "../../components/BookInfo/BookInfo.jsx";
import "./Book.css";
import API from '../../utils/API';

class Book extends Component {
  state = {
    showModal: false,
  };

  rentBook(book) {
    const user = this.props.match.params;
  //console.log(this.props.match.params)
  console.log("here")
    API.requestToRent(book._id, user)
      .then((res) => {
        console.log(res);
        console.log(res.data._id);
        // this.props.history.push(`/account/${res.data._id}`);
      })
      .catch((err) => console.log(err));
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  book = this.props.book;

  render() {
    return (
      <div className="box bookbox">
        <img
          className="is-clickable"
          src={this.book.image}
          alt={this.book.title}
          onClick={() => this.toggleModal()}
        />
        <div className="middle">
          <button 
          className="button is-outlined is-medium"
          onClick={() => this.toggleModal()}
          >
            Book Info
          </button>
        </div>
        {this.state.showModal && <BookInfo book={this.book} isRental={this.props.isRental} onClose={this.toggleModal.bind(this)} />}
      </div>
    );
  }
}

export default Book;
