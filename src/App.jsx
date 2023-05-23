import React, { useState, useEffect } from 'react';
import './app.css'

function App() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://universitiesapi.onrender.com/v1/api/universities/${country}`);
      const responseData = await response.json();
      if (responseData.length > 0) {
        setData(responseData);
        setErrorMessage('');
      } else {
        setData([]);
        setErrorMessage('No universities exist in this country.');
      }
    } catch (error) {
      console.log('An error occurred', error);
      setErrorMessage('An error occurred while fetching data.');
    }
  };

  const handleChange = (event) => {
    const searchParam = event.target.value;
    setCountry(searchParam);
  };

  const handleSearch = () => {
    if (country !== '') {
      fetchData();
    }
  };

  const handleClear = () => {
    setCountry('');
    setData([]);
    setErrorMessage('');
  };

  return (
    <>
    <div className="head-section">
    <button onClick={handleSearch}>Search</button>
      <input type="text" onChange={handleChange} value={country} />
      <button onClick={handleClear}>Reset</button>
    </div>
    <h1 className='numberOFUniversities'>Number of Universities: {data.length}</h1>
      {/* Render the data from the API */}
      {errorMessage !== '' ? (
        <p className='error-message'>{errorMessage}</p>
      ) : (
        data.map((university, index) => (
          <div className='container' key={index}>
            <p>Name: {university.name}</p>
            <p>Country: {university.country}</p>
            {/* <a href="">Website: {university.web_pages[0]}</a> */}
            <p>website: <a href="">{university.web_pages[0]}</a></p>
           
            <hr />
          </div>
        ))
      )}
    </>
  );
}

export default App;
