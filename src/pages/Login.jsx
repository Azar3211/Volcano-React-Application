import React, { useEffect, useState, useRef, createContext, useContext } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../Contexts/UserContext';
import useNavigation from '../Helper/NavigationHelper';
import { loginUser } from '../Api/apiServices';
import AlertPopUp from '../components/ui-features/alertPopUp'
import alertContext from '../components/ui-features/contextAlerts';


const Login = () => {
    document.title = 'Login'
    const { setAlertMessage } = useContext(alertContext) //This is the function that will set the alert message
    const { navigateToRegister, navigateToHome } = useNavigation() //This is the function that will navigate to the register page

    const { login } = useAuth() //This is the function that will login the user



    const [email, setEmail] = useState('') //This is the state that will hold the email
    const [password, setPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)



    const loginNow = async (e) => {
        e.preventDefault()
        const credentials = { email, password } //This is the object that will hold the credentials
        try {
            const { data, status } = await loginUser(credentials) //This will call the loginUser function from the apiServices
            if (status === 200) {
                setAlertMessage('success', 'Login successful')
                console.log(setAlertMessage.message)
                login(data)
                localStorage.setItem('email', email)
            }
            else if (status === 401) {
                setAlertMessage('error', 'Login failed, incorrect password or email')
                console.log(setAlertMessage.message)
            }
            else if (status === 400) {
                setAlertMessage('error', 'Invalid email or password')
                console.log(setAlertMessage)
            }
        } catch (error) {
            console.error(error)
            setAlertMessage('error', 'Something went wrong, please try again later')
        }

    };







    return (
        <div>

            <div className='login-header-container'>
                <form onSubmit={loginNow} className='form-container'>
                    <h1 className='login-header'>Login</h1>
                    <div className='form-group'>
                        <input type='email' id='email' onChange={e => setEmail(e.target.value)} value={email} placeholder='Email...' className='EmailInput' />
                    </div>
                    <div className='form-group'>
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} id='password' className='PasswordInput' placeholder='Password...' />
                        <i className="see-pwd" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</i>
                    </div>
                    <div className='button-group'>
                        <button className='login-btn' type='submit'>Login</button>
                        <p className='account-query'>Don't have an account?</p>
                        <button className='register-btn' type='button' onClick={navigateToRegister}>Register</button>
                    </div>
                </form>
                <AlertPopUp />
            </div>


        </div >
    )
}

export default Login