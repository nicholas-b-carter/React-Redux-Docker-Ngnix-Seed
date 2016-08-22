import React from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router';
import { persistStore, autoRehydrate } from 'redux-persist'
import immutableTransform from 'redux-persist-transform-immutable'
import Spinner from 'react-spinkit';

export function requireAuthentication( Component ) {
    class AuthenticatedComponent extends React.Component {
        // componentWillMount() {
        //     this.checkAuth();
        // }
        // componentWillReceiveProps( nextProps ) {
        //     this.checkAuth();
        // }
        checkAuth() {
            const { auth, rehydrated } = this.props;
            if( !rehydrated ) {
                return( <Spinner spinnerName='three-bounce'/> )
            }
            if( !auth.get( 'isAuthenticated' ) ) {
                const redirectAfterLogin = this.props.location.pathname;
                this
                    .props
                    .dispatch( push( `/login?next=${redirectAfterLogin}` ) );
                return( <Spinner spinnerName='three-bounce'/> )

            }
            return( <Component {...this.props}/> );
        }
        render() {
            return( this.checkAuth() )
        }
    }
    const mapStateToProps = ( state ) => ( {
        auth: state.auth,
        rehydrated: state.root.get( 'rehydrated' )
    } );
    return connect( mapStateToProps )( AuthenticatedComponent );
}
