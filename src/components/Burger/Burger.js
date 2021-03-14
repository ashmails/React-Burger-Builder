
import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.module.css";

const burger = ( props ) => {

  let transformedIngredients = Object.keys( props.ingredients )
  .map(igkey => [...Array(props.ingredients[igkey])]
  .map((_,index) => <BurgerIngredient type={igkey} key={igkey + index}/>))
  .reduce((arr, el)=>{
    return arr.concat(el);
},[]);
 
 if(transformedIngredients.length === 0){
    transformedIngredients = <p>Please add some Ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;

