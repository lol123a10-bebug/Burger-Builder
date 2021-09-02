import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  const closeNav = (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
      props.closed();
    }
  };

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={closeNav}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems
            clicked={props.closed}
            isAuthenticated={props.isAuth}
          />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
