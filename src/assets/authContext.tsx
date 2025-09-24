import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState, createContext } from "react"
import { auth } from "../components/firebaseConfig"

export const AuthContext = createContext(null)

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('')
    const [todoInfo, settodoInfo] = useState({})
    const [edit, setedit] = useState(false)
    const [display, setdisplay] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
        return () => {
            unsub()
        }
    }, [])
    
    return(
        <AuthContext.Provider value={{currentUser, settodoInfo, setdisplay, todoInfo, setedit, edit, display}}>
            {children}
        </AuthContext.Provider>
    )
}