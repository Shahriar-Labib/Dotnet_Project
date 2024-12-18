import {
  Grid,
} from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailsChat from './ActivityDetailsChat';
import ActivityDetailsSidebar from './ActivityDetailsSidebar';
export default observer(function ActivityDetails() {

const {acitivityStore} = useStore();
const {selectedActivities: activities,loadActivity,loadingInitial} = acitivityStore;
const {id} = useParams();

useEffect(() => {
  if(id) loadActivity(id);
},[id,loadActivity])

if(loadingInitial || !activities) return <LoadingComponent />;

return (
  <Grid>
    <Grid.Column width={10}>
      <ActivityDetailedHeader activity={activities} />
      <ActivityDetailedInfo activity={activities} />
      <ActivityDetailsChat />
    </Grid.Column>
    <Grid.Column width={6}>
      <ActivityDetailsSidebar />
    </Grid.Column>
  </Grid>
)
})