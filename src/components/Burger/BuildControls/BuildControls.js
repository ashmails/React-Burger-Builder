import classes from "./BuildControls.module.css";
import React from "react";
import BuildControl from "./BuildControl/BuildControl";

const builderControls = ( props ) => {
  const controls = [
    { label: "salad", type: "salad" },
    { label: "cheese", type: "cheese" },
    { label: "bacon", type: "bacon" },
    { label: "meat", type: "meat" },
  ];

  return (
    <div className={classes.BuildControls}>
    <div>Total Price : <strong>{props.price.toFixed(2)}</strong></div>    
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => props.addIngredient(ctrl.type)}
          remove={() => props.removeIngredient(ctrl.type)}
          disabled = {props.disabled[ctrl.type]}
        ></BuildControl>
      ))}
      <button onClick={props.ordered} 
         className={classes.OrderButton}
         disabled={!props.purchasable}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
  );
};

export default builderControls;
