import React from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { ReduxRouter } from 'redux-router';
export default class Root extends React.Component {
    static propTypes = {
        store: React.PropTypes.object.isRequired
    };
    render() {
        return (
            <div>
                <Provider store={this.props.store}>
                    <div>
                        {(!(__PROD__ || window.devToolsExtension)) &&<DevTools/>}
                        <ReduxRouter>
                            {routes}
                        </ReduxRouter>
                    </div>
                </Provider>
            </div>
        );
    }
}
