import React, { Component } from "react";
import "./BookInfo.css";
import API from "../../utils/API";
class BookInfo extends Component {
  book = this.props.book;

  bookRented(book, requester) {
    console.log(requester);
    console.log(book._id);
    API.bookRented(requester._id, book._id);
  }

  deleteBook(book) {
    console.log(this.book._id);
    API.deleteOwnedBook(this.book._id)
      .then((res) => {
        console.log(res);
        this.props.onClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  render() {
    console.log(this.book);
    return (
      <div className="modal is-active">
        <div
          className="modal-background"
          onClick={() => this.props.onClose()}
        ></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Book Info</p>
            <button
              className="delete modal-card-title"
              aria-label="close"
              onClick={() => this.props.onClose()}
            ></button>
          </header>
          <section className="modal-card-body">
            <img
              src={this.book.image}
              alt={this.book.title}
              className="book-cover mr-4"
              style={{ float: "left" }}
            />
            <p className="title is-3">{this.book.title}</p>
            <br />
            <p className="subtitle is-5">
              Author(s): {this.book.authors.join(", ")}
            </p>
            <br />
            <p className="has-text-justified">
              <strong>Description:</strong> {this.book.description}
            </p>
            <br />
            {!this.props.isRental && (
              <p className="buttons are-small">
                <strong>Requesters:</strong>{" "}
                {this.book.requesters.map((requester) => (
                  <button
                    key={requester._id}
                    className="button is-success is-outlined"
                    onClick={() => this.bookRented(this.book, requester)}
                  >
                    <span>{requester.username}</span>
                  </button>
                ))}
              </p>
            )}
          </section>
          <footer className="modal-card-foot">
            {!this.props.isRental && (
              <>
                <button
                  className="button is-danger"
                  onClick={() => this.deleteBook(this.book)}
                >
                  Remove from Library
                </button>
                <button
                  className="button is-warning"
                  // onClick={() =>
                  //   this.bookAvailable(this.book, this.book.requester)
                  // } Future development
                >
                  Book Returned
                </button>
              </>
            )}
            {/* <button className="button">Remove Button</button> */}
          </footer>
        </div>
      </div>
    );
  }
}

export default BookInfo;
