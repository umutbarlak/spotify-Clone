import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/navigation/Routes';
import {AlbumProvider} from './src/context/AlbumContext';
import {ArtistProvider} from './src/context/ArtistContext';
import {ProfileProvider} from './src/context/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
      <AlbumProvider>
        <ArtistProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ArtistProvider>
      </AlbumProvider>
    </ProfileProvider>
  );
};

export default App;
