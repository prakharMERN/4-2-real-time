import { createContext, useEffect, useState } from "react";
import { api } from "../api/api"
import { io } from 'socket.io-client'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [isCheckingAuth, setIsCheckingAuth] = useState(true)
    const [user, setUser] = useState(null)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [socket, setSocket] = useState(null)
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])

    const register = async (data) => {
        try {
            setIsRegistering(true)
            const result = await api.post('/users/register', data)
            const res = result.data
            if (res?.data && res.data?.user) {
                setUser(res.data.user)
                setIsAuthorized(true)
                return true
            }
            setIsRegistering(false)
            return false
        } catch (error) {
            setIsAuthorized(false)
            setIsRegistering(false)
            return error?.response?.data?.message
        }
    }

    const login = async (data) => {
        try {
            setIsLoggingIn(true)
            const result = await api.post('/users/login', data)
            const res = result.data
            if (res?.data && res.data?.user) {
                setUser(res.data.user)
                setIsAuthorized(true)
                setIsLoggingIn(false)
                return true
            }
            setIsLoggingIn(false)
            return false
        } catch (error) {
            setIsAuthorized(false)
            setIsLoggingIn(false)
            return error?.response?.data?.message
        }
    }

    const logout = async () => {
        try {
            const result = await api.post('/users/logout')
            const res = result.data
            if (res?.success) {
                setUser(null)
                setIsAuthorized(false)
                if (socket) {
                    socket?.disconnect()
                }
                // toast.success('logged out')
            }
        } catch (error) {
            console.log('some error occured', error?.response?.data?.message)
        }
    }

    const auth = async () => {
        try {
            const result = await api.get('/users/auth')
            const res = result.data
            if (res?.data && res.data?.user) {
                setUser(res.data.user)
                setIsAuthorized(true)
                setIsCheckingAuth(false)
                // return res.data.user
                connectSoket()
            }
            return null
        } catch (error) {
            console.log(error?.response?.data)
            setIsCheckingAuth(false)
        }
    }

    const connectSoket = () => {
        try {
            const socket = io('http://localhost:3000', {
                withCredentials: true
            })
            setSocket(socket)

            socket.on('connect', () => {
                console.log('connected')
                setIsSocketConnected(true)
            })

            socket.on('users-list', data => {
                setOnlineUsers(data)
            })


            // socket.on('recieve-messege', data => {
            //     console.log('recieved')
            //     console.log(data)
            // })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        auth()

        return () => {
            if (socket) {
                socket.disconnect()
                socket(null)
                setIsSocketConnected(false)
                socket.off('users-list')
                socket.off('recieve-messege')
            }
        }
    }, [])

    const getUsers = async () => {
        try {
            const result = await api.get('/users/users')
            const res = result.data
            if (res) {
                return res?.data
            }
        } catch (error) {
            return null
        }
    }

    return <AuthContext.Provider value={{ login, logout, register, user, socket, isCheckingAuth, onlineUsers, isAuthorized, isLoggingIn, isRegistering, getUsers }}>
        {children}
    </AuthContext.Provider>
}