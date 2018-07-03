/* 聊天详情列表页面 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavBar, List, InputItem, Icon, Grid } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
// 引入蚂蚁金服的动画方案
import QueueAnim from 'rc-queue-anim'

const Item = List.Item
// 由于我们跨域，后端是9093前端是3000，这里需要链接下
// const socket = io('ws://localhost:9093')
@connect(
  state => state,
 { getMsgList, sendMsg, recvMsg, readMsg }
)

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false // 表情开始是不显示的
    }
  }
  componentDidMount() {
    // 获取消息列表数据,如果没有信息重新获取
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount(){
    // 设置信息标记为已读，参数为对方的id
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
  // 修正antd的grid跑马灯bug，官方推荐方法
  fixCarousel = () => {
    setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		}, 0)
  }
  // 这里向后端发送信息
  handleSubmit = () => {
    // socket.emit('sendmsg', {text: this.state.text})
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '', showEmoji: false })
  }
  render() {
    const userid = this.props.match.params.user
    const { text, showEmoji } = this.state
    const { chat, user } = this.props
    if (!chat.users[userid]) return null
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}))
    // 数据过滤
    const chatid = getChatId(userid, user._id)
    const chatmsg = chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id='chat-page'>
        <NavBar
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {chat.users[userid].name}
        </NavBar>
        {/* 这里使用的时候包一下就好了 */}
        <QueueAnim delay={100}>
          {
            chatmsg.map(v => {
              const avatar = require(`../img/${chat.users[v.from].avatar}.png`)
              return v.from === userid ? (
                <List key={v._id}>
                  <Item thumb={avatar}>{v.content}</Item>
                </List>
              ) : (
                <List key={v._id}>
                  <Item
                    extra={<img src={avatar} alt=''/>}
                    className='chat-me'
                  >{v.content}</Item>
                </List>
              )
            })
          }
        </QueueAnim>
        <div className='stick-footer'>
          <List>
            <InputItem
              placeholder='请输入'
              value={text}
              onChange={v => {
                this.setState({ text: v })
              }}
              extra={
                <div>
									<span
										style={{marginRight:15}}
										onClick={()=>{
											this.setState({ showEmoji:!showEmoji })
											this.fixCarousel()
										}}
									>😃</span>
									<span onClick={()=>this.handleSubmit()} >发送</span>
								</div>
              }
            ></InputItem>
          </List>
          {
            showEmoji ? (
              <Grid 
                data={emoji}
                columnNum={9}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={el=>{
                  this.setState({
                    text: text + el.text
                  })
                }}
              />
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default Chat
