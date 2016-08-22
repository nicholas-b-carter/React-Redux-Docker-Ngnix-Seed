import React from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from './style.scss';
class ProtectedView extends React.Component {
    render() {
        const { dispatch } = this.props;
        return (
            <Grid fluid={true} className={classNames.Video} id="ProtectedView">
                <Col>
                    <Row center="xs" className={classNames.PageTitle}>
                        <h1>React Redux Seed</h1>
                    </Row>

                    <Row center="xs" className={classNames.PageTitle}>
                        <div>
                            Protected View
                        </div>
                    </Row>

                </Col>
            </Grid>
        );
    }
}
const mapStateToProps = (state) => ({ isAuthenticated: state.auth.isAuthenticated });
export default connect(mapStateToProps)(ProtectedView);
