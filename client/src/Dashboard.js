import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import DashboardTopic from './DashboardTopic';
const { io } = require('socket.io-client');
const socket = io('http://localhost:9000/');



function Dashboard() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic]= useState('');

  socket.on('addTopic', (newTopic) => {
    setTopics([...topics, newTopic])
  });


  socket.on('deleteTopic', (id) => {
    const updatedTopics = topics.filter((topic) => {
      return topic._id !== id
    });


    setTopics(updatedTopics)
  });

  socket.on('updateTopic', (updatedTopic) => {
    if (topics.length) {
  
    let currentTopics = [...topics];
        
    const index = currentTopics.map(topic => topic._id).indexOf(`${updatedTopic._id}`);
    
    currentTopics.splice(index, 1, updatedTopic);
    
    setTopics(currentTopics);
    }
  })

  useEffect(() => {
    fetchTopics();

  }, []);

  async function fetchTopics() {
    const res = await axios.get('/topic');
    setTopics(res.data)
  };


  const listTopics = topics.map((elm) => {
  return <DashboardTopic 
    key={elm._id} 
    name={elm.name}
    id={elm._id}
    topics={topics}
    />
  });
  

  const addNewTopic = (e) => {
    e.preventDefault();
    
    const newTopicName = topic;
    axios.post('/topic', {
      name: newTopicName
    })
    .then((res) => console.log("res", res))
    .catch(err => console.log(err.response));
    
    setTopic('');
  };



 
  return (

    <div>
      <h1>Dashboard</h1>
      <form onSubmit={addNewTopic}>
        <label htmlFor="topic-name">Topic Name</label><br/>
        <input 
        type="text" 
        name="name" 
        placeholder="Insert topic name" 
        onChange={event => setTopic(event.target.value)}
        value={topic}
        />
        <button type="submit">Submit New Topic</button> 
      </form>
      <br></br><br></br>
      
      <h1>List of Topics You Have</h1>
        <ul>
          {listTopics}
        </ul>
        
    </div>
  );
}

export default Dashboard