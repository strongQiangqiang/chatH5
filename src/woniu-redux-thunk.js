/*
	thunk，写任何redux中间件都要写三层函数，
	第一层参数是一个对象我们称之为dispatch和getState，即原本的dispatch和getState；
	next可以成为，只要调用了next，就会到下一个中间件，有多个中间件，当前中间件已经不管了；
	中间件重点需要干的就是，如果action是function的时候，让他把action重新调用一次dispatch和getState重新执行下
	这样我们就支持了异步任务，具体什么时候dispatch由action内部决定
*/
const thunk = ({dispatch,getState})=>next=>action=>{
	// 如果是函数，执行以下，参数是dispatch和getSatate
	if (typeof action=='function') {
		return action(dispatch,getState)
	}
	// 默认什么都没干
	return next(action)
}
export default thunk