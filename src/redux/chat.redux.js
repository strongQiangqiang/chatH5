// 处理聊天内容的redux
import axios from 'axios'
import io from 'socket.io-client'
// 由于我们跨域，后端是9093前端是3000，这里需要链接下
const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取消息
const MSG_RECV = 'MSG_RECV'
// 标识消息
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0 // 未读消息数量
}

export function chat(state=initState, action) {
  switch(action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length
      }
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread + n
      }
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return { type: MSG_LIST, payload: { msgs, users, userid } }
}

function msgRecv(msg, userid) {
  // 这里的入参可以不写到payload里面，放到外面
  return { type: MSG_RECV, payload: msg, userid }
}
// 获取聊天信息
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        // getState可以获取redux里面其他的state
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}

// 发送聊天信息到后端
export function sendMsg({ from, to, msg }) {
  return dispatch => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

// 监听聊天信息
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      console.log('recvmsg', data)
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}