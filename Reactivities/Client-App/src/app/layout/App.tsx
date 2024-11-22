import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityList from '../../features/activities/dashboard/ActivityList';


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
    <ActivityDashboard activites={activites} />
    
    </Container>
   </>
  )
}

export default App
