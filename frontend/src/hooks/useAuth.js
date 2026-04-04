import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export const useAuth = () => {

    const context = useContext(AuthContext)
    
    // console.log(context)
    
    if (!context) {
        return new Error('useAuth cant be used outside AuthProvider')
    }

    return context
}