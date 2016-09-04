import React from 'react'

class NotFound extends React.Component {
    render() {
        return (
            <h1>404</h1>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default NotFound
module.exports = NotFound