import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static PropTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      icon: ''
    }
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    const girdHeader = this.state.icon ? (
      <div>
        <span>已选择头像</span>
        <img style={{width:20}} src={this.state.icon} alt='' />
      </div>
    ) : '请选择头像'
    return (
      <div> 
        <List renderHeader={() => girdHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            activeStyle={false}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}

export default AvatarSelector