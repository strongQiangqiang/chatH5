// boss首页
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)

class UserCard extends Component { 
  static PropTypes = {
    userlist: PropTypes.array.isRequired
  }
  componentDidMount() {
    this.props.getUserList('genius')
  }
  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace/>
        {
          this.props.userlist.map(v => (
            // 如果没有图片证明美誉完善信息
            v.avatar ? (
              <div>
                <Card key={v._id}>
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
