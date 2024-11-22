import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
interface Props{
    activites: Activity[];
}
export default function ActivityDashboard({activites}: Props) {
  return (
   <Grid>
    <Grid.Column width='10'>
    <ActivityList acitvites={activites} />
    </Grid.Column>
    <Grid.Column width='6'>
        {activites[0] &&
        <ActivityDetails activities={activites[0]} />}
        <ActivityForm />
    </Grid.Column>
   </Grid>
  )
}
