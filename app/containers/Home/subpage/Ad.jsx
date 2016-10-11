import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Ad extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Ad</h1>
            </div>
        )
    }
}

export default Ad