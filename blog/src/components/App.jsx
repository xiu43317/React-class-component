import React from 'react';
import { NavLink,Switch,Route } from 'react-router-dom';
import AllPost from './AllPost';
import NewPost from './NewPost';
import styles from '../index.scss';
import NowTime from '../components/NowTime/NowTime'; 

class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className={styles.main}>BLOG TEST</h1>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">my blog</a>
          <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          {/*利用NavLink代替Link可以在<a>裡面設定classname*/}
          <li className="nav-item"><NavLink className="nav-link" to="/posts">文章列表</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/new_post">發表文章</NavLink></li>
        </ul>
        </div>
        </nav>
        <Switch>
          <Route exact path="/" component={AllPost} />
          <Route path="/posts" component={AllPost} />
          <Route path="/new_post" component={NewPost} />
        </Switch>
        <NowTime/>
      </div>
    );
  }
}
export default App;