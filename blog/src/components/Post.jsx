import React, { Component } from 'react';

export default class Post extends Component {

  constructor (props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  onRemove () {
    //設定props準備接收AllPost中的remove function與id
    const {remove, id} = this.props;
    //this.props.remove
    remove(id);
  }

  openModal () {
    const {update, title, content,id} = this.props;
    update(title,content,id);
  }

  render () {
    const {title, content} = this.props;
    return (
      <tr>
        <td>{title}</td>
        <td>{content}</td>
        <td>
          <a className="btn btn-danger" onClick={this.onRemove}>刪除</a>
          <a className="btn btn-primary" onClick={this.openModal}>更新</a>
        </td>
      </tr>
    );
  }
}