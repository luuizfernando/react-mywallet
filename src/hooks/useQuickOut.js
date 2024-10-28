import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

export function useQuickOut() {
    const { userName, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || !userName) {
            navigate("/");
        }
    }, []);
}