import Todo from "../views/todo.tsx";
import Sidebar from "../views/sidebar.tsx";

export default function Home() {
    return (
        <div style={{
            backgroundColor:'black',
            height:'100vh',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
            
        }}>
            <div style={{
                border:'1px solid white',
                width:'65%',
                height:'80%',
                borderRadius:'10px',
                display:'flex',
                overflow:'hidden'
        }}>
                <Sidebar />
                <Todo />
            </div>
        </div>
    )
}