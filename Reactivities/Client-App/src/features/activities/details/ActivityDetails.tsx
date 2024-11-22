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
}
export default function ActivityDetails({activities}: Props) {
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
        <Button basic content='Edit' color='blue' />
        <Button basic content='Cancel' color='grey' />
      </Button.Group>
    </CardContent>
  </Card>
  )
}
