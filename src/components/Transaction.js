import React, { useContext } from 'react';
import { format } from 'date-fns';
import { GlobalContext } from '../context/GlobalState';
import { formatter } from '../utils/currency';
export const Transaction = ({ transaction }) => {
	const { deleteTransaction } = useContext(GlobalContext);
	

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
