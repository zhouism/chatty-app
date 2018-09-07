import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
    
    this.onNewPost = this.onNewPost.bind(this); 
    this.updateUser = this.updateUser.bind(this)
  }
  

  componentDidMount() {
   
    this.socket = new WebSocket("ws://localhost:3001");
    
    this.socket.onopen = (e) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (evt) => {
      console.log(evt.data);
      const msg = JSON.parse(evt.data);
      
      const message = {
        type: msg.type,
        id: msg.id,
        username: msg.username,
        content: msg.content
      };
      const messages = this.state.messages.concat(message);
      switch(msg.type) {
        case "incomingMessage":
          this.setState({
            messages: messages
          })
          break;
        case "incomingNotification":
        this.setState({
          messages: messages
        })
          break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + msg.type);
      }
      
 
    }

    

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {type: 'incomingMessage', id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        loading: false,
        messages: messages})
    }, 500);
  }

  onNewPost(content) {
    const newMessage = { 
      type: "postMessage",
      content: content.content,
      username: content.username, 
    }
    this.socket.send(JSON.stringify(newMessage));
    } 
  
  updateUser(content) {
    console.log('updateUser', content);
    const newUser = { 
      type: "postNotification",
      username: content.username,
      content: this.state.currentUser.name + ' has changed their name to ' + content.username
    }
    this.socket.send(JSON.stringify(newUser));
    console.log('newUser', newUser);
    this.setState({
      currentUser: {name: content.username}
    })
  }    
  
  render() {
    if (this.state.loading) {
      return (<h1>Loading...</h1>)
    } else {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={this.onNewPost} updateUser={this.updateUser} currentUser={this.state.currentUser.name}/>
        </div>
      );
    }
  }
}

export default App;
