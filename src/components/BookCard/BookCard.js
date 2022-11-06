import React from "react";

import classes from "./BookCard.module.css";

const BookCard = (props) => {
  const CapitalizeHandler = (string) => {
    const arr1 = string.split(" ");
    const arr2 = [];

    for (let word of arr1) {
      let firstLetter;
      let restOfWord;

      if (!word[0].match(/[a-z]/i)) {
        firstLetter = word[0] + word[1].toUpperCase();
        restOfWord = word.slice(2);
      } else {
        firstLetter = word[0].toUpperCase();
        restOfWord = word.slice(1);
      }

      const newWord = firstLetter + restOfWord;
      arr2.push(newWord);
    }

    let newString = arr2.join(" ");

    return newString;
  };

  const title = CapitalizeHandler(props.title);
  const author = CapitalizeHandler(props.author);
  const dateDay = props.added.slice(8, 10);
  const dateMonth = props.added.slice(5, 7);
  const dateYear = props.added.slice(0, 4);
  const date = `${dateDay}-${dateMonth}-${dateYear}`;

  return (
    <div>
      <div className={classes["card-wrapper"]}>
        <p className={classes["title"]}>{title}</p>
        <p className={classes["author"]}>{author}</p>
        <p className={classes["rating"]}>Rating: {props.rating}/5</p>
        <p className={classes["date"]}>Date Added: {date}</p>
        <p className={classes["comments"]}>{props.comments}</p>
      </div>
    </div>
  );
};

export default BookCard;
