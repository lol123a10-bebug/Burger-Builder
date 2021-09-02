import React from "react";

import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) => {
	let item = <NavigationItem link="/auth">Authenticate</NavigationItem>;
	if (props.isAuthenticated) {
		item = (
			<React.Fragment>
				<NavigationItem link="/orders">Orders</NavigationItem>
				<NavigationItem link="/logout">Logout</NavigationItem>
			</React.Fragment>
		);
	}
	return (
		<ul className={styles.NavigationItems}>
			<NavigationItem link="/" exact>
				Burger Builder
			</NavigationItem>
			{item}
		</ul>
	);
};

export default NavigationItems;
