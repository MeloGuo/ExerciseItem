import React, { Component } from 'react'
import wrapWithLoadData from './wrapWithLoadData'

class CommentInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: props.data,
      content: ''
    }
  }

  componentDidMount () {
    this.textarea.focus()
  }

  handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

  handleUsernameBlur (event) {
    this.props.saveData(event.target.value)
  }

  handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  handleSubmit () {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({
        username,
        content,
        createdTime: +new Date()
      })
    }
    this.setState({
      content: ''
    })
  }

  render () {
    return (
      <div className='comment-input'>
        <div className='comment-field'>
          <span className='comment-field-name'>用户名：</span>
          <div className='comment-field-input'>
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)} />
          </div>
        </div>
        <div className='comment-field'>
          <span className='comment-field-name'>评论内容：</span>
          <div className='comment-field-input'>
            <textarea
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
              ref={(textarea) => (this.textarea = textarea)} />
          </div>
        </div>
        <div className='comment-field-button'>
          <button
            onClick={this.handleSubmit.bind(this)}>
            发布
          </button>
        </div>
      </div>
    )
  }
}

CommentInput = wrapWithLoadData(CommentInput, 'username')
export default CommentInput
