import React, {Component} from 'react';
class Message extends Component {
    render(){
        const props = this.props;

        if (props.type === 'incomingMessage') {
            return (
                <div className="message">
                  <span className="message-username">{props.username}</span>
                  <span className="message-content">{props.content}</span>
                </div>
            ) 
        }
        if (props.type === 'incomingNotification') {
            return (
                <div className="notification">
                    <span className="notification-content">{props.content}</span>
                </div>
            )
        }
    }
}

export default Message;