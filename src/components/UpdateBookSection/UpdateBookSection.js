import React, { useState, useRef, useEffect } from "react";

import classes from "./UpdateBookSection.module.css";

const UpdateBookSection = () => {
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateStatusMessage, setUpdateStatusMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  let titleToUpdateRef = useRef();
  let titleRef = useRef();
  let authorRef = useRef();
  let ratingRef = useRef();
  let commentsRef = useRef();

  useEffect(() => {
    setDataSubmitted(false);
  }, []);

  const turnOffDataSubmittedHandler = () => {
    setDataSubmitted(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      titleToUpdateRef.current.value.length === 0 ||
      titleRef.current.value.length === 0 ||
      authorRef.current.value.length === 0 ||
      ratingRef.current.value.length === 0 ||
      commentsRef.current.value.length === 0
    ) {
      return setShowErrorMessage(true);
    }
    // titleToUpdateRef.current.value
    fetch(
      "https://book-ratings-172v.herokuapp.com/books/v1/get-by-title/" +
        titleToUpdateRef.current.value.replace(" ", "-").toLowerCase(),
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titleRef.current.value,
          author: authorRef.current.value,
          rating: ratingRef.current.value,
          comments: commentsRef.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setUpdateStatus("success");

        if (data.status === "success") {
          setUpdateStatusMessage("Book updated");
        } else if (data.status === "fail") {
          setUpdateStatusMessage(data.message);
        }
        console.log(updateStatusMessage);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUpdateStatus("fail");
      });

    setDataSubmitted(true);
    setShowErrorMessage(false);

    // paramTitle = searchRef.current.value.replace(" ", "-").toLowerCase();
  };

  return (
    <React.Fragment>
      {!dataSubmitted && (
        <React.Fragment>
          <form className={classes["form-wrapper"]} onSubmit={submitHandler}>
            <label
              htmlFor="title-to-update"
              className={classes["label-title-to-update"]}
            >
              Book to update:
            </label>
            <input
              ref={titleToUpdateRef}
              type="text"
              name="titleToUpdate"
              className={classes["input-titleToUpdate"]}
            />

            <label htmlFor="title" className={classes["label-title"]}>
              Updated title:
            </label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              className={classes["input-title"]}
            />

            <label htmlFor="author" className={classes["label-author"]}>
              Updated author:
            </label>
            <input
              ref={authorRef}
              type="text"
              name="author"
              className={classes["input-author"]}
            />

            <label htmlFor="rating" className={classes["label-rating"]}>
              Updated rating:
            </label>
            <input
              ref={ratingRef}
              type="text"
              name="rating"
              className={classes["input-rating"]}
            />

            <label htmlFor="comments" className={classes["label-comments"]}>
              Updated comments:
            </label>
            <textarea
              rows="4"
              cols="50"
              ref={commentsRef}
              name="comments"
              className={classes["input-comments"]}
            />

            <input
              type="submit"
              value="Submit"
              className={classes["btn-submit"]}
            />
          </form>
          {showErrorMessage && (
            <p className={classes["error-message"]}>
              All fields must be filled in
            </p>
          )}
        </React.Fragment>
      )}

      {dataSubmitted && (
        <React.Fragment>
          <div className={classes["message-wrapper"]}>
            {updateStatus === "success" && (
              <p className={classes["message-text"]}>{updateStatusMessage}</p>
            )}
            {updateStatus === "fail" && (
              <p className={classes["message-text"]}>There was an error</p>
            )}
          </div>
          <button
            className={classes["btn-posted"]}
            onClick={turnOffDataSubmittedHandler}
          >
            Return to Update Book
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UpdateBookSection;
