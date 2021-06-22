import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const RouteGuard = ({component: RouteComponent, ...rest}) => {
    const user = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            render = {props => {
                if (user) {
                    return <RouteComponent {...props} />
                } else {
                    <Redirect to={'/login'} />
                }
            }}
        />
    )
}

export default RouteGuard;