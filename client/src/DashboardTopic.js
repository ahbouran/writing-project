import React from 'react';
import axios from 'axios';

function DashboardTopic(props) {

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