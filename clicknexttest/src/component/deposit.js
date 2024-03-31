import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Deposit = () => {
    const [deposit, setDeposit] = useState(0);
    const [balance, setBalance] = useState(0);
    const [userId, setUserId] = useState();
    const [value, setValue] = useState({
        date_time: '',
        action: 'deposit',
        amount: 0,
        remain: 0,
        user_id: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            const token = localStorage.getItem('token');

            if (token) {
                const decodedToken = jwtDecode(token);
                const user_id = decodedToken.unique_name;
                setUserId(user_id);

                try {
                    const result = await axios.get(`https://localhost:7186/api/Users/${user_id}`);
                        setBalance(result.data.balance);
                        setValue((prevValue) => ({
                            ...prevValue,
                            amount: 0,
                            remain: result.data.balance,
                        }));
                } catch (error) {
                    console.error('Error fetching balance:', error);
                }
            } else {
                console.error('JWT token not found in local storage');
            }
        };

        fetchBalance();
    }, [userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (deposit <= 0) {
            alert('Amount must be greater than zero.');
            return;
        }

        const currentTime = new Date().toISOString();


        const balanceInt = parseInt(balance);
        const depositInt = parseInt(deposit);
        const newBalance = balanceInt + depositInt;
        console.log(newBalance);

        setValue((prevValue) => ({
            ...prevValue,
            date_time: currentTime,
            amount: deposit,
            remain: newBalance,
            user_id: userId,
        }));

        console.log(value);
        try {
            await axios.post('https://localhost:7186/api/Transactions', value);
            await axios.patch(`https://localhost:7186/api/Users/UpdateBalance/${userId}`, newBalance, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        
            console.log('User balance updated successfully.');
            console.log('New Balance:', newBalance);
            alert('Deposit successful.');
            navigate('/home');
        } catch (error) {
            console.error('Error during deposit:', error);
            alert('Deposit failed. Please try again.');
        }
    };

    const handleDeposit = (value) => {
        setDeposit(value);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='shadow border p-5' style={{ width: '500px', backgroundColor: 'white' }}>
                <h1>Deposit</h1>
                <form className=' p-3 ' style={{ justifyContent: 'center', textAlign: 'center', margin: 'auto' }} onSubmit={handleSubmit}>
                    <div class="mb-3 mt-3 ">
                        <input type="text" class="form-control" id="deposit" placeholder="Enter Money" onChange={(e) => handleDeposit(e.target.value)} name="Money" />
                    </div>
                    <div>
                        <button className='btn btn-outline-success'>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Deposit;
