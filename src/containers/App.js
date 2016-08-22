import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'redux-router';
import { authActions } from 'src/actions';

//material-ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import { white, black } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import 'src/styles/core.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menus: {
                user: {
                    open: false
                },
                projects: {
                    open: false
                }
            }
        };
    }
    handleTouchTap = (menu, event) => (event) => {
        // This prevents ghost click.
        event.preventDefault();
        let menus = {
            ...this.state.menus
        };
        menus[menu] = {
            open: true
        };
        this.setState(Object.assign({}, this.state, { menus, anchorEl: event.currentTarget }));
    };

    handleRequestClose = (menu) => () => {
        let menus = {
            ...this.state.menus
        };
        menus[menu] = {
            open: false
        };
        this.setState(Object.assign({}, this.state, { menus, anchorEl: null }));
    };
    handleChange = (event, index, value) => this.setState({ value });

    getTheme() {
        return getMuiTheme({
            palette: {
                textColor: black,
                alternateTextColor: black,
                primary1Color: "rgba(255,255,255,0)"
            },
            fontFamily: 'aileronlight',

            appBar: {
                height: 60
            }
        });
    }
    renderMenu() {
        return null;
        if (!this.props.isAuthenticated || this.props.location.pathname === '/') {
            return null;
        }
        const { dispatch, location } = this.props;
        return (
            <div style={{marginTop: 5}}>
                <FlatButton
                    label="Projects"
                    icon={(<FontIcon className="material-icons">layers</FontIcon>)}
                    onTouchTap={this.handleTouchTap('projects')} />
                <Popover
                    open={this.state.menus.projects.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left',vertical: 'bottom'}}
                    targetOrigin = {{ horizontal: 'left', vertical: 'top' } }
                    onRequestClose={this.handleRequestClose('projects')}>
                    <Menu >
                        <MenuItem primaryText="Brainstroms"/>
                        <MenuItem primaryText="Bids"/>
                        <MenuItem primaryText="Orders"/>
                    </Menu>
                </Popover>
                <FlatButton
                    icon={(<FontIcon className="material-icons">account_circle</FontIcon>)}
                    onTouchTap={this.handleTouchTap('user')}
                    label={'Super Wow'}/>

                <Popover
                    open={this.state.menus.user.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin = {{ horizontal: 'left', vertical: 'bottom' } }
                    targetOrigin = {{ horizontal: 'left', vertical: 'top' } }
                    onRequestClose={this.handleRequestClose('user')}>
                    <Menu>
                        <MenuItem
                            primaryText="Profile"
                            leftIcon={(<FontIcon className="material-icons">person</FontIcon>)}/>
                        <MenuItem
                            primaryText="Talents"
                            leftIcon={(<FontIcon className="material-icons">star_rate</FontIcon>)}/>
                        <MenuItem
                            primaryText="Logout"
                            leftIcon={(<FontIcon className="material-icons">exit_to_app</FontIcon>)}
                            onClick={() => {}}/>
                    </Menu>
                </Popover>
            </div>
        )
    }
    render() {

        const { dispatch, location } = this.props;
        const styles = {
            title: {
                marginLeft: 20,
                marginTop: 5,
                cursor: 'pointer'
            },
            body: {
                marginTop: 30
            },
            AppBar: {
                boxShadow: 'none'
            }
        };
        const logo = '';
        return (
            <MuiThemeProvider muiTheme={this.getTheme()}>
                <div>
                    <AppBar
                        style={styles.AppBar}
                        iconElementLeft={(
                            <img
                                src={logo}
                                style={styles.title}
                                onClick= { () => dispatch(push(`/`)) }
                            />
                        )}
                        iconElementRight={this.renderMenu()}
                    />
                    <div style={styles.body}>
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated')
});

export default connect(mapStateToProps)(App);
