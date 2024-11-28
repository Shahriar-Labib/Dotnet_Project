import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
  } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default function ActivityDetails() {

  const {acitivityStore} = useStore();
  const {selectedActivities: activities,openForm,cancelActivity} = acitivityStore;

  if(!activities) return <LoadingComponent />;

  return (
    <Card fluid>
    <Image src={`/assets/categoryImages/${activities.category}.jpg`}/>
    <CardContent>
      <CardHeader>{activities.title}</CardHeader>
      <CardMeta>
        <span>{activities.date}</span>
      </CardMeta>
      <CardDescription>
       {activities.discription}
      </CardDescription>
    </CardContent>
    <CardContent extra>
      <Button.Group widths='2'>
        <Button onClick={() => {openForm(activities.id)}} basic content='Edit' color='blue' />
        <Button onClick={cancelActivity} basic content='Cancel' color='grey' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
