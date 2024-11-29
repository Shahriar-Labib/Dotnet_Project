import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Image,
    Button,
  } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
export default observer(function ActivityDetails() {

  const {acitivityStore} = useStore();
  const {selectedActivities: activities,loadActivity,loadingInitial} = acitivityStore;
  const {id} = useParams();
  
  useEffect(() => {
    if(id) loadActivity(id);
  },[id,loadActivity])

  if(loadingInitial || !activities) return <LoadingComponent />;

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
        <Button as={Link} to={`/manage/${activities.id}`}  basic content='Edit' color='blue' />
        <Button as={Link} to='/activities'  basic content='Cancel' color='grey' />
      </Button.Group>
    </CardContent>
  </Card>
  )
})
