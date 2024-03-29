import React, { useState, useEffect } from 'react';
// import './style.css';

const MusicPlayer = ({ songs }) => {
    const [selectedSong, setSelectedSong] = useState(null);
    useEffect(() => {
        if (selectedSong) {
            const audioElement = document.querySelector('audio');
            audioElement.src = selectedSong.url;
            audioElement.load(); // Optional: Preload the audio for faster playback
            audioElement.play(); // Optional: Start playback automatically
        }
    }, [selectedSong]);
    const handleSongClick = (song) => {
        setSelectedSong(song);
    };

    return (
        <div className="container">
            <div className="music-player">
                <nav>
                    <div className="circle">
                        <i className="fa-solid fa-angle-left"></i>
                    </div>
                    <div className="circle">
                        <i className="fa-solid fa-bars"></i>
                    </div>
                </nav>
                {songs && (
                    <ul>
                        {songs.map((song, index) => (
                            <li key={index} onClick={() => handleSongClick(song)}>
                                {song.name}
                            </li>
                        ))}
                    </ul>
                )}
                {selectedSong && (
                    <div>
                        <h1>{selectedSong.name}</h1>
                        <audio controls>
                            <source src={selectedSong.url} type="audio/mpeg" />
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MusicPlayer;
