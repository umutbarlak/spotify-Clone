export const AlbumOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'türkiyede popüler',
    type: 'albums',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5',
  },
  headers: {
    'x-rapidapi-key': '6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const OneAlbumOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/albums/',
  headers: {
    'x-rapidapi-key': '6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const ArtistOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/search/',
  params: {
    q: 'türkiyede popüler',
    type: 'artists',
    offset: '0',
    limit: '10',
    numberOfTopResults: '5',
  },
  headers: {
    'x-rapidapi-key': '6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const ProfileOptions = {
  method: 'GET',
  url: 'https://spotify23.p.rapidapi.com/user_profile/',
  params: {
    id: 'nocopyrightsounds',
    playlistLimit: '10',
    artistLimit: '10',
  },
  headers: {
    'x-rapidapi-key': '6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc',
    'x-rapidapi-host': 'spotify23.p.rapidapi.com',
  },
};

export const SearchOptions = {
  method: 'GET',
  url: 'https://shazam.p.rapidapi.com/search',
  params: {
    term: 'türkiye',
    locale: 'tr-TR',
    offset: '0',
    limit: '5',
  },
  headers: {
    'x-rapidapi-key': '6ea5fbf78bmsh21609d7b9090444p18b688jsn3148f5a181dc',
    'x-rapidapi-host': 'shazam.p.rapidapi.com',
  },
};
