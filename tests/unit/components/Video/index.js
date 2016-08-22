// import expect from 'expect'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { Video } from 'src/components'
import FontIcon from 'material-ui/FontIcon';

function setup() {
    const props = {
        dispatch: () => {},
        videoId: 'rayoeDpo',
        controls: true
    }
    const enzymeWrapper = shallow(<Video {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('"❇ Video"', () => {
    it('video should receive src by videoId prop', () => {
        const { props, enzymeWrapper } = setup()

        expect(enzymeWrapper.find('video')
                .prop('src'))
            .to.be.eql(`//content.jwplatform.com/videos/${props.videoId}-720.mp4`)

    })

})
