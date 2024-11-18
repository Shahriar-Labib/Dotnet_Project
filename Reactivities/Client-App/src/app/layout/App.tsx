import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';


function App() {
  const [activites,setActivites] = useState<Activity[]>([]);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities')
    .then(response => {
      console.log(response);
      setActivites(response.data)
    })
  },[])
  return (
   <>
    <NavBar/>
    <Container style={{marginTop: '7em'}}>
    <List>
      {activites.map(activity => (
        <List.Item key={activity.id}>
          {activity.title}
        </List.Item>
      ))}
    </List>
    </Container>
   </>
  )
}

export default App
