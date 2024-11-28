import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent";
import {v4 as uuid} from 'uuid'
export default class ActivityStore{
   activities: Activity[] = [];
   selectedActivities: Activity | undefined = undefined;
   editMode = false;
   loading = false;
   loadingInitial = false;
    
    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async() => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();
           
                activities.data.forEach(activity => {
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                  })
                  this.setLoadingInitial(false);
            
        } catch (error) {
            console.log(error);
           
                this.setLoadingInitial(false);
          
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectActivity = (id: string) => {
        this.selectedActivities = this.activities.find(a => a.id === id)
    }

    cancelActivity = () => {
        this.selectedActivities = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    addActivity = async(activity: Activity) => {
        this.loading = true;
        activity.id = uuid();

        try {
            await agent.Activities.add(activity);
            
            runInAction(() => {
                this.activities.push(activity);
                this.selectedActivities = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async(activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
               this.activities =  [...this.activities.filter(a => a.id !== activity.id),activity];
               this.selectedActivities = activity;
               this.loading = false;
               this.editMode = false;
            })
            
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async(id: string) => {
        this.loading = true;
        
        try {
            await agent.Activities.delete(id);
            
            runInAction(() => {
                this.activities =  [...this.activities.filter(a => a.id !== id)];
                if(this.selectedActivities?.id === id) this.cancelActivity();
                this.loading = false;
            })
        } catch (error) {
            console.log(error)

            runInAction(() => {
                this.loading = false;
            })
        }
    }
}