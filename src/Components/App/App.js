import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],

      playlistTracks: [],

      playlistName: [""],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let newPlaylistTracks = Array.from(this.state.playlistTracks);
      newPlaylistTracks.push(track);
      this.setState({
        playlistTracks: newPlaylistTracks
      });
    }
  }

  removeTrack(track) {
    let newTracks = this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({
      playlistTracks: newTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
  }

  search(term) {
    Spotify.search(term).then(results => {
      this.setState({searchResults: results})
    })
  }

  render() {
    return (
      <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
            onAdd={this.addTrack}
            searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName}
            onSave={this.savePlaylist}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
