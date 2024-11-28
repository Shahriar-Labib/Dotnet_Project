import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityForm() {
   const {acitivityStore} = useStore();
   const {closeForm,selectedActivities:selectedActivity,addActivity,updateActivity,loading} = acitivityStore;


  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    discription: '', 
    date: '',
    city: '',
    venue: ''
  };

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    activity.id ? updateActivity(activity) : addActivity(activity);
  }

  function handleInputSubmit(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  

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
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
})