import React from "react";
import styles from "./Burger.module.css";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import Scrollbar from "../UI/Scrollbar/Scrollbar";

const burger = (props) => {
  let transformedIngredients = [];

  for (const ingredient in props.ingredients) {
    const item = [...Array(props.ingredients[ingredient])].map((_, i) => {
      return <BurgerIngredient key={ingredient + "_" + i} type={ingredient} />;
    });
    transformedIngredients.push(item);
  }

  // for (const ingredientName in props.ingredients) {
  //   transformedIngredients.push({
  //     name: ingredientName,
  //     amount: props.ingredients[ingredientName],
  //   });
  // }

  // transformedIngredients.map((ig, i) => (
  //   <BurgerIngredient key={ig.name + "_" + i} type={ig.name} />
  // ));

  const sumIng = transformedIngredients.reduce((prevVal, curVal) => {
    // console.log(prevVal, curVal);
    return prevVal.concat(curVal);
  }, []);

  if (sumIng.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={styles.Burger}>
      <Scrollbar>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </Scrollbar>
    </div>
  );
};

export default burger;
