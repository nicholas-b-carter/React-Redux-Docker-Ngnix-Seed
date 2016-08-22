import React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import R from 'ramda'
import classNames from './style.scss'

export default class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false
        };
    }
    componentDidMount() {
        this.setState({ isPlaying: false })
    }
    handleVideoEnded(e) {
        e.preventDefault()
        this.setState({ isPlaying: false })
    }
    playVideo() {
        if (!this._video) {
            return null;
        }
        this
            ._video
            .play();
        this.setState({ isPlaying: true })
    }
    stopVideo() {
        if (!this._video) {
            return null;
        }
        this
            ._video
            .pause();
        this._video.currentTime = 0;
        this.setState({ isPlaying: false })
    }
    renderControlBtn(isPlaying) {
        if (!this.state.isPlaying) {
            return (
                <FontIcon
                    onClick={::this.playVideo}
                    className={classNames.VideoPlay + ' material-icons'}>
                    play_arrow
                </FontIcon>)

        }
        return (
            <FontIcon
                onClick={::this.stopVideo}
                className={classNames.VideoStop + ' material-icons'}>
                stop
            </FontIcon>)

    }
    render() {
        const { dispatch, videoId, controls } = this.props;
        if ((R.isEmpty(videoId) || R.isNil(videoId))) {
            return null;
        }

        return (
            <div className={classNames.Video}>
                <video
                    onEnded={::this.handleVideoEnded}
                    style={{
                        display: this.state.isPlaying
                        ? ''
                        : 'none'
                    }}
                    ref={(c) => {this._video = c}}
                    preload={'none'}
                    controls={controls || false}
                    src={`//content.jwplatform.com/videos/${videoId}-720.mp4`}/>
                <img
                    style={{display: this.state.isPlaying? 'none': ''}}
                    src={`//content.jwplatform.com/thumbs/${videoId}-480.jpg`}/>
                {this.renderControlBtn(this.state.isPlaying)}
            </div>);
    }
}
