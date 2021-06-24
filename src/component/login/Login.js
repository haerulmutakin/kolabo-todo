import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel, Alert } from 'rsuite';
import { auth } from '../../_firebase-conf/firebase.config';
import { AuthContext } from '../../_provider/AuthProvider';
import './Login.scss';


const Login = ({history}) => {
    const [email, setEmail] = useState(null);
    const [ signinMode, setSigninMode ] = useState(true);
    const [password, setPassword] = useState(null);
    const user = useContext(AuthContext);

    const doRegister = () => {
        console.log(email, password);
        auth.createUserWithEmailAndPassword(
            email, password
        ).catch( err => {
            Alert.error(err.message)
        });
    }
    const doLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            email, password
        ).then(() => {
            history.push('/');
        }).catch( err => {
            Alert.error(err.message)
        });
    }

    const handleSignMode = () => {
        const mode = signinMode;
        setSigninMode(!mode);
    }

    if (user) {
        return <Redirect to={'/'} />
    }
    return (
        <div className="login-container">
            <h2 className="login-title">TODO</h2>
            <Form fluid className="login-box">
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl placeholder="Enter email" name="email" type="email" onChange={setEmail}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl placeholder="Enter password" name="password" type="password" onChange={setPassword}/>
                </FormGroup>
                <FormGroup>
                <ButtonGroup justified>
                    <Button type="submit" appearance="primary" onClick={signinMode ? doLogin : doRegister}>{signinMode ? ' Sign In' : ' Sign Up'}</Button>
                </ButtonGroup>
                </FormGroup>
                <p className="signup-label">
                    {signinMode ? `Don't` : `Already`} have account? 
                    <span onClick={handleSignMode}>{signinMode ? ' Sign Up' : ' Sign In'}</span>
                </p>
            </Form>
        </div>
    )
}

export default Login;