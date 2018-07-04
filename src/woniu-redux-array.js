

const arrayThunk = ({dispatch,getState})=>next=>action=>{
	if (Array.isArray(action)) {
		return action.forEach(v=>dispatch(v))
	}
	// 如果不符合我们的要求，直接调用下一个中间件，使用next
	// 如果符合我们的要求，需要重新dispatch，调用dispatch即可
	return next(action)
}
export default arrayThunk