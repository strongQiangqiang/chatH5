import React, { Component } from 'react'
import axios from 'axios'
import {compose} from 'redux';

class Boss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    } 
  }
  componentDidMount() {
    axios.get('/user/list?type=genius').then(res => {
      if (res.data.code === 0) {
        this.setState({
          data: res.data.data
        })
      }
    })
  }
  render() {
    console.log(this.state)
    return (
      <div>
        Boss
      </div>
    )
  }
}

export default Boss
