import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
// initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true
};
const API_URL = `http://localhost:4000/api/v1/transactions`;

// Create global context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	// Actions
	async function getTransactions() {
		try {
			const response = await axios.get(API_URL);
			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: response.data.data
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			await axios.delete(`${API_URL}/${id}`);
			dispatch({
				type: 'DELETE_TRANSACTION',
				payload: id
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error
			});
		}
	}

	async function addTransaction(transaction) {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post(API_URL, transaction, config);
			dispatch({
				type: 'ADD_TRANSACTION',
				payload: res.data.data
			});
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error
			});
		}
	}

	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				deleteTransaction,
				addTransaction,
				getTransactions,
				error: state.error,
				loading: state.loading
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
