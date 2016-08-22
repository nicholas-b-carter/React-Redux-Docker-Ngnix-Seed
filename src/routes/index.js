import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {App} from 'src/containers';
import {HomeView, LoginView, ProtectedView} from 'src/views';
import {requireAuthentication} from 'src/components/AuthenticatedComponent';

export default(

    <Route path='/' component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
    </Route>

);
