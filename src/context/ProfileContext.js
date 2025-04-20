import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {ProfileOptions} from '../utils/apiOptions';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [profile, setProfile] = useState(null);
  const [proLoading, setProLoading] = useState(true);
  const [proError, setProError] = useState(null);

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

      setProfile(userData);
    } catch (error) {
      console.log(error);
      setProError(error.message);
    } finally {
      setProLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{proLoading, proError, profile, getProfile}}>
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
