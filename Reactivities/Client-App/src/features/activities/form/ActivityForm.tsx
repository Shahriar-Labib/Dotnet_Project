import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {v4 as uuid} from 'uuid'
export default observer(function ActivityForm() {
   const {acitivityStore} = useStore();
   const {selectedActivities:selectedActivity,addActivity,updateActivity,loading,loadActivity,loadingInitial} = acitivityStore;
   const {id} = useParams();
   const navigate = useNavigate();
   const [activity,setActivity] = useState<Activity>({
    id: '',
    title: '',
    category: '',
    discription: '', 
    date: '',
    city: '',
    venue: ''
   })
 useEffect(() => {
  if(id) loadActivity(id).then(activity => setActivity(activity!))
 },[id,loadActivity])

  function handleSubmit() {
    if(!activity.id){
      activity.id = uuid();
      addActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
    else{
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
   
  }

  function handleInputSubmit(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  if(loadingInitial) return <LoadingComponent context = "Loading activity..." />

  

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputSubmit} />
        <Form.TextArea placeholder='Description' value={activity.discription} name='discription' onChange={handleInputSubmit} />
        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputSubmit} />
        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleInputSubmit} />
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputSubmit} />
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputSubmit} />
        <Button loading={loading} floated='right' positive type='submit' content='Submit' />
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
})