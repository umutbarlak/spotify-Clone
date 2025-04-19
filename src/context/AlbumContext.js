import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {AlbumOptions, OneAlbumOptions} from '../utils/apiOptions';

export const AlbumContext = createContext();

export const AlbumProvider = ({children}) => {
  const [albums, setAlbums] = useState([]);
  const [albumSongs, setAlbumSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oneloading, setoneLoading] = useState(true);
  const [oneerror, setoneError] = useState(null);
  const getData = async () => {
    const options = AlbumOptions;
    try {
      const response = await axios.request(options);

      const albumsItems = response?.data?.albums?.items?.map(item => ({
        uri: item.data?.uri,
        name: item.data?.name,
        year: item.data?.date.year,
        artist: {
          name: item.data.artists.items[0].profile.name,
          photo: item.data.artists.items[0].uri,
        },
        coverArt: item?.data?.coverArt?.sources[0]?.url,
      }));

      setAlbums(albumsItems);
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOneAlbum = async id => {
    console.log(id);
    try {
      const options = OneAlbumOptions;

      options.params = {
        ids: id,
      };

      const response = await axios.request(options);

      const data = response.data?.albums[0]?.tracks?.items.map(item => ({
        songName: item.name,
        artist: item.artists[0].name,
        music: item.preview_url,
      }));
      setAlbumSongs(data);
    } catch (error) {
      console.log(error);
      setoneError(error.message);
    } finally {
      setoneLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AlbumContext.Provider
      value={{albums, albumSongs, loading, error, getOneAlbum}}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbumContext = () => {
  const context = useContext(AlbumContext);

  if (!context) {
    throw new Error('useAlbumContext must be used within an AlbumProvider');
  }

  return context;
};
