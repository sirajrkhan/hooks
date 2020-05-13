import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://burger-hook.firebaseio.com/ingredients.json')
    .then( response => {
      return response.json();
    })
    .then( responseData => {
      // console.log('Data Response: ',responseData)  
      const loadedIngred = [];
      for (const key in responseData){
        loadedIngred.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngred);
    })
  },[]);

  const addIngredientHandler = ingredient => {
    fetch('https://burger-hook.firebaseio.com/ingredients.json',
    {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    })
    .then( response => {
      return response.json();
    })
    .then( responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        {id: responseData.name, ...ingredient}
      ]);
    })
  };

  const removeIngredaHandler = (ingredID) => {
    let revisedArr = userIngredients.filter(
      ing => (ing['id'] !== ingredID)
     )
     setUserIngredients(revisedArr)
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={(ID) => removeIngredaHandler(ID)} />
      </section>
    </div>
  );
};

export default Ingredients;
