# 收藏和购买的开发

介绍收藏和购买的开发过程。

## 开发组件

从页面开始说起。为`Detail`页面新建一个`subpage/buy/jsx`的子页面，再新建并引用一个`./app/components/BuyAndStore`的组件。所有的数据管理和数据操作，都在子页面中做，组件只负责显示和触发事件即可。

点击购买或者收藏的时候，我们首先要判断登录状态，如果用户未登录就请先去登录。不过跳转到登录页面之后，登录成功了，要再跳转回到刚才的页面。这个问题我们在做登录页面的时候说过，这里就用到了。

```javascript
    // 检查登录状态
    loginCheck() {
        const id = this.props.id
        const userinfo = this.props.userinfo
        if (!userinfo.username) {
            // 跳转到登录页面的时候，要传入目标router，以便登录完了可以自己跳转回来
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id))
            return false
        }
        return true
    }
```

## 使用 Redux 做收藏功能

学习至今，一开始讲解的 Redux 的用法估计已经忘记的差不多了，因为我们本教程此前用的太少，就存了用户信息中的城市和用户名，其他的就没有了。其实本教程在设计之初是没有“收藏”功能的，但是做到当前，我发现 Redux 用的并不多，因此就临时加上了“收藏”功能，为的是让学习者真正的掌握 Redux 的使用。

**Redux的使用场景是：多个组件都可能用到的公共信息，就存放在 Redux 中来管理**。例如我们已经在 Redux 中应用的用户信息（城市、用户名）在很多组件中都可能用到。“收藏”功能也是如此，在显示收藏列表时候回用到，在每个商户详情页，都需要判断这个商户是否已经被收藏了。

根据 Redux 的开发规范，先创建三个文件。具体看源码进行解读。

- `./app/actions/store.js` 定义 actions
- `./app/constants/store.js` 定义用到的常量
- `./app/reducer/store.js` 定义数据变化规则，注意`./app/reducer/index.js`也有相应的变化

然后在刚刚创建的`subpage/buy.jsx`子页面中使用 actions，实现添加和删除的功能

```js
    // 收藏事件
    storeHandle() {
        // 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if (this.state.isStore) {
            // 已经被收藏了，则取消收藏
            storeActions.rm({id: id})
        } else {
            // 未收藏，则添加到收藏中
            storeActions.add({id: id})
        }
        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }
```

最后，至于收藏的内容如何显示出来，我想交给大家自己去思考，你现在没有时间写代码实现它不要紧，只要你能把实现的方法想通了就OK了。学习至今如果你还不能解决这个问题，我会为你感到很遗憾。


## 模拟购买功能

这里用户点击“登录”之后，什么都没有做直接就跳转到了用户主页，因为用户主页可以看到用户购买过的列表。这里的购买功能是模拟的，没有真实 app 里面那么复杂的付款流程和购物车管理功能。时间、精力都有限，只能把最针对 React 的东西讲解出来，和 React 关系不大又特别冗长的功能，我们就直接绕过。

