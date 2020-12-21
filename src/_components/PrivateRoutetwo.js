import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const usera = JSON.parse( localStorage.getItem('user')).role


export const PrivateRoutetwo = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
            usera==="Auditor"
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/audit', state: { from: props.location } }} />
    )} />
)
const usera = JSON.parse( localStorage.getItem('user'))
