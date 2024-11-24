import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'


function App() {
  const [activites,setActivites] = useState<Activity[]>([]);
  const [selectedActivities,setSelectedActivities] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/Activities')
    .then(response => {
      console.log(response);
      setActivites(response.data)
    })
  },[])

  function handleselectedActivity(id: string)
  {
    setSelectedActivities(activites.find(x => x.id === id));
  }

  function handleCancelActivity(){
    setSelectedActivities(undefined);
  }
  
  function handleEditActivity(id?: string)
  {
    id ? handleselectedActivity(id) : handleCancelActivity();
    setEditMode(true);
  }

  function handleEditClose(){
    setEditMode(false);
  }

  function handleAdd_EditActivity(activity: Activity){
    activity.id ? 
    setActivites([...activites.filter(x => x.id !== activity.id),activity]) :
    setActivites([...activites,{...activity, id : uuid()}])
    setEditMode(false);
    setSelectedActivities(activity);
  }

  function handleDeleteActivity(id: string)
  {
    setActivites([...activites.filter(x => x.id !== id)])
  }

  return (
   <>
    <NavBar openForm = {handleEditActivity}/>
    <Container style={{marginTop: '7em'}}>
    <ActivityDashboard activites={activites} 
    selectedActivities = {selectedActivities}
    selectActivities = {handleselectedActivity}
    cancelActivities = {handleCancelActivity}
    editMode = {editMode}
    openForm = {handleEditActivity}
    closeForm = {handleEditClose}
    add_edit={handleAdd_EditActivity}
    deleteActivity={handleDeleteActivity}
    />
    
    </Container>
   </>
  )
}

export default App
