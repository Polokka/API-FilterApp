import { useState, useEffect } from 'react'
import './App.css'

const InputBar = ({ value, onChange, onKeyDown }) => {
  return (
    <div className='inputDiv'>
      <input
        className='inputBar'
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder='Movie name'
      />
    </div>
  );
}

const FancyAssCSS = () => {
  return (
    <div className="container">
    <div className="snow"></div>
    <div className="tree1"></div>
    <div className="tree2"></div>
    <div className="house">
      <div className="roof1">
        <div className="b1"></div>
        <div className="b2"></div>
      </div>
      <div className="wall1">
        <div className="w3">
          <div className="window1">
            <div className="glass1"></div>
          </div>
        </div>
      </div>
      <div className="wall2">
        <div className="light">
          <div className="w1">
            <div className="window">
              <div className="glass"></div>
            </div>
          </div>
          <div className="w2">
            <div className="window">
              <div className="glass"></div>
            </div>
          </div>
        </div>
        <div className="door">
          <div className="handle"></div>
        </div>
        <div className="snw1"></div>
        <div className="snw2"></div>
      </div>
      <div className="wall3">
        <div className="b3"></div>
        <div className="b4"></div>
        <div className="chimney">
          <div className="top">
            <div className="smoke">
              <div className="s1"></div>
              <div className="s2"></div>
              <div className="s3"></div>
            </div>
            <div className="shne1"></div>
            <div className="shne2"></div>
          </div>
        </div>
        <div className="sn">
          <div className="dr1"></div>
          <div className="dr2"></div>
          <div className="dr3"></div>
        </div>
        <div className="sn1">
          <div className="dr4"></div>
        </div>
        <div className="sh1"></div>
        <div className="sh2"></div>
        <div className="sh3"></div>
        <div className="sh4"></div>
        <div className="sh5"></div>
      </div>
    </div>
    <div className="snowfall"></div>
    <div className="cover"></div>
    <div className="bottom">
      <div className="bt1"></div>
      <div className="bt2"></div>
    </div>
    <div className="fence">
      <div className="fn1">
        <div className="screw"></div>
      </div>
      <div className="fn2">
        <div className="screw"></div>
      </div>
      <div className="fn3">
        <div className="screw"></div>
      </div>
      <div className="stck"></div>
    </div></div>
  )
}

function App() {

  async function dataRequest(userInput) {

    try {
      const returningData = await fetch(`http://www.omdbapi.com/?t=${userInput}&apikey=97ce9962`);
      const data = await returningData.json();
      return data;
    } catch (error) {
      console.error('Virhe haettaessa tietoja:', error);
      // Käsittely virhetilanteelle
      return null;
    }
  }
  

  const [userInput, setUserInput] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  const [showResults, setShowResults] = useState(false);

  const [results, setResults] = useState(null);

  useEffect(() => {
    if (showResults) {
      dataRequest(userInput).then((data) => {
          
      
      setResults(data)
      setShowResults(false)
      });
    }
  }, [showResults]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowResults(true);
    }
  }

  return (
    <>
    <div className='topBar'>Movie information App/API usage showcase</div>
      <div className='mainDiv'>
        <div className='searchBar'>
          <InputBar value={userInput} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
          <button className='searchButton' onClick={() => setShowResults(true)}>Search</button>
        </div>
        {results && results.Response !== "False" && (
          <>
            <div className='title'>Title: {results.Title}</div><br />
            <div className='year'>Year: {results.Year}</div><br />
            <div className='genre'>Genre: {results.Genre}</div><br />
            <div className='runtime'>Runtime: {results.Runtime}</div><br />
            <div className='actors'>Actors: {results.Actors}</div><br />
            <div className='plot'>Plot: {results.Plot}</div><br />
            <div className='ratings'>Ratings:<br /> {results.Ratings[0].Source}: {results.Ratings[0].Value}</div>
            <div className='ratings'>{results.Ratings[1].Source}: {results.Ratings[1].Value}</div>
            <div className='ratings'>{results.Ratings[2].Source}: {results.Ratings[2].Value}</div><br />
          </>
        )}
        <FancyAssCSS />
      </div>
    </>
  )
}

export default App

/* */