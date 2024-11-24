import { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';




function App() {
  const [activites,setActivites] = useState<Activity[]>([]);
  const [selectedActivities,setSelectedActivities] = useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [Loading,setLoadig] = useState(true);
  const[submitting,setSubmitting] = useState(false);

  useEffect(() => {
   agent.Activities.list().then(response => {
      console.log(response);
      let activites: Activity[] = [];
      response.data.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activites.push(activity);
      });

      setActivites(activites);
      setLoadig(false);
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
    setSubmitting(true);

    if(activity.id){
      agent.Activities.update(activity).then(() => {
      setActivites([...activites.filter(x => x.id !== activity.id),activity])
      setSelectedActivities(activity)
      setEditMode(false)
      setSubmitting(false)
      })
    }
    else{
      activity.id = uuid();
      agent.Activities.add(activity).then(() => {
      setActivites([...activites,activity])
      setSelectedActivities(activity)
      setEditMode(false)
      setSubmitting(false)
      })
    }
  }

  function handleDeleteActivity(id: string)
  {
    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
    setActivites([...activites.filter(x => x.id !== id)]);
    setSubmitting(false);
    })
  }


  if(Loading) return <LoadingComponent context='Loading app' />

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
    submitting = {submitting}
    />
    
    </Container>
   </>
  )
}

export default App
