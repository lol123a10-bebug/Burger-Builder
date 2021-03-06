import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (order) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		order: order,
	};
};

export const purchaseBurgerFail = (error) => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START,
	};
};

export const purchaseBurger = (orderData, token) => {
	return (dispatch) => {
		dispatch(purchaseBurgerStart());
		axios
			.post("/orders.json?auth=" + token, orderData)
			.then((response) => {
				dispatch(purchaseBurgerSuccess());
			})
			.catch((error) => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT,
	};
};

export const fetchOrdersSuccess = (orders) => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders,
	};
};
export const fetchOrdersFail = (error) => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error,
	};
};
export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START,
	};
};

export const fetchOrders = (token, userId) => {
	return (dispatch) => {
		dispatch(fetchOrdersStart());
		const queryParams =
			"?auth=" + token + `&orderBy="userId"&equalTo="${userId}"`;
		axios
			.get("/orders.json" + queryParams)
			.then((response) => {
				let fetchedData = [];
				for (const key in response.data) {
					fetchedData.push({ ...response.data[key], id: key });
				}
				dispatch(fetchOrdersSuccess(fetchedData));
			})
			.catch((error) => dispatch(fetchOrdersFail(error)));
	};
};
