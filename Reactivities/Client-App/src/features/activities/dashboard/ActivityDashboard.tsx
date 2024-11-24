import React from 'react'
import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
interface Props{
    activites: Activity[];
    selectedActivities : Activity | undefined;
    selectActivities : (id:string) => void;
    cancelActivities : () => void;
    editMode: boolean;
    openForm: (id:string) => void;
    closeForm: () => void;
    add_edit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    
}
export default function ActivityDashboard({activites,selectActivities,selectedActivities,cancelActivities,editMode,openForm,closeForm,add_edit,deleteActivity}: Props) {
  return (
   <Grid>
    <Grid.Column width='10'>
    <ActivityList
     acitvites={activites} 
     selectActivities={selectActivities}
     deleteActivity = {deleteActivity}
      />
    </Grid.Column>
    <Grid.Column width='6'>
        {selectedActivities && !editMode && 

        <ActivityDetails 
        activities={selectedActivities} 
        cancelActivities={cancelActivities} 
        openForm = {openForm} />
        }

        {editMode && <ActivityForm closeForm = {closeForm} activity={selectedActivities} add_edit={add_edit} />}
    </Grid.Column>
   </Grid>
  )
}
