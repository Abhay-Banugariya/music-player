import React, { useState, useEffect } from 'react';
import MusicPlayer from './components/MusicPlayer';

const App = () => {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);


  const handleClick = async (name) => {
    console.log('Clicked name:', name);

    setSelectedName(name);

    try {
      const response = await fetch("https://www.vallabhpith.com/getfiles.php?prefix=" + name + "/");
      const data = await response.json();
      console.log('Response data:', data);
      const newData = data.names;
      if (Array.isArray(newData) && newData.length > 0 && newData[0].hasOwnProperty('name')) {
        // const fetchedNameData = newData.find(item => item.name === name);
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
          <MusicPlayer songs={selectedData && selectedData.length > 0 ? selectedData : null} />
        </div>
      )}
    </div>
  );
};

export default App;
