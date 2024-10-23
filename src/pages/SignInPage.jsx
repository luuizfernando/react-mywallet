import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setToken, setUserName } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, form)
      .then(res => {
        setToken(res.data.token);
        setUserName(res.data.userName);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.userName);
        navigate("/home");
      })
      .catch((err) => alert(err.response.data));
  }

  return (
    <SingInContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input required type="email" autoComplete="username" placeholder="E-mail" name="email" value={form.email} onChange={handleForm} />
        <input required minLength={3} type="password" autoComplete="new-password" placeholder="Senha" name="password" value={form.password} onChange={handleForm} />
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
