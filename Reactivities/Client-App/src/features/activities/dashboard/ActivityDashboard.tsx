import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilter from './ActivityFilter';
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
        <ActivityFilter />
    </Grid.Column>
   </Grid>
  )
})
