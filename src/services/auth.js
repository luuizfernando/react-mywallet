import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export function useSignUp() {
    const navigate = useNavigate();
    return (body) => {
        axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, body)
            .then(res => {
                alert("Usuário criado com sucesso!");
                navigate("/");
            })
            .catch(err => alert(err.response.data));
    }
};

export function useSignIn() {
    const { setToken, setUserName } = useContext(AuthContext);
    const navigate = useNavigate();
    return (body) => {
        axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body)
            .then(res => {
                setToken(res.data.token);
                setUserName(res.data.userName);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userName", res.data.userName);
                navigate("/home");
            })
            .catch((err) => alert(err.response.data));
    }
};