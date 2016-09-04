import React from 'react'

class Detail extends React.Component {
    render() {
        return (
            <div>
                <h1>Detail</h1>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default Detail
module.exports = Detail