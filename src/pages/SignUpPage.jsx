import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from 'axios';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) return alert("As senhas não coincidem");

    delete form.confirmPassword;
    axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, form)
      .then(res => {
        alert("Usuário criado com sucesso!");
        navigate("/");
      })
      .catch(err => console.log(err.response.data));
  }

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input required placeholder="Nome" name="name" value={form.name} onChange={handleForm} />
        <input required type="email" autoComplete="username" placeholder="E-mail" name="email" value={form.email} onChange={handleForm} />
        <input required minLength={3} type="password" autoComplete="new-password" placeholder="Senha" name="password" value={form.password} onChange={handleForm} />
        <input required minLength={3} type="password" autoComplete="new-password" placeholder="Confirme a senha" name="confirmPassword" value={form.confirmPassword} onChange={handleForm} />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
