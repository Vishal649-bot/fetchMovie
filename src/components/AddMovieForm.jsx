// AddMovieForm.js
import React, { useState } from 'react';

const AddMovieForm = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [openingText, setOpeningText] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    const movieData = {
      title: title,
      openingText: openingText,
      releaseDate: releaseDate
    };
    onAddMovie(movieData);
    setTitle('');
    setOpeningText('');
    setReleaseDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label>Opening Text</label>
        <textarea
          rows="5"
          value={openingText}
          onChange={(event) => setOpeningText(event.target.value)}
        ></textarea>
      </div>
      <div>
        <label>Release Date</label>
        <input
          type="text"
          value={releaseDate}
          onChange={(event) => setReleaseDate(event.target.value)}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
