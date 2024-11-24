import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  add_edit: (activity: Activity) => void; 
  submitting: boolean
}

export default function ActivityForm({ activity: selectedActivity, closeForm,add_edit,submitting}: Props) {
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
    console.log(activity);
    add_edit(activity);
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
        <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}