import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import { connect } from 'react-redux';
import { setPosts, removePost, updatePost } from '../actions/actions';
import UpdateModal from './Modal/Modal';

class AllPost extends Component {

  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {displayModal:false,id:"", title:"", content:"",posts:[]}
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
    this.update = this.update.bind(this);

    //從store中抽取setPosts的方法
    const { setPosts } = props;
    // this.state = {
    //   posts: []
    // }

    const self = this;

    //從資料庫中取得資料
    axios.get('http://localhost:5566/posts')
      .then(function (response) {
        const data = response.data;
        console.log(data);
        //再將資料為給store
        setPosts(data);
        self.setState({
          posts: data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRemove(id) {
    //從store中抽出remove的方法
    const { removePost } = this.props;
    // const self = this;
    //從資料庫中移除
    axios.get('http://localhost:5566/posts/delete/' + id)
      .then(function (response) {
        //從store中移除
        removePost(id);
        console.log(response.data);
        // self.setState({
        //   posts: self.state.posts.filter((post) => post._id !== id)
        // })
      }).catch(function (error) {
        console.log(error);
      });
  }

  //開啟修改對話框
  openModal (title,content,id) {
    
    this.setState({displayModal:true,title:title});
    this.setState({content: content,id:id});
  }

  //關閉修改對話框
  closeModal () {
    this.setState({displayModal:false});
  }

  //改變標題裡面的值
  changeTitle(){
    let title = window.event.target.value;
    this.setState({title:title});
  }

  //修改內容裡面的值
  changeContent(){
    let content = window.event.target.value;
    this.setState({content:content});
  }

  //更新資料
  update(){
    const { updatePost } = this.props;
    var id = this.state.id;
    var title = this.state.title;
    var content = this.state.content;
    var posts = this.state.posts;

    //更改目前頁面的狀態在丟進store
    for (var i = 0 ; i<posts.length;i++){
      if(posts[i]._id == id){
        posts[i].title = title;
        posts[i].content = content;
      }
    }

    //利用post將資料丟進去資料庫 
    axios.post('http://localhost:5566/posts/update/',{
      id: id,
      title: title,
      content: content
    })
    .then(function (response) {
      updatePost(posts);
      console.log(response.data);
    }).catch(function (error) {
      console.log(error);
    });
    this.closeModal();
  }

  render() {
    //posts準備接收store的資料
    const { posts } = this.props;
    // const {posts} = this.state;
    return (
      <div>
        <h3>一共有{posts.length}篇文章</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>標題</th>
              <th>內容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map((post) => {
                return (<Post id={post._id} title={post.title} content={post.content} remove={this.onRemove} update={this.openModal}/>);
              })
            }
          </tbody>
        </table>
        <UpdateModal show={this.state.displayModal} closeModal={this.closeModal} changeContent={this.changeContent}
        update={this.update}
        title={this.state.title} content={this.state.content} changeTitle={this.changeTitle}/>
      </div>
    );
  }
}

//連接到 resucer中的state
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
    },

    updatePost:(posts) => {
      dispatch(updatePost(posts))
    },

    removePost: (id) => {
      dispatch(removePost(id))
    }
  }
}

// 利用 connect 把 Redux 的 state 變成 AllPost 裡面的 props
export default connect(mapStateToProps, mapDispatchToProps)(AllPost)