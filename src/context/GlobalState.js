import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
// initial state
const initialState = {
	transactions: [],
	error: null,
	loading: true
};

// Create global context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(AppReducer, initialState);

	// Actions

	async function getTransactions() {
		try {
			const response = await axios.get('/api/v1/transactions');

			dispatch({
				type: 'GET_TRANSACTIONS',
				payload: response.data.data
			});
			console.log('response', response);
		} catch (error) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: error.response.data.error
			});
		}
	}

	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
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
			const res = await axios.post(`/api/v1/transactions`, transaction, config);
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
