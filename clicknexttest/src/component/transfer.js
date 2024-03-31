import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Transfer = () => {
    const [transfer, setTransfer] = useState(0);
    const [balance, setBalance] = useState(0);
    const [balance2, setBalance2] = useState(0);
    const [userId, setUserId] = useState();
    const [userId2, setUserId2] = useState();
    const [user, setUser] = useState('');
    const [toUser, setToUser] = useState('');
    const [value, setValue] = useState({
        date_time: '',
        actions: 'transfer',
        amount: 0,
        remain: 0,
        from_user: '',
        user: '',
    });
    const [receive, setReceive] = useState({
        date_time: '',
        actions: 'receive',
        amount: 0,
        remain: 0,
        from_user: '',
        user: '',
    })

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
                        setUser(result.data.name);
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
        try {
        const result2 = await axios.get(`https://localhost:7186/api/Users/byname/` + toUser);
        if (result2.data && result2.data.length > 0) {
            setBalance2(result2.data[0].balance);
            setUserId2(result2.data[0].user_id);
        }
        
        if (transfer <= 0) {
            alert('Amount must be greater than zero.');
            return;
        }
        console.log(user);
        const currentTime = new Date().toISOString();
        const balanceInt = parseInt(balance);
        const transferInt = parseInt(transfer);
        const newBalance2 = result2.data.balance + transferInt;
        const newBalance = balanceInt - transferInt;
        console.log(newBalance2)

        setValue((prevValue) => ({
            ...prevValue,
            date_time: currentTime,
            amount: parseInt(transfer),
            remain: newBalance,
            from_user: toUser,
            user: user
        }));

        setReceive((prevValue) => ({
            ...prevValue,
            date_time: currentTime,
            amount: parseInt(transfer),
            remain: newBalance2,
            from_user: user,
            user: toUser
        }));



        try {
            await axios.post('https://localhost:7186/api/Transfers', value);
            await axios.post('https://localhost:7186/api/Transfers', receive);
            await axios.patch(`https://localhost:7186/api/Users/UpdateBalance/${userId}`, newBalance, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            await axios.patch(`https://localhost:7186/api/Users/UpdateBalance/${result2.data.user_id}`, newBalance2, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log('User balance updated successfully.');
            console.log('New Balance:', newBalance);
            alert('Transfer successful.');
            navigate('/home');
        } catch (error) {
            console.log(value)
            console.error('Error during transfer:', error);
            alert('Transfer failed. Please try again.');
        }}catch{
            alert("User not found")
        }
    };

    const handleTransfer = (value) => {
        setTransfer(value);
    }

    const getUser = (value) => {
        setToUser(value);
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='shadow border p-5' style={{ width: '500px', backgroundColor: 'white' }}>
                <h1>Transfer</h1>
                <form className='p-3 ' style={{ justifyContent: 'center', textAlign: 'center', margin: 'auto' }} onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <input type="text" className="form-control" id="Transfer" placeholder="Enter Money" onChange={(e) => handleTransfer(e.target.value)} name="Money" />
                    </div>
                    <h1>To</h1>
                    <div className="mb-3 mt-3">
                        <input type="text" className="form-control" id="user" placeholder="User" onChange={(e) => getUser(e.target.value)} name="user" />
                    </div>
                    <div>
                        <button className='btn btn-outline-success'>Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Transfer;