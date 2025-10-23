
import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import { Transaction } from '../types';
import DashboardCard from '../components/DashboardCard';
import CashIcon from '../components/icons/CashIcon';
import TrashIcon from '../components/icons/TrashIcon';

const FinancialLedger: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'Income' | 'Expense'>('Expense');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const storedTransactions = localStorage.getItem('agriSmartTransactions');
        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('agriSmartTransactions', JSON.stringify(transactions));
    }, [transactions]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!description.trim() || !amount || Number(amount) <= 0) {
            alert('Please fill in all fields with valid values.');
            return;
        }
        const newTransaction: Transaction = {
            id: Date.now().toString(),
            date,
            description: description.trim(),
            type,
            amount: Number(amount)
        };
        setTransactions(prev => [newTransaction, ...prev].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setDescription('');
        setAmount('');
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            setTransactions(transactions.filter(t => t.id !== id));
        }
    };
    
    const { totalIncome, totalExpenses, netProfit } = useMemo(() => {
        const totalIncome = transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
        const netProfit = totalIncome - totalExpenses;
        return { totalIncome, totalExpenses, netProfit };
    }, [transactions]);

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Financial Ledger</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
                 <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Total Income</p>
                    <p className="text-2xl font-bold text-green-900">₹{totalIncome.toFixed(2)}</p>
                </div>
                 <div className="bg-red-100 p-4 rounded-lg">
                    <p className="text-sm font-medium text-red-800">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-900">₹{totalExpenses.toFixed(2)}</p>
                </div>
                 <div className={`${netProfit >= 0 ? 'bg-sky-100' : 'bg-orange-100'} p-4 rounded-lg`}>
                    <p className={`text-sm font-medium ${netProfit >= 0 ? 'text-sky-800' : 'text-orange-800'}`}>Net Profit</p>
                    <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-sky-900' : 'text-orange-900'}`}>₹{netProfit.toFixed(2)}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <DashboardCard title="Add Transaction" icon={<CashIcon className="w-6 h-6"/>}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input-field" required/>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (e.g., Sold Wheat)" className="input-field" required/>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₹)" className="input-field" required/>
                        <select value={type} onChange={e => setType(e.target.value as any)} className="input-field">
                            <option value="Expense">Expense</option>
                            <option value="Income">Income</option>
                        </select>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">Add Transaction</button>
                    </form>
                </DashboardCard>
                <div className="lg:col-span-2">
                    <DashboardCard title="Transaction History" icon={<CashIcon className="w-6 h-6"/>}>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {transactions.length > 0 ? transactions.map(t => (
                                <div key={t.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                    <div className={`w-2 h-10 rounded-full mr-4 ${t.type === 'Income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    <div className="flex-grow">
                                        <p className="font-medium text-text-primary">{t.description}</p>
                                        <p className="text-sm text-text-secondary">{new Date(t.date).toLocaleDateString()}</p>
                                    </div>
                                    <p className={`font-bold text-lg ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                                        {t.type === 'Income' ? '+' : '-'}₹{t.amount.toFixed(2)}
                                    </p>
                                    <button onClick={() => handleDelete(t.id)} className="ml-4 text-gray-400 hover:text-red-500"><TrashIcon className="h-5 w-5"/></button>
                                </div>
                            )) : <p className="text-center text-text-secondary py-4">No transactions recorded yet.</p>}
                        </div>
                    </DashboardCard>
                </div>
            </div>
             <style>{`.input-field { display: block; width: 100%; border-radius: 0.375rem; border: 1px solid #d1d5db; box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); padding: 0.5rem 0.75rem; } .input-field:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #0ea5e9; box-shadow: 0 0 0 2px #0ea5e9; }`}</style>
        </div>
    );
};

export default FinancialLedger;
