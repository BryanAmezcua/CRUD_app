import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...rest }) => {

    let isAuthenticated = sessionStorage.getItem('isAuthenticated') === "true";
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Redirect to="/profile"/>
            } else {
                return <Redirect to="/"/>
            }
        }}>
        </Route>
    );
};

export default ProtectedRoute;