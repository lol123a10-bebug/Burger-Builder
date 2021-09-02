import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

import classes from "./Auth.module.css";

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: "input",
				elementConfig: {
					name: "email",
					type: "email",
					placeholder: "Mail address",
				},
				value: "",
				validation: {
					required: true,
					isEmail: true,
				},
				valid: false,
				touched: false,
			},
			password: {
				elementType: "input",
				elementConfig: {
					name: "password",
					type: "password",
					placeholder: "Password",
				},
				value: "",
				validation: {
					required: true,
					minLength: 6,
				},
				valid: false,
				touched: false,
			},
		},
		isSignup: false,
	};

	componentDidMount() {
		if (!this.props.isBuilding && this.props.authRedirectPath !== "/") {
			this.props.onSetAuthRedirectPath("/");
		}
	}

	inputChangeHandler = (event, controlName) => {
		const updatedControls = updateObject(this.state.controls, {
			[controlName]: updateObject(this.state.controls[controlName], {
				value: event.target.value,
				valid: checkValidity(
					event.target.value,
					this.state.controls[controlName].validation
				),
				touched: true,
			}),
		});

		this.setState({ controls: updatedControls });
	};

	submitHandler = (event) => {
		event.preventDefault();
		// if (this.state.controls.email.valid && this.state.controls.password.valid) {
		this.props.onAuth(
			this.state.controls.email.value,
			this.state.controls.password.value,
			this.state.isSignup
		);
		// }
	};

	switchAuthModeHandler = () => {
		this.setState((prevState) => {
			return { isSignup: !prevState.isSignup };
		});
	};

	render() {
		const formElementArrays = [];
		for (let key in this.state.controls) {
			formElementArrays.push({
				id: key,
				config: this.state.controls[key],
			});
		}

		const form = formElementArrays.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangeHandler(event, formElement.id)}
			/>
		));

		let errorMessage = null;

		if (this.props.error) {
			errorMessage = (
				<p className={classes.Error}>
					{this.props.error.message.split("_").join(" ").toLowerCase()}
				</p>
			);
		}

		let component = (
			<div className={classes.Auth}>
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button btnType="Success">Submit</Button>
				</form>
				<Button btnType="Danger" clicked={this.switchAuthModeHandler}>
					Switch to {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
				</Button>
			</div>
		);

		if (this.props.loading) {
			component = <Spinner />;
		}

		if (this.props.isAuth) {
			component = <Redirect to={this.props.authRedirectPath} />;
		}

		return component;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath,
		isBuilding: state.burgerBuilder.building,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, isSignup) =>
			dispatch(actions.auth(email, password, isSignup)),
		onSetAuthRedirectPath: (path) =>
			dispatch(actions.setAuthRedirectPath(path)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
