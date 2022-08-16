import React, {useState} from 'react';
import axios from 'axios';




function DashboardTopic(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [topic, setTopic] = useState('');

  const deleteTopic = (topicId) => {
    axios.delete(`/topic/${topicId}`)
  };

  const renameTopic = (topicId, nameChange) => {
    axios.patch(`topic/${topicId}`, {
      name: nameChange
     });
    setIsEditing(false);
    setTopic('');
  };

  return (

      <li>
        { 
        isEditing ? 
        <>
        <input
            type="text"
            name="name"
            placeholder="Update Topic name"
            onChange={event => setTopic(event.target.value)}
            value={topic} />
            <button type="submit" onClick={() => renameTopic(props.id, topic)}>Submit New Name</button>
            <button type="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </>    
            : 
            <> 
            <a href={`/dashboard/${props.id}`}>{props.name}</a>
            <button onClick={() => deleteTopic(props.id)} type='delete'>Delete Topic</button>
            <button onClick={() => setIsEditing(true)}>Rename Topic</button>
            </>
          }
      </li>
   
  )
}

export default DashboardTopic