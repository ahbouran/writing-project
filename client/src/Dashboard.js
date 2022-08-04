import React, { useEffect } from 'react';
import axios from 'axios'; 

function Dashboard() {
  
  
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

      <ul>

      </ul>

    </div>
  );
}

export default Dashboard;