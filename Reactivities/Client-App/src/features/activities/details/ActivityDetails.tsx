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
import { Activity } from '../../../app/models/activity'
interface Props{
    activities: Activity;
    cancelActivities : () => void; 
    openForm: (id:string) => void;
    
}
export default function ActivityDetails({activities,cancelActivities,openForm}: Props) {
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
        <Button onClick={cancelActivities} basic content='Cancel' color='grey' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
