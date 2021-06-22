import React, { useState } from 'react';
import { auth } from '../../firebase.config';
// import AuthProvider from '../../provider/AuthProvider';
import './Login.scss';


const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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
    const doLogin = () => {
        console.log(email, password);
        auth.signInWithEmailAndPassword(
            email, password
        ).then( user => {
            console.log(user);
        }).catch( err => {
            console.log(err);
        });
    }
    return (
        <div className="login-container">
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default Login;