import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.onNewPost = this.onNewPost.bind(this); 
  }
  
  componentDidMount() {
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
    }, 3000);
  }

  onNewPost(content) {
    const id = this.state.messages.length + 1;
    const newMessage = {id: id, username: this.state.currentUser.name, content: content }
    console.log(newMessage);
    const messages = this.state.messages.concat(newMessage)
    console.log(messages)
    this.setState({
      messages: messages})
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar onNewPost={ this.onNewPost } currentUser = {this.state.currentUser.name}/>
        </div>
      );
    }
  }
}
export default App;
