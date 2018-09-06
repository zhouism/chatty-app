import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
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
     
      const msg = JSON.parse(evt.data);
      console.log(msg)
      const message = {
        id: msg.id,
        username: msg.username,
        content: msg.content
      };
      let newMessages = this.state.messages;
      newMessages.concat(message);
      const messages = this.state.messages.concat(message);

      this.setState({
        messages: messages
      })
    }

    

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({
        loading: false,
        messages: messages})
    }, 500);
  }

  onNewPost(content) {
    const newMessage = { content: content }
    this.socket.send(JSON.stringify(newMessage));
    } 
  
  updateUser(username) {
    const newUser = { username: username }
    this.socket.send(JSON.stringify(newUser));
    }    
  


  render() {
    if (this.state.loading) {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={ this.onNewPost } updateUser={this.updateUser} currentUser = {this.state.currentUser.name}/>
        </div>
      );
      
    }
  }
}

export default App;
