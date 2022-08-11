import React, { useState } from 'react';
import axios from 'axios';
const { io } = require('socket.io-client');
const socket = io('http://localhost:9000/');



function DashboardTopic(props) {
  const [topics, setTopics] = useState(props.topics);

  // console.log('props', props)
  // console.log('topics', topics)

  socket.on('deleteTopic', (id) => {
    console.log('myellow')
    const updatedTopics = topics.filter((topic) => {
      return topic._id !== id
    });

    console.log('updated topics array', updatedTopics)

    setTopics(updatedTopics)
  });


  const deleteTopic = (topicId) => {
    axios.delete(`/topic/${topicId}`)
  }

  return (
    <li>
      {props.name} 
      <button onClick={() => deleteTopic(props.id)} type='delete'>Delete topic</button>
    </li>
  )
}

export default DashboardTopic