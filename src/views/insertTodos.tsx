import { useContext, useState } from "react"
import { AuthContext } from "../assets/authContext.tsx"
import { useNavigate } from "react-router-dom"

export default function InsertTodos() {

    const [todoTitle, setTodoTitle] = useState('')
    const [todoDescription, setTodoDescription] = useState('')
    const [errmsg, seterrmsg] = useState('')
    const [err, seterr] = useState(false)
    const [load, setload] = useState(false)
    const { currentUser } = useContext(AuthContext)

    const nav = useNavigate()

    const handlekey = e => {
        e.code === "Enter" && handleSelect()
        seterr(false)
    }

    const handleSelect = async () => {
        try {
            setTimeout(() => {
                setload(true)
                fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: todoTitle,
                    description: todoDescription,
                    status: false,
                    user: currentUser.displayName,
                    id: Math.random().toString().substring(7),
                })
            }).then(() => {
                
                seterrmsg('data inserted successfully')
            })
            }, 1000)
            
        } catch (e) {
            seterr(true)
            seterrmsg('something happened create userroom')
        }
        setload(false)
        seterr(false)
        nav('/')
    }

    return (
        <div >
            <div style={{
                padding: '10px',
            }}>
                {!load ?
                    <>
                        <input value={todoTitle} placeholder="Type ToDo Tite"
                            onChange={e => setTodoTitle(e.target.value)} type="text" style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                color: 'lightgray',
                                borderBottom: '1px solid gray',
                                width: '100%',
                                padding: '10px'
                            }} />
                        <input value={todoDescription} placeholder="Type ToDo Description"
                            onKeyDown={handlekey} onChange={e => setTodoDescription(e.target.value)} type="text" style={{
                                border: 'none',
                                outline: 'none',
                                backgroundColor: 'transparent',
                                borderBottom: '1px solid gray',
                                color: 'lightgray',
                                width: '100%',
                                padding: '10px'
                            }} />
                    </> : <span style={{
                        color: 'green',
                        fontWeight: 'bold',
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginLeft: '7px',
                    }}>Loading...</span>
                }
            </div>
            {err && <span style={{
                color: 'red',
                fontWeight: 'bold',
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                backgroundColor: 'white',
                alignContent: 'center',
                justifyContent: 'center',
                marginLeft: '7px',
            }}>{errmsg}</span>}
        </div>
    )
}