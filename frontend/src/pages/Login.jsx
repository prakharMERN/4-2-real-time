import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const { login, isLoggingIn } = useAuth()

	const navigate = useNavigate()

	const [error, setError] = useState('')
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})

	const handleChange = e => {
		setFormData(prev => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	}

	const handleClick = async () => {
		const res = await login(formData)
		// console.log(res)
		if (res !== true) {
			setError(res)
			return
		}
		setFormData({
			email: "",
			password: ""
		})
		setError('')
		navigate('/')
	}



	return (
		<div className=' min-h-screen flex items-center p-4 bg-base-100'>
			<form onSubmit={e => e.preventDefault()} className='card bg-base-200 w-72  md:w-90 mx-auto shadow-gray-400 shadow-xl'>
				<div className='card-body'>
					<h2 className='card-title text-base-content'>Login</h2>
					<label className='label flex flex-col items-start' htmlFor="email">
						<span className=''>Email</span>
						<input className='input rounded-lg text-base-content font-mono' required placeholder='email' id='email' onChange={handleChange} type="email" name='email' value={formData.email} />
					</label>


					<label className='label flex flex-col items-start' htmlFor="password">
						<span className=''>Password</span>
						<input className='input rounded-lg text-base-content font-mono' required placeholder='password' id='password' onChange={handleChange} type="password" name='password' value={formData.password} />
					</label>

					{error && <p className='text-center'>{error}</p>}

					<p className='text-center'>Doesn't have an account
						{<span
							className='text-primary font-semibold underline px-1 hover:cursor-pointer'
							onClick={() => navigate('/register')}
						>Register
						</span>}
					</p>

					<div className='card-actions justify-end mt-4'>
						<button type="submit" className={`btn btn-primary`} disabled={isLoggingIn} onClick={handleClick}>{isLoggingIn ? <Loading /> : 'Login'}</button>
					</div>
				</div>
			</form>

		</div>
	)
}

export default Login