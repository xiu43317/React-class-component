import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

class UpdateModal extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const style = {
            position: 'fixed',
            width: '40%',
            zIndex: '100',
            boxShadow: '1px 1px 1px black',
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid black',
            padding: '16px',
            left: '15%',
            top: '10%',
            boxSizing: 'border-box',
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0',
            transition: 'all 0.3s ease-out'
        };
        return (
            <div>
                <Backdrop show={this.props.show} closeModal={this.props.closeModal} />
                <div className="Modal1" style={style}>
                    <h2>修改內容</h2>
                    <p>標題</p>
                    <input type="text" name="title" value={this.props.title} onChange={this.props.changeTitle}></input>
                    <p>內容</p>
                    <textarea name="content" value={this.props.content} onChange={this.props.changeContent}></textarea>
                    <br></br>
                    <button className="btn btn-secondary" onClick={this.props.closeModal}>關閉</button>
                    <button className="btn btn-success" onClick={this.props.update}>送出</button>
                </div>
            </div>
        )
    }
}

export default UpdateModal;