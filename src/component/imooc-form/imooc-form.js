// 封装高阶组件
import React, { Component } from 'react'

export default function imoocFrom(Comp) {
  return class WrapperComp extends Component{
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    // 这里新写一个方法传递下去
    handleChange(key, val) {
      this.setState({
        [key]:val
      })
    }
    render() {
      return (
        <Comp
          state={this.state}
          handleChange={this.handleChange}
          {...this.props} 
        />
      )
    }
  }
}