import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
	const classes = [styles.Button, styles[props.btnType]];

	if (props.left) {
		classes.push(styles.left);
	}

	return (
		<button
			disabled={props.disabled}
			className={classes.join(" ")}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default Button;
