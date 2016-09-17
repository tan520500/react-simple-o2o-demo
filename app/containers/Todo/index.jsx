import React from 'react'

import Input from '../../components/Input'
import List from '../../components/List'

class Todo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: []
        }
    }
    render() {
        return (
            <div>
               <Input submitFn={this.submitFn.bind(this)}/>
               <List todos={this.state.todos}/>
            </div>
        )
    }
    submitFn(value) {
        let data = this.state.todos
        data.unshift(value)
        this.setState({
            todos: data
        })
    }
}

export default Todo