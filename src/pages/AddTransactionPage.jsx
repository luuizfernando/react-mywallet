import styled from "styled-components"
import { useQuickOut } from "../hooks/useQuickOut"
import { useParams } from "react-router-dom";
import useForm from "../hooks/useForm"
import { useAddTransaction } from "../services/transactions";

export default function AddTransactionsPage() {
  const { form, handleForm } = useForm({ description: "", value: "" })
  const { tipo } = useParams();
  const typeText = tipo === "entrada" ? "Entrada" : "Saída";
  const addTransaction = useAddTransaction();
  useQuickOut();

  function submitForm(e) {
    e.preventDefault();
    const body = { ...form, tipo: tipo === "entrada" ? "entrada" : "saida" };
    addTransaction(body);
  }

  return (
    <TransactionsContainer>
      <h1>Nova {typeText}</h1>
      <form onSubmit={submitForm}>
        <input required type="number" placeholder="Valor" name="value" value={form.value} onChange={handleForm} />
        <input required placeholder="Descrição" name="description" value={form.description} onChange={handleForm} />
        <button type="submit">Salvar {typeText}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
