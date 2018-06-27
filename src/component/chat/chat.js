import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { NavBar, List, InputItem } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'

const Item = List.Item
// 由于我们跨域，后端是9093前端是3000，这里需要链接下
const socket = io('ws://localhost:9093')
@connect(
  state => state,
 { getMsgList, sendMsg, recvMsg }
)

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    // 获取消息列表数据,如果没有信息重新获取
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  handleSubmit = () => {
    // 这里向后端发送信息
    // socket.emit('sendmsg', {text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }
  render() {
    const userid = this.props.match.params.user
    const { text, msg } = this.state
    const { chat } = this.props
    if (!chat.users[userid]) return null
    return (
      <div id='chat-page'>
        <NavBar mode='dark'>
          {chat.users[userid].name}
        </NavBar>
        {
          chat.chatmsg && chat.chatmsg.map(v => {
            return v.from === userid ? (
              <List key={v._id}>
                <Item>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item
                  extra={'avatar'}
                  className='chat-me'
                >{v.content}</Item>
              </List>
            )
          })
        }
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            >
              信息
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat
