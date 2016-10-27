# 订单评价的开发

此前的“评价”按钮尚未用到，接下来要用它做一个动态的评价功能，看在 React 如何处理页面DOM的显示和隐藏。本次主要改动的`./app/components/OrderList/Item`组件。

## 添加属性

返回数据的时候，为每个订单数据都增加一个`commentState`的属性，其意思是 0-未评价 1-评价中 2-已评价。前端代码会根据这个状态来判断用户还是否需要评价订单。

另外，还有增加一个`id`属性，因为提交评论时，要对应上这个订单的 id 。

## 显示 & 隐藏

第一，通过`commentState`这个变量来判断到底显示哪个按钮，代码如下

```jsx
<div className="order-item-comment float-right">
    {
        this.state.commentState === 0
        // 未评价
        ? <button className="btn" onClick={this.showComment.bind(this)}>评价</button>
        :
            this.state.commentState === 1
            // 评价中
            ? ''
            // 已经评价
            : <button className="btn unseleted-btn">已评价</button>
    }
</div>
```

第二，根据`commentState`来判断输入框的显示，代码如下

```jsx
                {
                    // “评价中”才会显示输入框
                    this.state.commentState === 1
                    ? <div className="comment-text-container">
                        <textarea style={{width: '100%', height: '80px'}} className="comment-text"></textarea>
                        <button className="btn">提交</button>
                        &nbsp;
                        <button className="btn unseleted-btn" onClick={this.hideComment.bind(this)}>取消</button>
                    </div>
                    : ''
                }
```

第三，点击相应的按钮时候，会执行相应的事件，例如`showComment`和`hideComment`，这些事件其实就是控制`commentState`的值，然后 **React 根据既定的规则自动执行显示和隐藏**。

## 提交数据

第一，根据之前的约定，数据操作都是在**智能组件**中定义的，因此在`subpage/OrderList`子页面中定义提交时事件。注意，这个事件中有一个`callback`参数，即数据提交成功之后，要执行这个函数。这个函数的定义在后面

```js
    // 提交评论数据
    submitComment(id, value, callback) {
        const result = postComment(id, value)
        result.then(res => {
            return res.json()
        }).then(json => {
            if (json.errno === 0) {
                // 已经评价，修改状态
                callback()
            }
        }).catch(ex => {
            if (__DEV__) {
                console.error('提交评论数据错误, ', ex.message)
            }
        })
    }
```

第二，这个事件通过组件一步一步传递到`./app/components/OrderList/Item`组件中，该组件的“提交”按钮点击的时候，会执行以下的事件

```js
    submitComment() {
        // 获取操作函数
        const submitComment = this.props.submitComment
        // 获取id
        const id = this.props.data.id
        // 获取评价内容
        const commentText = this.refs.commentText
        const value = commentText.value.trim()
        if (!value) {
            return
        }

        // 执行数据提交
        submitComment(id, value, this.commentOk.bind(this))
    }
```

这个事件就调用了第一步定义的`submitComment`函数，而且把`this.commentOk.bind(this)`作为 callback 参数传递过去。

