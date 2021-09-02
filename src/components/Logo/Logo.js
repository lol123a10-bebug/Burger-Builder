import React from "react";

import burgerLogo from "../../assets/images/logo.png";

import styles from "./Logo.module.css";

const Logo = (props) => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default Logo;
