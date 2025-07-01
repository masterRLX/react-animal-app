import './App.css';
import React from 'react';
import PageTitle from './components/PageTitle';
import AnimalForm from './components/AnimalForm';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';

export default App;

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

function App() {
  console.log('** APP 실행 **');
  const animal01 = process.env.PUBLIC_URL + '/img/bear.png';
  const animal02 = process.env.PUBLIC_URL + '/img/elephant.png';
  const animal03 = process.env.PUBLIC_URL + '/img/fox.png';
  const animal04 = process.env.PUBLIC_URL + '/img/rabbit.png';

  const [mainAnimal, setMainAnimal] = React.useState(animal01);
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

  function updateMainAnimal() {
    setMainAnimal(animal02);
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
      <PageTitle>{count} 페이지 🌲</PageTitle>
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


