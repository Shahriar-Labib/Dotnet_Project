import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activity: Activity | undefined;
  closeForm: () => void;
  add_edit: (activity: Activity) => void; 
}

export default function ActivityForm({ activity, closeForm, add_edit }: Props) {
  const initialState: Activity = activity ?? {
    id: '',
    title: '',
    category: '',
    discription: '', 
    date: '',
    city: '',
    venue: ''
  };

  const [useactivity, setActivity] = useState<Activity>(initialState);

  function handleSubmit() {
    add_edit(useactivity);
  }

  function handleInputSubmit(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...useactivity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' value={useactivity.title} name='title' onChange={handleInputSubmit} />
        <Form.TextArea placeholder='Description' value={useactivity.discription} name='description' onChange={handleInputSubmit} />
        <Form.Input placeholder='Category' value={useactivity.category} name='category' onChange={handleInputSubmit} />
        <Form.Input placeholder='Date' value={useactivity.date} name='date' onChange={handleInputSubmit} />
        <Form.Input placeholder='City' value={useactivity.city} name='city' onChange={handleInputSubmit} />
        <Form.Input placeholder='Venue' value={useactivity.venue} name='venue' onChange={handleInputSubmit} />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
      </Form>
    </Segment>
  );
}