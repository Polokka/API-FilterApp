import { useState, useEffect } from "react";
import "./App.css";
import { FancyAssCSS } from "./FancyAssCSS";

const InputBar = ({ value, onChange, onKeyDown }) => {
  return (
    <div className="inputDiv">
      <input
        className="inputBar"
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Movie name"
      />
    </div>
  );
};

function App() {
  async function dataRequest(userInput) {
    try {
      const returningData = await fetch(
        `http://www.omdbapi.com/?t=${userInput}&apikey=97ce9962`
      );
      const data = await returningData.json();
      return data;
    } catch (error) {
      console.error("Virhe haettaessa tietoja:", error);
      // Käsittely virhetilanteelle
      return null;
    }
  }

  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const [showResults, setShowResults] = useState(false);

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (showResults) {
      dataRequest(userInput).then((data) => {
        setResults(data);
        setShowResults(false);
      });
    }
  }, [showResults]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShowResults(true);
    }
  };

  return (
    <>
      <div className="topBar">Movie information App/API usage showcase</div>
      <div className="mainDiv">
        <div className="searchBar">
          <InputBar
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button className="searchButton" onClick={() => setShowResults(true)}>
            Search
          </button>
        </div>
        {results && results.Response !== "False" && (
          <>
            <div className="title">Title: {results.Title}</div>
            <br />
            <div className="year">Year: {results.Year}</div>
            <br />
            <div className="genre">Genre: {results.Genre}</div>
            <br />
            <div className="runtime">Runtime: {results.Runtime}</div>
            <br />
            <div className="actors">Actors: {results.Actors}</div>
            <br />
            <div className="plot">Plot: {results.Plot}</div>
            <br />
            <div className="ratings">
              Ratings:
              {results.Ratings[0] ? (
                <div>
                  {results.Ratings[0].Source}: {results.Ratings[0].Value}
                </div>
              ) : (
                <div>No ratings in database</div>
              )}
              {results.Ratings[1] && (
                <div className="ratings">
                  {results.Ratings[1].Source}: {results.Ratings[1].Value}
                </div>
              )}
              {results.Ratings[2] && (
                <div className="ratings">
                  {results.Ratings[2].Source}: {results.Ratings[2].Value}
                </div>
              )}
              <br />
            </div>
          </>
        )}
        <FancyAssCSS />
      </div>
    </>
  );
}

export default App;

/* */
