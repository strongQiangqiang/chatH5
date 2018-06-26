// boss首页
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body
@withRouter

class UserCard extends Component { 
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  // 点击进入聊天页面
  handleClick = (v) => {
    this.props.history.push(`/chat/${v._id}`)
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace/>
        {
          this.props.userlist.map(v => (
            // 如果没有图片证明美誉完善信息
            v.avatar ? (
              <div key={v._id}>
                <Card
                  onClick={() => this.handleClick(v)}
                >
                  <Header
                    title={v.user}
                    thumb={require(`../img/${v.avatar}.png`)}
                    extra={<span>{v.title}</span>}
                  />
                  <Body>
                    { v.type === 'boss' ? <div>公司:{v.company}</div> : null }
                    {
                      v.desc.split('\n').map(d => (
                        <div key={d}>{d}</div>
                      ))
                    }
                    { v.type === 'boss' ? <div>薪资:{v.money}</div> : null }
                  </Body>
                </Card>
                <WhiteSpace/>
              </div>
            ) : null
          ))
        }
      </WingBlank>
    )
  }
}

export default UserCard
