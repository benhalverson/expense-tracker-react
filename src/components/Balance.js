import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
export const Balance = () => {
	const { transactions } = useContext(GlobalContext);

	const total = transactions
		.map((transaction) => transaction.amount)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	return (
		<div>
			<h4>Your Balance</h4>
			<h5>${total}</h5>
		</div>
	);
};
export default Balance;
