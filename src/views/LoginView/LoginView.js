import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as authActions from 'src/modules/auth/actions';
import { reduxForm } from 'redux-form';
//material-ui
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from './style.scss'

const LoginView = class LoginView extends React.Component {
    constructor(props) {
        super(props);
        const redirectRoute = this.props.location.query.next || '/';
        this.state = {
            redirectTo: redirectRoute
        };
    }
    login(e) {
        e.preventDefault();
        return this
            .props
            .login(this.state.redirectTo);
    }
    render() {
        const {
            fields: {
                email,
                password
            },
            handleSubmit
        } = this.props;
        return (
            <Grid id="LoginView">
                <Col>
                    <div className={classNames.Login}>
                        <form name="loginForm" noValidate>
                            <Row
                                center="xs"
                                style={{
                                    marginTop: 40,
                                    marginBottom: 10
                                }}>
                                <span className={classNames.BackgroundLine}>Sign In</span>
                            </Row>
                            <Divider style={{
                                marginTop: 10,
                                marginBottom: 50
                            }}/>
                            <Row>
                                <div>E-mail</div>
                            </Row>
                            <Row>
                                <div className={classNames.Input}>
                                    <div>
                                        <input type="email" {...email}/>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <div>Password</div>
                            </Row>
                            <Row>
                                <div className={classNames.Input}>
                                    <div>
                                        <input type="password" {...password}/>
                                    </div>
                                </div>
                            </Row>
                            <Row center="xs">
                                <RaisedButton
                                    id="signInBtn"
                                    className={classNames.Submit}
                                    onClick={::this.login}
                                    disabled={this.props.isAuthenticating}>
                                    {this.props.isAuthenticating ? 'Signning': 'Sign In'}
                                </RaisedButton>
                            </Row>
                            <Divider
                                style={{
                                    marginTop: 50,
                                    marginBottom: 10
                                }}/>
                            <Row
                                center="xs"
                                style={{
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>
                                <span className={classNames.ForgotPassword}>forgot password</span>
                            </Row>
                        </form>
                    </div>
                </Col>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
});
const mapDispatchToProps = (dispatch) => ({
    login: bindActionCreators(authActions.login, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'auth',
    fields: ['email', 'password']
})(LoginView));
