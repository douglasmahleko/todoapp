import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../assets/authContext.tsx'
import axios from "axios";

export default function Todos() {

    const { currentUser, settodoInfo, setedit, setdisplay } = useContext(AuthContext)

    const [todos, settodos] = useState([])
    const [laoding, setloading] = useState(true)

    const handleSelect = (todo) => {
        settodoInfo(todo)
        setdisplay(true)
        setedit(false)
    }

    useEffect(() => {
        setTimeout(() => {
            axios.get(`http://localhost:3000/todos/?user=${currentUser.displayName}`)
                .then(data => {
                    settodos(data.data)
                    setloading(false)
                })
        }, 1000)

    }, [])
    return (
        <div style={{
            padding: '10px',
        }}>
            {
                laoding && <div style={{
                    fontWeight: 'bold',
                    fontSize: '18px',
                    color:'grey',
                    alignContent:'center',
                    justifyContent:'center',
                    textTransform: 'capitalize'
                }}>Loading...</div>
            }
            {
                Object.entries(todos) ? Object.entries(todos).map((todo) => {
                    return (
                        <div key={todo.id} onClick={() => handleSelect(todo[1])} style={{
                            padding: '10px',
                            alignItems: 'center',
                            gap: '10px',
                            color: 'white',
                            cursor: 'pointer',
                            flexDirection: 'row',
                            display: 'flex'
                        }} >
                            <div style={{
                                marginTop: '3px',
                                width: '100%',
                                borderBottom: '1px solid gray',
                                paddingBottom: '5px',
                                paddingLeft: '5px'
                            }}>
                                <span style={{
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    textTransform: 'capitalize'
                                }}>{todo[1] && todo[1].title}</span>
                            </div>
                        </div>
                    )
                }
                ) : (
                    <span>Insert your ToDos list</span>
                )
            }
        </div>
    )
}