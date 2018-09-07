import React, {Component} from 'react';
class Message extends Component {
    render(){
        const props = this.props;
        return (
            <div className="message">
              <span className="message-username">{props.username}</span>
              <span className="message-content">{props.content}</span>
            </div>
        )
    }
}

export default Message;