import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

function Dashboard() {
  const [topics, setTopics] = useState([]);
  console.log('topics', topics)
  const getTopics = (e) => {
    e.preventDefault();
    return axios.get('http://localhost:9000/topic')
    .then((res) => console.log('res', setTopics(res.data)))
  }

  const listTopics = () => {
    return <h2>something</h2>
  }
  
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
      <ul>
        <h1>List of Topics You Have</h1>
        {listTopics()}
      </ul>

    </div>
  );
}

export default Dashboard;