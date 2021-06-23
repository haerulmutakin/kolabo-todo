import React, { useContext } from 'react';
import { AuthContext } from '../../_provider/AuthProvider';
import { auth } from '../../_firebase-conf/firebase.config';

const Core = () => {
    const user = useContext(AuthContext);
    console.log(user);
    const doLogout = (e) => {
        e.preventDefault();
        auth.signOut().then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div>
            <p>Ini adalah core</p>
            <button onClick={doLogout}>Logout</button>
        </div>
    )
}

export default Core;