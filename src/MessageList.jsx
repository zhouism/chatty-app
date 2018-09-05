import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    
    render(){
        const props = this.props;
        const messages = props.messages.map((messageInfo) => {
            return <Message key={messageInfo.id} messageInfo={messageInfo}/>
        });
        return (
            <main className="messages">
            {messages}
            </main> 
        )
    }
}

export default MessageList;