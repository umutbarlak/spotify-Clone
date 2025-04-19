import axios from 'axios';
import {createContext, useContext, useState} from 'react';
import {ProfileOptions} from '../utils/apiOptions';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.request(ProfileOptions);

      const userData = {
        followersCount: response.data.followers_count,
        followingCount: response.data.following_count,
        image: response.data.image_url,
        name: response.data.name,
        playlist: response.data.public_playlists,
      };
      console.log(response);

      setProfile(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider value={{loading, error, profile, getProfile}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfileContext must be used within an ProfileProvider');
  }

  return context;
};
