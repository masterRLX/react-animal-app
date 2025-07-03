const jsonLocalStorage = {
  setItem: (key, value) => {

    localStorage.setItem("count", JSON.stringify(value))
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key))
  },
};

export default jsonLocalStorage
