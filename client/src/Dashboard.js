import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import DashboardTopic from './DashboardTopic';
const { io } = require('socket.io-client');
const socket = io();

socket.on('addNewTopic', () => {
  console.log('adding new topic involving sockets?')
})

function Dashboard() {
  const [topics, setTopics] = useState([]);
  
  useEffect (() => { 
    axios.get('http://localhost:9000/topic')
    .then((res) => {
      setTopics(res.data)
    })
    .catch(err => console.log('err in data', err))
  } , [])


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
    return axios.post('http://localhost:9000/topic', {
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