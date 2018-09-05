import React, {Component} from 'react';

class ChatBar extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        this.onContent = this.onContent.bind(this); 
        // this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
          console.log('do validate');
          this.props.onNewPost(this.state.content);
        }
    }

    onContent(event) {
        this.setState({
          content: event.target.value
        });
      }
      
    render(){
        const props = this.props;
        
        return (
            <footer className="chatbar">
            <input defaultValue={props.currentUser} className="chatbar-username" placeholder="Your Name (Optional)" />
            <input  onInput={ this.onContent } onKeyPress={this._handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        )
    }
}

export default ChatBar;

