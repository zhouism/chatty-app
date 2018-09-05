import React, {Component} from 'react';
class Message extends Component {
    render(){
        const props = this.props;
        return (
            <div className="message">
              <span className="message-username">{props.messageInfo.username}</span>
              <span className="message-content">{props.messageInfo.content}</span>
            </div>
        )
    }
}

export default Message;