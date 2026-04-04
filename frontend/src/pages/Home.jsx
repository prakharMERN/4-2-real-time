
// import { useEffect, useRef, useState } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { SendHorizonalIcon } from 'lucide-react'
// import { api } from '../api/api'
// import { v4 } from 'uuid'

// const Home = () => {
//     const { logout, user, socket, onlineUsers, getUsers } = useAuth()
//     const [users, setUsers] = useState([])
//     const [selectedUser, setSelectedUser] = useState(null)
//     const [messeges, setMesseges] = useState([])
//     const [input, setInput] = useState('')
//     const [unread, setUnread] = useState([{ id: "", count: 0 }])
//     const bottomRef = useRef(null);
//     const selectUserRef = useRef(null)

//     const usersList = async () => {
//         try {
//             const res = await getUsers()
//             setUsers(res)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         usersList()
//     }, [])

//     const handleSelectUser = async (user) => {
//         try {
//             setSelectedUser(user)
//             const res = await api.get(`messeges/${user._id}`)
//             // console.log(res.data.data.messages)
//             setMesseges(res.data.data.messages)
//         } catch (error) {
//             console.log(error)
//             setMesseges([])
//         }
//     }

//     const getTime = (time) => {

//         const date = new Date(time)

//         return (date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7,))
//     }

//     const handleSendMessege = () => {
//         if (input.trim() === '' || selectedUser === null)
//             return
//         socket.emit('send-messege', {
//             senderId: user._id,
//             recieverId: selectedUser._id,
//             text: input
//         })
//         setMesseges(prev => [...prev, {
//             _id: v4(),
//             senderId: user._id,
//             recieverId: selectedUser._id,
//             text: input,
//             createdAt: new Date().toISOString()
//         }])
//         // console.log('sent')
//         setInput('')
//     }



//     useEffect(() => {
//         if (!socket)
//             return

//         socket.on('recieve-messege', data => {
//             // console.log('recieved')
//             // console.log(data)
//             // console.log(selectedUser, data.senderId, typeof (selectedUser._id), selectedUser._id, selectedUser._id.toString())

//             if (selectUserRef.current && data.senderId === selectUserRef.current._id) {
//                 // console.log('done')
//                 // console.log(messeges)
//                 setMesseges(prev => [...prev, data])
//             } else {
//                 // console.log('goes to unread')
//                 setUnread(prev => {
//                     if (prev.some(obj => obj.id === data.senderId)) {
//                         return prev.map(obj => obj.id === data.senderId ? { ...obj, count: obj.count + 1 } : obj)
//                     } else {
//                         return [...prev, { id: data.senderId, count: 1 }]
//                     }
//                 })
//             }
//         })


//         return () => {
//             socket.off('recieve-messege')
//         }
//     }, [socket])



//     useEffect(() => {
//         selectUserRef.current = selectedUser
//     }, [selectedUser])

//     useEffect(() => {
//         // Scroll to the bottom on initial mount and whenever items change
//         bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messeges]);

//     return (
//         <div className='min-h-screen flex flex-col'>
//             <div className='bg-base-200 fixed h-16 top-0 z-20 w-full shadow-lg '>
//                 <nav className='flex flex-row h-full justify-between items-center px-4'>
//                     <div>
//                         <h3 className='text-xl font-semibold italic'>Logo</h3>
//                     </div>
//                     <div className=''>
//                         <button
//                             onClick={logout}
//                             className='btn btn-error'>Logout
//                         </button>
//                     </div>
//                 </nav>
//             </div>

//             <div className='flex-1 pt-16 flex justify-between'>
//                 <div className='bg-base-300 fixed z-20 min-w-50 min-h-full shadow-lg'>
//                     {
//                         users.length > 0 ? <div className=''>
//                             {users.filter(obj => obj._id !== user._id).map(user =>
//                                 <h4 onClick={() => handleSelectUser(user)}
//                                     className='py-2 hover:bg-base-100  px-4 text-start transition-all flex justify-between gap-4 items-center hover:text-lg' key={user._id}>
//                                     <div className='flex justify-start'>
//                                         <div className='h-8 w-8 rounded-full mr-4 bg-white flex flex-col-reverse items-end'>
//                                             {onlineUsers.includes(user._id) && <div className='bg-info h-2 w-2 rounded-full'></div>}
//                                         </div>
//                                         <span>  {user.name}</span>
//                                     </div>
//                                     <div>
//                                         {unread.some(obj => obj.id === user._id) && <div className='h-6 w-6 bg-success rounded-full text-primary-content text-center'>{unread.find(obj => obj.id === user._id).count}</div>}
//                                     </div>
//                                 </h4>)
//                             }
//                         </div> : <h3>No users</h3>
//                     }
//                 </div>

//                 <div className='flex-1 h-full pl-50 w-full flex flex-col '>
//                     <div className='w-full h-full bg-base-100'>
//                         {
//                             selectedUser ?
//                                 <div>
//                                     {
//                                         messeges.length > 0 ?
//                                             <div className='h-[calc(100vh-5.5rem)] pb-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full'>
//                                                 {
//                                                     messeges.map(msg => <div key={msg._id} className={`my-2 px-2 flex ${msg.senderId !== user._id ? "justify-start " : "justify-end"}`}>
//                                                         <div className={`glass rounded-lg py-1 px-4 flex flex-col ${msg.senderId === user._id && "bg-success-content"}`}>
//                                                             <span>{msg.text}</span>
//                                                             <div className='flex flex-row-reverse'>
//                                                                 <span className='text-xs label'>{getTime(msg.createdAt)}</span>
//                                                             </div>
//                                                         </div>
//                                                     </div>)
//                                                 }
//                                                 <div ref={bottomRef}></div>
//                                             </div> :
//                                             <h2>Stat messageing</h2>
//                                     }
//                                 </div> :
//                                 <h2 className='text-2xl text-center font-semibold m-4
//                     '>No user selceted</h2>
//                         }
//                     </div>
//                     <div className='left-0 pl-54 fixed bottom-0 z-0 w-full bg-base-300 py-2'>
//                         <div className='flex-1 max-w-180 mx-auto flex gap-2 items-center justify-between'>
//                             <input
//                                 onKeyDown={e => { e.key === 'Enter' && handleSendMessege() }}
//                                 className='input-primary input flex-1'
//                                 type="text"
//                                 value={input}
//                                 placeholder='enter message'
//                                 onChange={e => setInput(e.target.value)}
//                             />
//                             {/* <textarea
//                                 className='textarea textarea-primary flex-1'
//                                 value={input}
//                                 placeholder='enter message'
//                                 onChange={e => setInput(e.target.value)}>
//                             </textarea> */}
//                             <button onClick={handleSendMessege}>
//                                 <SendHorizonalIcon size={40} className='text-base-content bg-primary p-1 z-40 cursor-pointer rounded-lg' />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     )
// }

// export default Home
























import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { SendHorizonalIcon, SidebarClose, SidebarOpen } from 'lucide-react'
import { api } from '../api/api'
import { v4 } from 'uuid'

const Home = () => {
    const { logout, user, socket, onlineUsers, getUsers } = useAuth()

    const [selectedUser, setSelectedUser] = useState(null)
    const [users, setUsers] = useState([])
    const [messeges, setMesseges] = useState([])
    const [unread, setUnread] = useState([{ id: "", count: 0 }])
    const [input, setInput] = useState('')
    const [sidebar, setSidebar] = useState(true)
    const bottomRef = useRef(null);
    const selectUserRef = useRef(null)
    const themeList = ['light', 'dark', 'dracula', 'nord', 'forest', 'abyss', 'black']
    const [theme, setTheme] = useState('light')

    const usersList = async () => {
        try {
            const res = await getUsers()
            setUsers(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        usersList()
    }, [])

    const handleSelectUser = async (user) => {
        try {
            setSelectedUser(user)
            const res = await api.get(`messeges/${user._id}`)
            // console.log(res.data.data.messages)
            setMesseges(res.data.data.messages)
        } catch (error) {
            console.log(error)
            setMesseges([])
        }
    }

    const getTime = (time) => {

        const date = new Date(time)

        return (date.toLocaleTimeString().slice(0, 4) + date.toLocaleTimeString().slice(7,))
    }

    const handleSendMessege = () => {
        if (input.trim() === '' || selectedUser === null)
            return
        socket.emit('send-messege', {
            senderId: user._id,
            recieverId: selectedUser._id,
            text: input
        })
        setMesseges(prev => [...prev, {
            _id: v4(),
            senderId: user._id,
            recieverId: selectedUser._id,
            text: input,
            createdAt: new Date().toISOString()
        }])
        // console.log('sent')
        setInput('')
    }



    useEffect(() => {
        if (!socket)
            return

        socket.on('recieve-messege', data => {
            // console.log('recieved')
            // console.log(data)
            // console.log(selectedUser, data.senderId, typeof (selectedUser._id), selectedUser._id, selectedUser._id.toString())

            if (selectUserRef.current && data.senderId === selectUserRef.current._id) {
                // console.log('done')
                // console.log(messeges)
                setMesseges(prev => [...prev, data])
            } else {
                // console.log('goes to unread')
                setUnread(prev => {
                    if (prev.some(obj => obj.id === data.senderId)) {
                        return prev.map(obj => obj.id === data.senderId ? { ...obj, count: obj.count + 1 } : obj)
                    } else {
                        return [...prev, { id: data.senderId, count: 1 }]
                    }
                })
            }
        })


        return () => {
            socket.off('recieve-messege')
        }
    }, [socket])



    useEffect(() => {
        selectUserRef.current = selectedUser
    }, [selectedUser])

    useEffect(() => {
        // Scroll to the bottom on initial mount and whenever items change
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messeges]);


    const DropDown = () => {
        return (
            <div className='dropdown '>
                <div tabIndex={0} role="button" className="btn btn-accent">
                    {theme}
                </div>

                <ul className="dropdown-content menu bg-base-100 rounded-box z-10 w-32 p-2 shadow">
                    {themeList.map(theme => <li key={theme}><button onClick={() => setTheme(theme)} >{theme}</button></li>)}
                </ul>
            </div>
        )
    }


    return (
        <div data-theme={theme} className='min-h-screen flex flex-col'>
            <div className='bg-base-200 fixed h-16 top-0 z-20 w-full shadow-lg '>
                <nav className='flex flex-row h-full justify-between items-center px-4'>
                    <div className='flex flex-row items-center gap-2'>
                        {sidebar ?
                            <SidebarClose onClick={() => setSidebar(false)} className='text-primary cursor-pointer md:hidden' /> :
                            <SidebarOpen onClick={() => {
                                setSidebar(true)
                            }} className='text-primary cursor-pointer md:hidden' />}
                        <h3 className='text-xl font-semibold italic'>Logo</h3>
                    </div>
                    <div className='flex gap-2'>
                        <button
                            onClick={logout}
                            className='btn btn-error'>Logout
                        </button>
                        <DropDown />
                    </div>
                </nav>
            </div>

            <div className='flex-1 pt-16 flex md:justify-between'>
                <div className={`bg-base-300 fixed px-4 py-2 transition-all z-20 w-60 lg:w-90 min-h-full shadow-lg ${!sidebar && "hidden"} md:flex`}>
                    <div>
                        {
                            users && users.length > 0 ? <div className=''>
                                {users.filter(obj => obj._id !== user._id).map(user =>
                                    <h4 onClick={() => handleSelectUser(user)}
                                        className={`py-2 ${user._id === selectedUser?._id && "bg-base-100"} hover:bg-base-100  px-4 text-start transition-all flex justify-between gap-4 items-center hover:text-lg`} key={user._id}>
                                        <div className='flex justify-start'>
                                            <div className='h-8 w-8 rounded-full mr-4 bg-white flex flex-col-reverse items-end'>
                                                {onlineUsers.includes(user._id) && <div className='bg-info h-2 w-2 rounded-full'></div>}
                                            </div>
                                            <span>  {user.name}</span>
                                        </div>
                                        <div>
                                            {unread.some(obj => obj.id === user._id) && <div className='h-6 w-6 bg-success rounded-full text-primary-content text-center'>{unread.find(obj => obj.id === user._id).count}</div>}
                                        </div>
                                    </h4>)
                                }
                            </div> : <h3>No users</h3>
                        }
                    </div>
                </div>

                <div className='flex-1 h-full md:pl-60 lg:pl-90 w-full flex flex-col '>
                    <div className='w-full h-full bg-base-100'>
                        {
                            selectedUser ?
                                <div>
                                    {
                                        messeges.length > 0 ?
                                            <div className='h-[calc(100vh-5.5rem)] pb-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full'>
                                                {
                                                    messeges.map(msg => <div key={msg._id} className={`my-2 px-2 flex ${msg.senderId !== user._id ? "justify-start " : "justify-end"}`}>
                                                        <div className={`glass rounded-lg py-1 px-4 flex flex-col ${msg.senderId === user._id && "bg-success-content"}`}>
                                                            <span>{msg.text}</span>
                                                            <div className='flex flex-row-reverse'>
                                                                <span className='text-xs label'>{getTime(msg.createdAt)}</span>
                                                            </div>
                                                        </div>
                                                    </div>)
                                                }
                                                <div ref={bottomRef}></div>
                                            </div> :
                                            <h2>Stat messageing</h2>
                                    }
                                </div> :
                                <h2 className='text-2xl text-center font-semibold m-4
                    '>No user selceted</h2>
                        }
                    </div>
                    <div className='left-0 md:pl-64 fixed bottom-0 z-0 w-full bg-base-300  py-2'>
                        <div className='flex-1 px-4 max-w-120 ml:max-w-180 mx-auto flex gap-2 items-center justify-between'>
                            <input
                                onKeyDown={e => { e.key === 'Enter' && handleSendMessege() }}
                                className='input-primary input flex-1'
                                type="text"
                                value={input}
                                placeholder='enter message'
                                onChange={e => setInput(e.target.value)}
                            />
                            <button onClick={handleSendMessege}>
                                <SendHorizonalIcon size={40} className='text-base-100 bg-primary p-1 z-40 cursor-pointer rounded-lg' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home