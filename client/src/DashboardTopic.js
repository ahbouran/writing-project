import React from 'react';
import axios from 'axios';

function DashboardTopic(props) {

  const deleteTopic = (topicId, e) => {
    console.log('e', e)
    console.log('topicId', topicId)
    console.log('This is in the delete topic function')
    axios.delete(`http://localhost:9000/topic/${topicId}`)
  }


  return (
    <li>
      {props.name}
      <button onClick={() => deleteTopic(props.id)} type='delete'>Delete topic</button>
    </li>
  )
}

export default DashboardTopic