import { TabataTimerActionTypes, TabataTimerActions } from '../actions/tabata-timer';
import { TabataParams } from '../models/tabata';

export interface State {
  totalTime: string;
  totalSeconds: number;
  totalRounds: number;
  currentTime: number;
  currentRound: number;
  params: TabataParams;
}

const initialState: State = {
  totalTime: '',
  totalSeconds: 0,
  totalRounds: 0,
  currentTime: 0,
  currentRound: 0,
  params: null,
};

export function reducer(
  state: State = initialState,
  action: TabataTimerActions
): State {
  switch (action.type) {
    case TabataTimerActionTypes.UpdateTabataParams:
      const params: TabataParams = action.payload;
      const singleTabataSeconds: number = (params.rounds * params.roundTimeOn) + ((params.rounds - 1) * params.roundTimeOff);

      const totalSeconds = params.tabatas * singleTabataSeconds + ((params.tabatas - 1) * params.tabataTimeOff) + params.preparationTime;
      const totalTime = `${Math.trunc(totalSeconds / 60)}:${totalSeconds % 60}`;

      return { ...state, params, totalTime, totalSeconds };

    default:
      return state;
  }
}
