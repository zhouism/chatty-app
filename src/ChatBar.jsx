import React, {Component} from 'react';

class ChatBar extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: props.currentUser,
            content: ''
        }
        this.contentEnter = this.contentEnter.bind(this);
        this.onContent = this.onContent.bind(this); 
        this.userEnter = this.userEnter.bind(this);
        this.onUser = this.onUser.bind(this);
    }

    contentEnter(event) {
        if (event.key === 'Enter') {
          const content = {
              content: event.target.value,
              username: this.state.username,
          }
          this.props.onNewPost(content);
        }
    }

    onContent(event) {
        this.setState({
          content: event.target.value,
        });
      }
    
    userEnter(event) {
        if (event.key === 'Enter') {
          const content = {
              username: event.target.value
          }
          this.props.updateUser(content);
        }
    }
    
    onUser(event) {
        console.log(event.target.value)
        this.setState({
            username: event.target.value,
        })
    } 

      
    render(){
        const props = this.props;
        
        return (
            <footer className="chatbar">
            <input defaultValue={props.currentUser} onInput={this.onUser} onKeyPress={this.userEnter} className="chatbar-username" placeholder="Your Name (Optional)" />
            <input onInput={ this.onContent } onKeyPress={this.contentEnter} className="chatbar-message" placeholder="Type a message and hit ENTER" />
            </footer>
        )
    }
}

export default ChatBar;

