import React, { Component } from 'react'

function getPostData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('文章内容真的屌炸天！！！')
    }, 2000)
  })
}

class Post extends Component {
  constructor () {
    super()
    this.state = {
      postContent: ''
    }
  }

  componentWillMount () {
    this._loadData()
  }

  handleClickRefresh () {
    this._loadData()
  }

  async _loadData () {
    this.setState({
      postContent: '数据加载中...'
    })
    const postContent = await getPostData()
    this.setState({
      postContent
    })
  }

  render () {
    return (
      <div>
        <div className='post-content'>
          {this.state.postContent}
        </div>
        <button onClick={this.handleClickRefresh.bind(this)}>刷新</button>
      </div>
    )
  }
}

export default Post
