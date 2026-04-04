import { useAuth } from '../hooks/useAuth'
import { Link, Navigate } from 'react-router-dom'
import Layout from '../pages/Layout'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'

// const PrivateRoute = () => {
//     const { isAuthorized, me } = useAuth()

//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState('')

//     const auth = async () => {
//         try {
//             await me(setLoading, setError)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         auth()
//     }, [])
//     return loading ?
//         <div>
//             <h1 className='skeleton-text skeleton text-center text-3xl'>Loading . . . . </h1>
//             <div className='flex justify-center py-8'>
//                 <Loading />
//             </div>
//         </div>
//         : isAuthorized ? <Layout /> : <Navigate to={'/login'} />
// }

// export default PrivateRoute





const PrivateRoute = () => {


    const { user, isCheckingAuth, isAuthorized } = useAuth()


    return (
        <div className='min-h-screen'>
            {isCheckingAuth
                ? <Loading /> : isAuthorized
                    ? <Layout /> : <div>
                        <h2>You are not logged in </h2>
                        <div className='card'>
                            <div className='card-body'>
                                <Link className='btn btn-primary' to={'/register'}>Register</Link>
                                <Link className='btn btn-primary' to={'/login'}>Login</Link>
                            </div>
                        </div>
                    </div>}
        </div>
    )
}

export default PrivateRoute