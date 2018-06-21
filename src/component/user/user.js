import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

@connect(
  state=>state.user
)

class User extends Component {
  render() {
    console.log(this.props)
    const { avatar, user, type, company, title, desc, money } = this.props
    return (
      user ? (
        <div>
          <Result
            img={
              <img
                alt=''
                style={{ width: 50 }}
                src={require(`../img/${avatar}.png`)}
              />
            }
            title={user}
            message={type === 'boss' ? company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item
              multipleLine
            >
              {title}
              {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {money ? <Brief>薪资:{money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace/>
          <List>
            <Item>退出登录</Item>
          </List>
        </div>
      ) : null
    )
  }
}

export default User
