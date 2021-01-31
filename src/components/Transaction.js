import React, { useContext } from 'react';
import { format } from 'date-fns';
import { GlobalContext } from '../context/GlobalState';
export const Transaction = ({ transaction }) => {
	const sign = transaction.amount < 0 ? '-' : '+';
	const { deleteTransaction } = useContext(GlobalContext);
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	})

	return (
		<li className={transaction.amount < 0 ? 'minus' : 'plus'}>
			{transaction.text}{' '}
			<span>
				{formatter.format(transaction.amount)}
				</span>{' '}
			<span>Created {format(new Date(transaction.createAt), 'MMM dd')}</span>
			<button className="delete-button" onClick={() => deleteTransaction(transaction._id)}>
				x
			</button>
		</li>
	);
};
export default Transaction;
