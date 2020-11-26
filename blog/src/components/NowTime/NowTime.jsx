import React from 'react';

class NowTime extends React.Component {
    constructor(props) {
        super(props)
        //設定目前的時間
        this.state = { time: new Date().toLocaleTimeString()}
    }
    //加入組件建構完成後執行的事件
    componentDidMount() {
        /*在建構完成後，每秒都去刷新this.state.time的值
        (1)先去宣告一個更新state內容的function
        (2)每秒去執行一次該function刷新*/
        const upTime = () => {
            //這裡面的setState()能夠重新設定state的值
            this.setState({time: new Date().toLocaleTimeString()})
        }
        setInterval(upTime,1000);
    }

    render(){
        return (
            <div>
                <h4>現在時間是：{this.state.time}</h4>
            </div>
        )
    }
}

export default NowTime;