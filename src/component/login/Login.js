import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { ButtonGroup, Button, Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import { auth } from '../../_firebase-conf/firebase.config';
import { AuthContext } from '../../_provider/AuthProvider';
import './Login.scss';


const Login = ({history}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const user = useContext(AuthContext);

    // const user = useContext(AuthProvider);
    // console.log('ini user', user);

    // const doRegister = () => {
    //     console.log(email, password);
    //     auth.createUserWithEmailAndPassword(
    //         email, password
    //     ).then( user => {
    //         console.log(user);
    //     }).catch( err => {
    //         console.log(err);
    //     });
    // }
    const doLogin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            email, password
        ).then( auth => {
            history.push('/');
        }).catch( err => {
            console.log(err);
        });
    }

    if (user) {
        return <Redirect to={'/'} />
    }
    return (
        <div className="login-container">
            <h2>Kolabo Todo App</h2>
            <Form fluid className="login-box">
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl name="email" type="email" onChange={setEmail}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <FormControl name="password" type="password" onChange={setPassword}/>
                </FormGroup>
                <FormGroup>
                <ButtonGroup justified>
                    <Button type="submit" appearance="primary" onClick={doLogin}>Sign In</Button>
                </ButtonGroup>
                </FormGroup>
            </Form>
            <p>Don't have account? Sign Up</p>
        </div>
    )
}

export default Login;