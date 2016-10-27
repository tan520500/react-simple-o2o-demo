# 用户主页的开发

用户主页的开发过程

## 分析页面

页面的 Header 我们可以直接引用`./app/components/Header`组件，但是需要一个简单的改造，下文细说。接下来是用户基本信息，直接从 Redux 读取并显示即可。再往下是用户购买的订单，可以做一个 subpage 来显示。

## 改造 Header

此前的`Header`组件中，返回时直接写了`hashHistory.push(hashHistory)`，简单粗暴。但是用户主页是从 Login 页面过来的，如果这样返回到 Login 页面，它判断用户已经登录了，会再次跳转到用户主页，就死循环了。因此我们这里要干预`Header`组件的返回事件，让它乖乖的返回的 Home 页面。

在调用组件时

```jsx
<Header title="用户主页" backRouter="/home"/>
```

组件中的返回事件

```js
    clickHandle() {
        const backRouter = this.props.backRouter
        if (backRouter) {
            hashHistory.push(hashHistory)
        } else {
            window.history.back()
        }
    }
```

## 验证登录

如果用户未登录就进入页面，要踢出到登录页面中，即

```js
    componentDidMount() {
        // 如果未登录，跳转到登录页面
        if (!this.props.userinfo.username) {
            hashHistory.push('/Login')
        }
    }
```

## 显示用户信息

创建一个`./app/components/UserInfo`用以显示用户信息，用户信息可直接从 Redux 中读取。

## 订单列表

订单列表涉及到数据交互，因此做一个`subpage/OrderList.jsx`的子页面来整体处理数据。子页面获取了数据之后，直接传递给`./app/components/OrderList`组件，让组件来展示数据。具体看源代码。

另外，订单列表的内容部分是通过组件来展示的，而“您的订单”标题就不是组件的一部分，它是页面的一部分，因此它的样式就由子页面来控制，放在`subpage/style.less`来统一管理。此前的许多子页面都是这样定义的，这样层次会更加清晰一些。

## 订单数据

跟所有的列表数据一样，此处的订单数据也是假数据，为了演示用。
