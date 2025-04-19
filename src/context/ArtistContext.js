import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {ArtistOptions} from '../utils/apiOptions';

export const ArtistContext = createContext();

export const ArtistProvider = ({children}) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const options = ArtistOptions;
      try {
        const response = await axios.request(options);

        const data = response.data?.artists?.items?.map(item => ({
          name: item.data.profile.name,
          photo: item.data.uri,
          images: item.data.visuals.avatarImage.sources,
        }));

        setArtists(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ArtistContext.Provider value={{artists, loading, error}}>
      {children}
    </ArtistContext.Provider>
  );
};

export const useArtistContext = () => {
  const context = useContext(ArtistContext);

  if (!context) {
    throw new Error('useArtistContext must be used within an ArtistProvider');
  }

  return context;
};
