import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Transaction from './Transaction';

export const TransactionList = () => {
	const { transactions, getTransactions } = useContext(GlobalContext);

	useEffect(() => {
		console.log('rendering...')
		getTransactions();
		return () => console.log('unmounting...');
	}, []);
	return (
		<div>
			<h3>History</h3>
			<ul className="list">
				{transactions.map((transaction) => <Transaction key={transaction._id} transaction={transaction} />)}
			</ul>
		</div>
	);
};
export default TransactionList;
