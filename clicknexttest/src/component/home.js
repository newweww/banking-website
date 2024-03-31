import React, { useEffect, useState } from 'react'
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Home = () => {

    const [balance, setBalance] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getBalance();
    }, [])

    const getBalance = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken.unique_name;
            console.log(user_id)
            try {
                const result = await axios.get(`https://localhost:7186/api/Users/${user_id}`);
                setBalance(result.data.balance);

            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        } else {
            console.error('JWT token not found in local storage');
        }
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <body>
            <div className='container'>
                <div className='shadow m-5 p-5 border' style={{ width: '32%' }}>
                    <div className='balance'>
                        <div className='balance_text'>
                            <h3>Balance</h3>
                            <h1>{balance}</h1>
                        </div>
                    </div>
                    <div>
                        <Link to='/withdraw' className='btn btn-outline-dark btn-withdraw'>Withdraw</Link>
                        <Link to='/transfer' className='btn btn-outline-dark btn-transfer'>Transfer</Link>
                        <Link to='/deposit' className='btn btn-outline-dark btn-deposit'>Deposit</Link>
                    </div>
                    <div>
                        <Link to='/history' className='btn btn-outline-dark btn-history'>History</Link>
                        <Link onClick={handleLogout} className='btn btn-outline-danger btn-logout m-3'>Logout</Link>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Home