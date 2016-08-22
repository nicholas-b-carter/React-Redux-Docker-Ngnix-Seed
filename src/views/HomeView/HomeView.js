import React from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from './style.scss';
class HomeView extends React.Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Grid fluid={true} className={classNames.Video} id="HomeView">
                <Col>
                    <Row center="xs" className={classNames.PageTitle}>
                        <h1>React Redux Seed</h1>
                    </Row>

                    <Row center="xs" className={classNames.PageTitle}>
                        <div>
                              <span>React</span>
                              <span>  |   Redux</span>
                              <span>  |   Router</span>
                              <span>  |   Auth</span>
                              <span>  |   Socket</span>
                              <span>  |   Ajax</span>
                              <span>  |   Docker</span>
                              <span>  |   Ngnix</span>
                              <span>  |   Material-UI</span>
                              <span>  |   Webpack</span>
                              <span>  |   Selenium</span>
                              <span>  |   Mocha</span>
                              <span>  |   Karma</span>
                        </div>
                    </Row>
                    <Row center="xs" >

                      <RaisedButton
                        id="loginBtn"
                        className={classNames.Buttons}
                        onClick={() => {
                          dispatch(push( `/login`));
                        }}>
                        Login
                      </RaisedButton>

                      <RaisedButton
                        id="loginBtn"
                        className={classNames.Buttons}
                        onClick={() => {
                          dispatch(push( `/protected`));
                        }}>
                      Protected
                      </RaisedButton>

                    </Row>
                </Col>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
export default connect(mapStateToProps)(HomeView);
