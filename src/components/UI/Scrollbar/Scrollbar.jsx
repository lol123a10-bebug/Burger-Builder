import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import classes from './Scrollbar.module.css';

const Scrollbar = (props) => (
  <Scrollbars
    style={{ width: "100%", height: "100%" }}
    autoHide
    renderThumbVertical={(props) => (
      <div {...props} className={classes.Scrollbar} />
    )}
  >
    {props.children}
  </Scrollbars>
);


export default Scrollbar;