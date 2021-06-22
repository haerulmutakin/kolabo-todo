import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const Core = () => {
    const user = useContext(AuthContext);
    console.log(user);
    return (
        <div>Ini adalah core</div>
    )
}

export default Core;