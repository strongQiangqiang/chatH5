/*
	redux里面创建statre的createStore和中间件applyMiddleware的实现原理
*/
// 实现最基本的redux的createStore方法
export function createStore(reducer, enhancer){
	// enhancer就是中间件，如果有的话就用中间件把createStore包一层，是对createStore进行了一次扩展
	if (enhancer) {
		return enhancer(createStore)(reducer)
	}
	// 存储当前状态
	let currentState = {}
	// 监听器
	let currentListeners = []
	// 获取当前应用的状态
	function getState(){
		return currentState
	}
	// 订阅
	function subscribe(listener){
		// 这里没有检验listener是否为函数
		currentListeners.push(listener)
	}
	function dispatch(action){
		// 最简单的发布订阅机制
		currentState = reducer(currentState, action)
		// 监听器全部执行一遍
		currentListeners.forEach(v=>v())
		return action
	}
	// 这里初始化的要走一遍初始，要特殊的不能和用户重复
	dispatch({type:'@IMOOC/WONIU-REDUX'})
	return { getState, subscribe, dispatch}
}

// 中间件
/*
	applyMiddleware其实可以接收多个参数，我们把每个参数都收集起来变成一个中间件的数组即(...args)，
	然后我们吧数组遍历一下，给数组分别传递原本的dispatch，再传递一层store的dispatch就是我们当前的dispatch
	然后在传递就是我们action，最终返回用中间件包装好的dispatch覆盖一下，与之配合的就是compose函数
	其实就是多层次函数调用
	*/
export function applyMiddleware(...middlewares){
	return createStore=>(...args)=>{
		const store = createStore(...args)
		let dispatch = store.dispatch

		const midApi = {
			getState:store.getState,
			// 包了三层的函数，专业名词叫颗粒化
			dispatch:(...args)=>dispatch(...args)
		}
		const middlewareChain = middlewares.map(middleware=>middleware(midApi))
		dispatch = compose(...middlewareChain)(store.dispatch)
		return {
			...store,
			dispatch
		}

	}
}
// compose(fn1, fn2, fn3)
// fn1(fn2(fn3))
export function compose(...funcs){
	if (funcs.length==0) {
		return arg=>arg
	}
	if (funcs.length==1) {
		return funcs[0]
	}
	// 挨个调用
	return funcs.reduce((ret,item)=> (...args)=>ret(item(...args)))
}
// 专门绑定dispatch的方法
function bindActionCreator(creator, dispatch){
	return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators,dispatch){
	// ret是结果，item是每一个值
	return Object.keys(creators).reduce((ret,item)=>{
		ret[item] = bindActionCreator(creators[item],dispatch)
		return ret
	},{})
}
/*
	export function bindActionCreators(creators,dispatch){
		let bound= {}
		Object.keys(creators).forEach(v=>{
			let creator = creators[v]
			// 每个方法都绑定dispatch
			bound[v] = bindActionCreator(creator, dispatch)
		})
		return bound
	}
*/


