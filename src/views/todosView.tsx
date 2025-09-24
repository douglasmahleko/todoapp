import { useContext } from "react";
import { AuthContext } from "../assets/authContext.tsx";
import TodoView from "./todoView.tsx";

export default function TodosView() {
    const { display } = useContext(AuthContext)
    return (
        <div style={{
            backgroundColor: '#ddddf7',
            padding: '10px',
            height: "79%",
            overflow: 'scroll'
        }}>

            {display && <TodoView />}
        </div>
    )
}