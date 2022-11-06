import React, { useState } from "react";
import classes from "./App.module.css";

import AllBooksSection from "./components/AllBooksSection/AllBooksSection";
import BookByTitleSection from "./components/BookByTitleSection/BookByTitleSection";
import BookByAuthorSection from "./components/BooksByAuthorSection/BooksByAuthorSection";
import HighestRatedSection from "./components/HighestRatedSection/HighestRatedSection";
import NewBookSection from "./components/NewBookSection/NewBookSection";
import UpdateBookSection from "./components/UpdateBookSection/UpdateBookSection";
import DeleteBookSection from "./components/DeleteBookSection/DeleteBookSection";

function App() {
  const [allBooksActive, setAllBooksActive] = useState(false);
  const [bookByTitleActive, setBookByTitleActive] = useState(false);
  const [bookByAuthorActive, setBookByAuthorActive] = useState(false);
  const [highestRatedActive, setHighestRatedActive] = useState(false);
  const [newBookActive, setNewBookActive] = useState(false);
  const [updateBookActive, setUpdateBookActive] = useState(false);
  const [deleteBookActive, setDeleteBookActive] = useState(false);
  const [menuMobileActive, setMenuMobileActive] = useState(false);

  const turnOnMenuMobile = () => {
    setMenuMobileActive(true);
  };

  const resetActivesHandler = () => {
    setDeleteBookActive(false);
    setNewBookActive(false);
    setUpdateBookActive(false);
    setHighestRatedActive(false);
    setBookByAuthorActive(false);
    setBookByTitleActive(false);
    setAllBooksActive(false);
    setMenuMobileActive(false);
  };

  const AllBooksHandler = () => {
    resetActivesHandler();
    setAllBooksActive(true);
  };

  const bookByTitleHandler = () => {
    resetActivesHandler();
    setBookByTitleActive(true);
  };

  const bookByAuthorHandler = () => {
    resetActivesHandler();
    setBookByAuthorActive(true);
  };

  const highestRatedHandler = () => {
    resetActivesHandler();
    setHighestRatedActive(true);
  };

  const newBookHandler = () => {
    resetActivesHandler();
    setNewBookActive(true);
  };

  const updateBookHandler = () => {
    resetActivesHandler();
    setUpdateBookActive(true);
  };

  const deleteBookHandler = () => {
    resetActivesHandler();
    setDeleteBookActive(true);
  };

  return (
    <section className={classes.hero}>
      <header className={classes.header}>
        <h1 className={classes.title}>172v Book Ratings</h1>
        <div className={classes["menu-wrapper"]}>
          <button onClick={AllBooksHandler} className={classes["btn"]}>
            Show All
          </button>
          <button onClick={bookByTitleHandler} className={classes["btn"]}>
            Book By Title
          </button>
          <button onClick={bookByAuthorHandler} className={classes["btn"]}>
            Book By Author
          </button>
          <button onClick={highestRatedHandler} className={classes["btn"]}>
            Highest Rated
          </button>
          <button onClick={newBookHandler} className={classes["btn"]}>
            New Book
          </button>
          <button onClick={updateBookHandler} className={classes["btn"]}>
            Update Book
          </button>
          <button onClick={deleteBookHandler} className={classes["btn"]}>
            Delete Book
          </button>
        </div>
        <button
          onClick={turnOnMenuMobile}
          className={classes["btn-menu-wrapper-mobile-toggle"]}
        >
          Nav Menu
        </button>
      </header>
      {menuMobileActive && (
        <div className={classes["menu-wrapper-mobile"]}>
          <button onClick={AllBooksHandler} className={classes["btn"]}>
            Show All
          </button>
          <button onClick={bookByTitleHandler} className={classes["btn"]}>
            Book By Title
          </button>
          <button onClick={bookByAuthorHandler} className={classes["btn"]}>
            Book By Author
          </button>
          <button onClick={highestRatedHandler} className={classes["btn"]}>
            Highest Rated
          </button>
          <button onClick={newBookHandler} className={classes["btn"]}>
            New Book
          </button>
          <button onClick={updateBookHandler} className={classes["btn"]}>
            Update Book
          </button>
          <button onClick={deleteBookHandler} className={classes["btn"]}>
            Delete Book
          </button>
        </div>
      )}

      {allBooksActive && <AllBooksSection />}
      {bookByTitleActive && <BookByTitleSection />}
      {bookByAuthorActive && <BookByAuthorSection />}
      {highestRatedActive && <HighestRatedSection />}
      {newBookActive && <NewBookSection />}
      {updateBookActive && <UpdateBookSection />}
      {deleteBookActive && <DeleteBookSection />}
    </section>
  );
}

export default App;
