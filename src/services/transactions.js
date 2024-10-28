import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useGetTransactions() {
    const [transactions, setTransactions] = useState([]);
    const { token } = useContext(AuthContext);
    const config = { headers: { Authorization: `Bearer: ${token}` } };
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/transactions`, config)
            .then(res => setTransactions(res.data))
            .catch(err => alert(err.response.data));
    }, []);

    return transactions;
}

export function useAddTransaction() {
    const { token } = useContext(AuthContext);
    const config = { headers: { Authorization: `Bearer: ${token}` } };
    const navigate = useNavigate();

    return (body) => {
        axios.post(`${process.env.REACT_APP_API_URL}/transactions`, body, config)
            .then(res => navigate("/home"))
            .catch(err => alert(err.response.data));
    }
}