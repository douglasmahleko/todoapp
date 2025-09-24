import TodosView from "./todosView.tsx";
import EditTodo from "./editTodo.tsx";
import { AuthContext } from "../assets/authContext.tsx";
import { useContext } from "react";

export default function Todo() {

    const { todoInfo, display } = useContext(AuthContext)

    return (
        <div style={{
            flex: 2,
            marginBottom: '40px'
        }}>
            <div style={{
                height: '50px',
                backgroundColor: '#5d5b8d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                color: 'lightgray',

            }}>
                {display && <span style={{
                    textTransform: 'capitalize',
                    fontWeight: 'bold'
                }}>TITLE : {todoInfo.title}</span>}
            </div>
            <TodosView />
            <EditTodo />
        </div>
    )
}