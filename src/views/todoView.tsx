import { useContext, useEffect, useRef, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { AuthContext } from '../assets/authContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function TodoView() {

    const { currentUser, setedit, todoInfo } = useContext(AuthContext)
    const [load, setload] = useState(false)
    const [load1, setload1] = useState(false)
    const [err, seterr] = useState(false)
    const [errmsg, seterrmsg] = useState('')
    const nav = useNavigate()

    const ref = useRef()

    const handleDelete = () => {
        setload1(true)
        try {
            fetch('http://localhost:3000/todos/'+todoInfo.id, {
                method: 'DELETE',
            }).then(() => seterrmsg('data inserted successfully'))
        } catch (e) {
            seterr(true)
            seterrmsg('something happened create userroom')
        }
        setload1(false)
        seterr(false)
        setedit(false)
        nav('/')
    }

    const handleComplete = () => {
        setload(true)
        try {
            fetch('http://localhost:3000/todos/'+todoInfo.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: todoInfo.title,
                    description: todoInfo.description,
                    status: true,
                    user:currentUser.displayName,
                    id: todoInfo.id,
                })
            }).then(() => seterrmsg('data inserted successfully'))
        } catch (e) {
            seterr(true)
            seterrmsg('something happened create userroom')
        }
        setload(false)
        seterr(false)
        setedit(false)
        nav('/')
    }

    useEffect(() => {
        ref.current?.scrollIntoView({ behaviour: 'smooth' })
    }, [todoInfo.status])

    return (
        <div style={{
            display: 'flex',
            gap: '5px',
            marginBottom: '5px',
            justifyContent: 'space-between'
        }}>

            <div style={{
                display: 'flex',
                color: 'black',
                fontWeight: '500',
                flexDirection: 'row',
                gap: '5px'
            }}>
                <div style={{
                    width: '200PX',
                    height: '75px',
                    objectFit: 'cover',
                    backgroundColor: 'black',
                    alignContent: 'center',
                    justifyContent: 'center',
                    paddingLeft: '10px',
                    display: 'block'
                }} >{todoInfo.status ? (
                    <span style={{
                        color: 'white',
                        maxWidth: 'max-content',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        justifyContent: 'center',
                        display: 'block'
                    }}>Status: Completed</span>
                ) : (
                    <span style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        maxWidth: 'max-content',
                        justifyContent: 'center',
                        display: 'block'
                    }}>Status : Incomplete</span>
                )}
                    {!todoInfo.status && <div style={{
                        marginTop: '5px',
                        flexDirection: 'row',
                        display: 'flex',
                        marginBottom: '20px'
                    }}>
                        <CiEdit size={25} color='green' onClick={() => setedit(true)} style={{
                            paddingLeft: '5px',
                            marginRight: '20px',
                            cursor: 'pointer',
                        }} />
                        {!load1 ? <MdDeleteForever size={25} color='red' onClick={() => handleDelete()} style={{
                            marginLeft: '30px',
                            cursor: 'pointer',
                        }} /> : <span style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'capitalize',
                            maxWidth: 'max-content',
                            justifyContent: 'center',
                            display: 'block'
                        }}>Loading....</span>}
                    </div>}
                </div>
                <p style={{
                    padding: '10px 10px',
                    borderRadius: '0px 10px 10px 10px',
                    maxWidth: 'max-content',
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#5d5b8d'
                }} ><span style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    justifyContent: 'center',
                }}>Description {!todoInfo.status && !load? <button onClick={() => handleComplete()} style={{
                    color: 'white',
                    backgroundColor: '#3e3c61',
                    fontSize: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '20px'
                }}>Complete</button> : !todoInfo.status &&  <button disabled style={{
                    color: 'white',
                    backgroundColor: '#3e3c61',
                    fontSize: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    borderRadius: '20px'
                }}>Loading...</button> } : </span><br />{todoInfo.description}</p>
            </div>
        </div>
    )
}