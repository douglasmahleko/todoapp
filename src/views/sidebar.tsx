import Todos from "./todos.tsx";
import Navbar from "./navbar.tsx";
import InsertTodos from "./insertTodos.tsx";

export default function Sidebar() {
    return (
        <div style={{
            flex: 1,
            backgroundColor: '#3e3c61',
        }}>
            <Navbar />
            <InsertTodos />
            <Todos />
        </div>
    )
}