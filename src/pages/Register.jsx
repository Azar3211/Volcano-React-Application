import React, { useEffect, useState, useContext } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import useNavigation from '../Helper/NavigationHelper';
import { registerUser } from '../Api/apiServices'
import AlertPopUp from '../components/ui-features/alertPopUp';
import alertContext from '../components/ui-features/contextAlerts';


const Register = () => {
    document.title = 'Register'
    const { navigateToLogin } = useNavigation() //This is the function that will navigate to the login page
    const { setAlertMessage } = useContext(alertContext) //This is the function that will set the alert message

    const [showPassword, setShowPassword] = useState(false) //This is the state that will show the password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  //This is the state that will hold the confirm password



    const validateForm = (email, password, confirmPassword) => { //This is the function that will validate the form
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ //This is the regex for the email
        let alert = ''
        let valid = true
        if (email && !emailRegex.test(email)) { //This will check if the email is valid or not using the regex above
            return { valid: false, alert: 'Invalid email' } //This will return an alert if the email is invalid
        } else if (password !== confirmPassword) {
            return { valid: false, alert: 'Passwords do not match' } //This will return an alert if the passwords do not match
        }
        return { valid: true, alert: '' } //This will return an alert if the form is valid 
    }


    const submitForm = async (e) => {
        e.preventDefault(); //This will prevent the default action of the form
        const validateUserInfo = validateForm(email, password, confirmPassword) //This will validate the form using the function above
        setAlertMessage(validateUserInfo.valid ? 'success' : 'error', validateUserInfo.alert) //This will set the alert message based on the validation
        if (!validateUserInfo.valid) { //This will check if the form is valid or not 
            return; //This will return if the form is not valid
        }
        const storeUser = { email, password } //This is the object that will store the user information
        try {
            const { data, status } = await registerUser(storeUser) //This will call the registerUser function from the apiServices
            if (status === 201) {
                setAlertMessage('success', 'Registration Successful') //This will set the alert message to success
                console.log('registered')
                navigate('/user/login')
            } else if (status === 409) {
                setAlertMessage('error', 'User already exists') //This will set the alert message to error if the user already exists
                console.log('User already exists')
            }
            else if (status === 400) {
                setAlertMessage('error', 'Invalid email or password') //This will set the alert message to error if the email or password is invalid
                console.log('Invalid email or password')
            }
        }
        catch (error) {
            setAlertMessage('error', 'Network Error has occured') //This will set the alert message to error if there is a network error
            console.error(error)
        }
    }



    return (
        <div className='registration-form'>
            <div className='form-container-register'>
                <h1 className='register-header'>Register</h1>
                <form onSubmit={submitForm} id='registraion-form'>
                    <div className='form-group-register'>
                        <input type='email' id='email' placeholder='Email...' value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group-register'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Password...' value={password} onChange={e => setPassword(e.target.value)} />
                        <i className="see-pwd" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</i>
                    </div>
                    <div className='form-group-register'>
                        <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Confirm Password...' />
                        <i className="see-pwd" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEye /> : <FaEyeSlash />}</i>
                    </div>
                    <button className='register-btn-register' type='submit' onChange={() => { navigateToLogin }}>Register</button>
                    <p className='account-query'>Already have an account?</p>
                    <button className='login-btn-register' type='button' onClick={navigateToLogin}>Login</button>
                </form>
            </div >
            <div className='alert-container-register'>
                <AlertPopUp />
            </div>
        </div >
    )
}

export default Register