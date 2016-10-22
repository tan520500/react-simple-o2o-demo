# 搜索页面的开发

介绍搜索页面的开发过程。


## 进入搜索页面的入口

app 中有两个入口可进入搜索页面。

### 首页顶部搜索框

首页顶部搜索框的代码在`./app/components/HomeHeader`里面，此前只是有一个简单的`<input>`然后做了一些UI的样式优化，现在我们要改一下。

改之前还需要了解一个React中的概念————**约束性和非约束性组件**，听着挺高大上的，简单说来就是我们如何用组件的属性或状态来表示各种 input （text、radio、checkbox等）的值，这样就使得组件化更加纯粹更加抽象，更加不依赖于DOM。举例子

React 中写一个最简单的输入框可以这样写，这个 `defaultValue` 其实就是原生DOM中的 `value` 属性。

```jsx
<input type="text" defaultValue="a" />
```

而 React 还建议我们这么写。通过上下两种代码，就能体会这个概念的区别了，下面代码具体的意思就是：将`input`的值实时保存到组件的`state`中，成了组件的一个状态，而不是一个DOM的值。*注意，以下代码不会出现死循环，React做了特殊处理*

```jsx
<input type="text" value={this.state.name} onChange={this.handleChange} />

//...省略部分代码
handleChange: function(e) {
  this.setState({name: e.target.value});
}
```

而我们就是要根据下面的这段代码，来修改一下目前的顶部搜索框。直接看源代码即可。

最后，我们使用`hashHistory.push`来做页面的跳转，其中的汉字要注意进行 url 编码。例如输入“火锅”进行搜索，要跳转的 url 就是`/search/all/%E7%81%AB%E9%94%85`（url 的规则我们稍后讲到）


### 首页轮播导航

首页轮播图的代码在`./app/components/Category`中，现在我们要做的就是将每个类别都加上链接，使用`<Link>`组件来做链接，例如`<Link to="/search/jingdian"> ..... </Link>`，直接看源码。


## 路由规则

路由规则的定义在`./app/router/routeMap.jsx`中，其中搜索页的路由规则定义稍微复杂，即`<Route path='/search/:category(/:keyword)' component={Search}/>`。其中`/search`是路由的 path，`/:category`是一个必选参数，`(/:keyword)`是一个可选参数。从上面的两个例子可以看出他们的对应关系：

- `/search/all/%E7%81%AB%E9%94%85`，两个参数都有
- `/search/jingdian`，只给出第一个参数，第二个参数（可选）为空

要在目标页面获取参数，可以这样做。即参数已经作为 React 组件的一个属性来获取了，这一步是 React-router 帮我们做的。

```js
const params = this.props.params
console.log('category param: ' + params.category)
console.log('key param:' + params.keyword)
```


## 搜索页面

下面开始实现搜索页面，先看UE设计图。

### 页面分析

搜索页面上面有一个header，里面有一个 input 可以继续搜索，下面有一个下载加载刷新的列表，这是页面的基本结构。首先，下拉加载刷新的列表我们之前在首页做过，这里完全可以再次利用，发挥组件化的有点。再者，搜索框我们之前在首页的 header 也做过，不过不完全一样。但是只要有共同的可通用的部分，就需要抽取出来，防止代码冗余。

组件化的设计思路，就是要将页面中可复用的最小单元做成组件 ———— 要理解这个意思。

### 抽取 input 组件

新建一个`./app/components/SearchInput`组件，这也是一个**约束性组件**，之前已经介绍过了。另外，该组件接收两个属性，具体的实现去看源码。

- `value` input 的默认值
- `enterHandle` 键盘回车事件

将 input 组件抽离出来之后，`./app/components/HomeHeader`中引用这个 input 组件，这样`HomeHeader`的代码就变得简单多了，具体看源码。

### 开发 SearchHeader 组件

input 抽离出来之后，我们还需要为搜索页面做一个 header，新建`,/app/components/SearchHeader`组件，具体看源码。

### 借用 List 组件

要做搜索页面中的结果列表，就涉及到和服务器的交互，要获取数据。在某一个模块有单独的数据交互，我们就需要将该模块单独拆分到一个 subpage 当中，新建`./app/container/Search/subpage/List.jsx`，然后在 Search 页面将其引用，将使得模块之间没有太多耦合，易于维护。至于这个模块内部有如何复杂的数据交互操作，我们在模块内部写，不要暴露出来。

当然，这里会复用到之前写过的`./app/components/List`组件。具体看源码。

注意，组件中`componentDidUpdate`所处理的事情，是已经进入了搜索结果页之后，又再次重新输入关键字进行搜索。此时不会触发组件的`componentDidMount`事件，而是将会触发`componentDidUpdate`事件，因此此时组件没有重新构建，而是发生了部分属性或者状态的更新。详情参见源代码。

### 模拟数据说明

数据是模拟的、演示用，并不一定真实。前端开发人员只要保证传递给后端正确的参数（page、city，category和keyword），至于数据如何返回，交给后端来做就是了，分工明确即可。

