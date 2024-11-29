import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
export default observer(function ActivityDashboard() {

  const {acitivityStore} = useStore();
  const {loadActivities,activityRegistry} = acitivityStore;

useEffect(() => {
   if(activityRegistry.size <= 1)  loadActivities();
},[activityRegistry.size,loadActivities])

  if(acitivityStore.loadingInitial) return <LoadingComponent context='Loading app' />


  return (
   <Grid>
    <Grid.Column width='10'>
    <ActivityList/>
    </Grid.Column>
    <Grid.Column width='6'>
        <h2>Activity fillters</h2>
    </Grid.Column>
   </Grid>
  )
})
