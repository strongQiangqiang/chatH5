
/*
	connect和Provider的实现原理
*/
import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './woniu-redux'

// connect负责链接组件，给到redux里的数据放到组件的属性里
// 1.负责接收一个组件，把state里的一些数据放进去，返回一个组件，其实就是高阶组件
// 2.数据变化的时候，能够通知组件
/*
	不用箭头函数的写法，这个是一个高阶组件
	export function connect(mapStateToProps, mapDispatchToProps) {
		return function (WrapComponent) {
			return class ConnectComponent extends React.Component{
			}
		}
	}
	connect是一个高阶函数，首先第一层先接受两个参数
	第一个是我们根据redux里面的需要哪些属性的映射，第二个需要什么方法的映射，
	然后再里面一层就是一个高阶函数接受一个外部的component，内部其实就是从context，即Provider拿到store，
	拿到之后获取我们当前状态，使用getState，根据我们第一个参数获取到当前组件需要redux哪些状态然后放到props里面
	根基第二个参数我们用bindActionCreators吧本身返回的原始的action原始的对象包装成自动dispatch的函数，
	bindActionCreators函数其实就是遍历传进来的所有的action，把他每一个的key不变，value变成一个可以dispatch的函数
	*/
export const connect = (mapStateToProps=state=>state,mapDispatchToProps={})=>(WrapComponent)=>{
	return class ConnectComponent extends React.Component{
		static contextTypes = {
			store:PropTypes.object
		}
		constructor(props, context){
			super(props, context)
			this.state = {
				props:{} // 即将传给外部的数据
			}
		}
		componentDidMount(){
			const {store} = this.context
			// 每次数据发生变化都去监听
			store.subscribe(()=>this.update())
			this.update()
		}
		update(){
			// 获取mapStateToProps和mapDispatchToProps，放入到this.props里
			const {store} = this.context
			const stateProps = mapStateToProps(store.getState())
			// 提交dispatch的方法，方法不能直接给，徐亚dispatch
			/*
				addGun(){
					return { type: ADD_GUN }
				}
				reducer里面的方法直接执行是没有意义的，
				要 addGun = () => store.dispatch(addGun()) 才有意义
				其实就是dispatch把actionCtreators包了一层
				下面的bindActionCreators其实就是实现的方法，其实就是工具函数
			*/
			const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
			this.setState({
				props:{
					...this.state.props,
					...stateProps,
					...dispatchProps	
				}
			})
		}
		render(){
			return <WrapComponent {...this.state.props}></WrapComponent>
		}
	}
}

// Provider，其实就是把store放到context里，所有的子元素可以直接取到store
export class Provider extends React.Component {
	static childContextTypes = {
		store: PropTypes.object
	}
	// 把数据传到子组件
	getChildContext() {
		return { store: this.store }
	}
	constructor(props, context) {
		super(props, context)
		this.store = props.stores
	}
	render() {
		// 获取子元素，
		return this.props.children
	}
}