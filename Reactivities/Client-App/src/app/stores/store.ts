import { createContext, useContext } from "react";
import ActivityStore from "./ActivityStore";

interface Store{
    acitivityStore: ActivityStore
}

export const store: Store = {
    acitivityStore: new ActivityStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}