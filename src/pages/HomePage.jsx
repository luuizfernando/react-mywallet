import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useQuickOut } from "../hooks/useQuickOut";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useLogout } from "../services/auth";
import TransactionItem from "../components/TransactionItem/TransactionItem";
import { useGetTransactions } from "../services/transactions";
import { Navigate } from "react-router-dom";

export default function HomePage() {
  const { userName } = useContext(AuthContext);
  const navigate = Navigate();
  const logout = useLogout();
  const transactions = useGetTransactions();
  useQuickOut();

  function calcBalance() {
    const sum = transactions.reduce((acc, cur) => cur.type === "entrada" ? acc + cur.value : acc - cur.value, 0);
    return sum.toFixed(2);
  }
  const balance = transactions && calcBalance();

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {userName}</h1>
        <BiExit onClick={logout} />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((t) => <TransactionItem key={t._id} transaction={t} />)}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? "positivo" : "negativo"}>{balance.toString().replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`