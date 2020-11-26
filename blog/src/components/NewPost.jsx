import React, { Component } from 'react';
import axios from 'axios';
//跳轉重新渲染
import { withRouter, } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPosts } from '../actions/actions';

class NewPost extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onContentInput = this.onContentInput.bind(this);

    this.state = {
      title: '',
      content: ''
    }
    const { setPosts } = props;
  }

  onChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  onContentInput(e) {
    this.setState({
      content: e.target.value
    })
  }

  // 發文
  onClick() {
    const { title, content } = this.state;
    // send request
    axios.post('http://localhost:5566/posts', {
      title,
      content
    }).then(function (response) {
      console.log(response);
      //回到文章列表
    }).catch(function (error) {
      console.log(error);
    });
    
    axios.get('http://localhost:5566/posts')
      .then(function (response) {
        const data = response.data;
        console.log(data);
        //再將資料為給store
        setPosts(data);
      })
      .catch(function (error) {
        console.log(error);
      });


    this.props.history.push('/posts');
  }

  render() {
    const { title, content } = this.state;
    const { posts } = this.props;
    return (
      <form>
        <h3 className="title">一共有{posts.length}篇文章</h3>
        <div className="form-group">
          <label>標題</label>
          <input name="title" className="form-control" placeholder="title" value={title} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label>內容</label>
          <textarea onChange={this.onContentInput} value={content}></textarea>
        </div>
        <button type="button" className="btn btn-default" onClick={this.onClick}>送出</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  }
}

//連接到reducer中的actions
const mapDispatchToProps = (dispatch) => {
  return {
    setPosts: (posts) => {
      dispatch(setPosts(posts))
    }
  }
}

// 利用 connect 把這邊的posts變成store裡面的posts
// 跳轉順便更新頁面 useHistory 裡面的 history.push只能用在hook
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewPost));
