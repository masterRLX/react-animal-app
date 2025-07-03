import './App.css';
import React from 'react';
import PageTitle from './components/PageTitle';
import AnimalForm from './components/AnimalForm';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';

export default App;
const OPEN_API_DOMAIN = 'https://cataas.com';

const jsonLocalStorage = {
  setItem: (key, value) => {
    console.log('localStorage.setItem() 실행');

    localStorage.setItem("count", JSON.stringify(value))
  },
  getItem: (key) => {
    console.log('localStorage.getItem() 실행');
    return JSON.parse(localStorage.getItem(key))
  },
};
//Open API ///////////////////////////////
const fetchCat = async (text) => {
  console.log('fetcheCat() 함수 실행');


  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?width=400&height=400&json=true`);
  const responseJson = await response.json();
  return responseJson.url;
};

function App() {
  console.log('** APP 실행 **');

  const [mainAnimal, setMainAnimal] = React.useState(`${OPEN_API_DOMAIN}/cat`);
  const [favorites, setFavorites]
    = React.useState(() => {
      return jsonLocalStorage.getItem('favorites') || [];
    });

  const [count, setCount]
    = React.useState(() => {
      return jsonLocalStorage.getItem('count') || 1;
    });

  const choiceFavorite = favorites.includes(mainAnimal);

  function incrementCount() {
    setCount((pre) => {
      const nextCount = pre + 1;
      localStorage.setItem('count', JSON.stringify(nextCount));
      return nextCount;
    });
  }

  
  async function updateMainAnimal(text) {
    const newCat = await fetchCat(text);
    setMainAnimal(newCat)

    incrementCount();
  }


  function handleHeartClick() {
    console.log('하트버튼클릭');

    setFavorites((pre) => {
      const nextFavorites = [...pre, mainAnimal];

      localStorage.setItem('favorites', JSON.stringify(nextFavorites));
      return nextFavorites;
    });



  }

  return (
    <div>
      <PageTitle>🦝 {count} 페이지 🌲</PageTitle>
      <AnimalForm updateMainAnimal={updateMainAnimal} />
      <MainCard
        src={mainAnimal}
        alt="bear"
        handleHeartClick={handleHeartClick}
        choiceFavorite={choiceFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  )
}


