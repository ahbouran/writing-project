import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import DashboardTopic from './DashboardTopic';
const { io } = require('socket.io-client');
const socket = io('http://localhost:9000/');



function Dashboard() {
  const [topics, setTopics] = useState([]);
  
  socket.on('addTopic', (newTopic) => {
    setTopics([...topics, newTopic])
  })

  socket.on('deleteTopic', (id) => {
    console.log('myellow')
    const updatedTopics = topics.filter((topic) => {
      return topic._id !== id
    });

    console.log('updated topics array', updatedTopics)

    setTopics(updatedTopics)
  })

  useEffect (() => { 
    axios.get('/topic')
    .then((res) => {
      setTopics(res.data)
    })
    .catch(err => console.log('err in data', err))
  } , [])

  console.log('topics outside useeffect', topics)

  const listTopics = topics.map((elm) => {
  return <DashboardTopic 
    key={elm._id} 
    name={elm.name}
    id={elm._id}
    />
  })
  

  const addNewTopic = (e) => {
    e.preventDefault();
    const newTopicName = e.target.name.value;
    return axios.post('/topic', {
      name: newTopicName
    })
    .then((res) => console.log("res", res))
    .catch(err => console.log(err.response));
  }



 
  return (

    <div>
      <h1>Dashboard</h1>
      <form onSubmit={addNewTopic}>
        <label htmlFor="topic-name">Topic Name</label><br/>
        <input type="text" name="name" placeholder="Insert topic name"></input>
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