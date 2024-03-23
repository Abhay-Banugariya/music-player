import React, { useState, useEffect } from 'react';

const App = () => {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedData, setSelectedData] = useState([]);

  const handleClick = async (name) => {
    console.log('Clicked name:', name);

    setSelectedName(name);

    try {
      const response = await fetch("https://www.vallabhpith.com/getfiles.php?prefix=" + name + "/");
      const data = await response.json();
      console.log('Response data:', data);
      const newData = data.names;
      if (Array.isArray(newData) && newData.length > 0 && newData[0].hasOwnProperty('name')) {
        const fetchedNameData = newData.find(item => item.name === name);
        setSelectedData(newData);
      } else {
        console.error('Unexpected data format or name not found');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetch('https://www.vallabhpith.com/getfolder.php/')
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        setNames(data.names);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div>
      <h1>List of Names</h1>
      <ul>
        {names.map((name, index) => (
          <li key={index} onClick={() => handleClick(name)}>
            {name}
          </li>
        ))}
      </ul>

      {/* Conditionally render the fetched data based on selectedName */}
      {selectedData && (
        <div>
          <h2>Fetched data for: {selectedName}</h2>
          {/* Display or use the fetched data based on its structure */}
          {typeof selectedData === 'object' && (
            <>
              <p>Name: {selectedData.name}</p>
              <ul>
                {selectedData.map((item, index) => (
                  <li key={index}>
                    <a href={item.url}>{item.name}</a>
                  </li>
                ))}
              </ul>

            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
