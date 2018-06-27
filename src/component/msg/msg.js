// 聊天消息列表
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'
// @withRouter

const Item = List.Item
const Brief = Item.Brief

@connect(
  state => state
)

class Msg extends Component {
  // 取数组最后一条的数据
  getLast(arr){
		return arr[arr.length - 1]
	}
  render() {
    // 1. eslint代码校验工具
		// 2. react16特有的错误处理机制
    // 2. react性能优化
    const userid = this.props.user._id  // 当前登录人的id
		const userinfo = this.props.chat.users
    const msgGroup = {}
    // 按照聊天用户分组，根据chatid分组
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
    // console.log([3,1,2,6,5].sort(function(a,b){
		// 	return b-a
		// }))
    // console.log(Object.values({name:'imooc',age:18}))
    // 最新的对话应该在列表最上面，用sort进行排序
		const chatList = Object.values(msgGroup).sort((a, b) => {
      const a_last = this.getLast(a).create_time
			const b_last = this.getLast(b).create_time
			return b_last - a_last
    })
    return (
      <div>
        {
          chatList.map(v=>{
            // 取聊天信息数组最后一个数据
            const lastItem = this.getLast(v)
            // 判断当前最后一条信息的id是自己还是对方
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            // 过滤后的未读消息条数
            const unreadNum = v.filter(v => !v.read && v.to === userid).length
            if (!userinfo[targetId]) return null
            // const name = userinfo[targetId]?userinfo[targetId].name:''
            // const avatar = userinfo[targetId]?userinfo[targetId].avatar:''
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  arrow='horizontal'
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{userinfo[targetId].name}</Brief>
                </Item>
              </List>
            )
          })
        }
			</div>
    )
  }
}

export default Msg
