import { TabataTimerActionTypes, TabataTimerActions } from '../actions/tabata-timer';

export interface TabataTimerState {
  totalTime: number;
}

const initialState: TabataTimerState = {
  totalTime: 0,
};

export function reducer(
  state: TabataTimerState = initialState,
  action: TabataTimerActions
): TabataTimerState {
  switch (action.type) {
    case TabataTimerActionTypes.UpdateTotalTime:
      return { totalTime: action.payload };

    default:
      return state;
  }
}

// export const getShowSidenav = (state: TabataTimerState) => state.showSidenav;
