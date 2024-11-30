import { Header, Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ActivitiyListItem from './ActivitiyListItem';
import { Fragment } from 'react/jsx-runtime';
export default observer(function ActivityList() {
  const {acitivityStore} = useStore();
  const {groupActivities} = acitivityStore;

  return (
    <>
    {groupActivities.map(([group,activities]) => (
      <Fragment key={group}>
        <Header sub color='teal'>
          {group}
        </Header>
          {activities.map(activity => (
            <ActivitiyListItem key={activity.id} activity={activity} />
          ))};
      </Fragment>
    ))}
    </>



  )
})
