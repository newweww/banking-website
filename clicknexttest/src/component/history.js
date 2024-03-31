import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const History = () => {
  const [transfer, setTransfer] = useState([]);
  const [receive, setReceive] = useState([]);
  const [name, setName] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('transactions');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = jwtDecode(token);
        const user_id = decodedToken.unique_name;

        try {
          const usernameResponse = await axios.get(`https://localhost:7186/api/Users/${user_id}`);
          setName(usernameResponse.data.name);

          const response = await axios.get(`https://localhost:7186/api/Transactions/user/${user_id}`);
          setTransactions(response.data);
          console.log(transactions);

          try {
            const response2 = await axios.get(`https://localhost:7186/api/Transfers/user/${name}/transfer`);
            setTransfer(response2.data);
          } catch (error) {
            console.error('Error fetching transfer data:', error);
            setTransfer([]);
          }

          try {
            const response3 = await axios.get(`https://localhost:7186/api/Transfers/user/${name}/receive`);
            setReceive(response3.data);
          } catch (error) {
            console.error('Error fetching receive data:', error);
            setReceive([]);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }

      }
    };

    fetchTransactions();
  }, [name]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div>
        <div>
          <h1>History</h1>
        </div>
        <div>
          <button className='btn btn-outline-dark m-2' onClick={() => handleTabClick('transactions')}>Transaction</button>
          <button className='btn btn-outline-dark m-2' onClick={() => handleTabClick('transfer')}>Transfer</button>
          <button className='btn btn-outline-dark m-2' onClick={() => handleTabClick('receive')}>Receive</button>
        </div>
        <div>
          {activeTab === 'transactions' && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date time</th>
                  <th scope="col">Action</th>
                  <th scope="col">Remain</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{transaction.date_time}</td>
                      <td>{transaction.action}</td>
                      <td>{transaction.remain}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {activeTab === 'transfer' && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date time</th>
                  <th scope="col">User</th>
                  <th scope="col">Remain</th>
                  <th scope="col">Action</th>
                  <th scope="col">To</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transfer.length > 0 ? (
                  transfer.map((transferItem, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{transferItem.date_time}</td>
                      <td>{transferItem.user}</td>
                      <td>{transferItem.remain}</td>
                      <td>{transferItem.actions}</td>
                      <td>{transferItem.from_user}</td>
                      <td>{transferItem.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {activeTab === 'receive' && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date time</th>
                  <th scope="col">User</th>
                  <th scope="col">Remain</th>
                  <th scope="col">Action</th>
                  <th scope="col">From</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receive.length > 0 ? (
                  receive.map((receiveItem, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{receiveItem.date_time}</td>
                      <td>{receiveItem.user}</td>
                      <td>{receiveItem.remain}</td>
                      <td>{receiveItem.actions}</td>
                      <td>{receiveItem.from_user}</td>
                      <td>{receiveItem.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
