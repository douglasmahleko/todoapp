import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../assets/authContext.tsx";
import { useNavigate } from "react-router-dom";

export default function EditTodo() {

    const [load, setload] = useState(false)
    const [err, seterr] = useState(false)
    const { currentUser, todoInfo, edit, setedit } = useContext(AuthContext)
    const [text, settext] = useState('')
    const [errmsg, seterrmsg] = useState('')
    const nav = useNavigate()

    useEffect(() => {
        if (edit) {
            settext(todoInfo.description)
        } else {
            settext('')
        }
    }, [edit, todoInfo])
    const handleSelect = async () => {
        try {
            setTimeout(() => {
                setload(true)
                fetch("http://localhost:3000/todos/"+todoInfo.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: todoInfo.title,
                    description: text,
                    status: todoInfo.status,
                    user: currentUser.displayName,
                    id: todoInfo.id,
                })
            }).then(() => {
                seterrmsg('data edited successfully')
                
            })
            }, 1000)
            
        } catch (e) {
            seterr(true)
            seterrmsg('something happened create userroom')
        }
        setload(false)
        seterr(false)
        settext('')
        setedit(false)
        nav('/')
    }
    return (
        <>
            <div style={{
                height: "60px",
                backgroundColor: 'white',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
            }}>
                {edit && <input placeholder="Edit to do description" value={text} onChange={e => settext(e.target.value)} type="text" style={{
                    width: '80%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '18px',
                    color: '#2f2d52',
                    cursor: 'pointer',
                    marginBottom: '30px'
                }} />}
                {edit && <div style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    marginBottom: '30px'
                }}>
                    {!load ? <button onClick={() => handleSelect()} style={{
                        cursor: 'pointer',
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '10px 15px',
                        backgroundColor: '#7b96ec',
                        color: 'white'
                    }}>Edit</button> : <button disabled style={{
                        cursor: 'pointer',
                        border: 'none',
                        fontWeight: 'bold',
                        padding: '10px 15px',
                        backgroundColor: '#7b96ec',
                        color: 'white'
                    }}>Loading...</button>}
                </div>}
            </div>
        </>

    )
}