import { TabataTimerActionTypes, TabataTimerActions } from '../actions/tabata-timer';
import { TabataParams } from '../models/tabata';
import { Status } from '../enums/status';
import { DefaultParams } from '../enums/default-params';

export interface State {
  isStarted: boolean;
  totalTime: string;
  totalSeconds: number;
  totalRounds: number;
  currentTime: number;
  currentRound: number;
  segmentSecondsLeft: number;
  params: TabataParams;
  status: string;
}

const initialState: State = {
  isStarted: false,
  totalTime: '',
  totalSeconds: 0,
  totalRounds: DefaultParams.ROUNDS * DefaultParams.TABATAS,
  currentTime: 0,
  currentRound: 1,
  segmentSecondsLeft: 0,
  params: {
    tabatas: DefaultParams.TABATAS,
    tabataTimeOff: DefaultParams.TABATA_TIME_OFF,
    rounds: DefaultParams.ROUNDS,
    roundTimeOn: DefaultParams.TIME_ON,
    roundTimeOff: DefaultParams.TIME_OFF,
    preparationTime: DefaultParams.PREPARATION_TIME
  },
  status: Status.IDLE
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
      const totalRounds = params.tabatas * params.rounds;

      return { ...state, params, totalTime, totalSeconds, totalRounds };
    case TabataTimerActionTypes.StartTabata:
      return { ...state, isStarted: true, currentTime: 0, currentRound: 1, status: Status.PREPARATION };

    case TabataTimerActionTypes.FinishPreparation:
    case TabataTimerActionTypes.FinishRest:
      return { ...state, status: Status.ROUND };

    case TabataTimerActionTypes.FinishRound:
      return { ...state, status: Status.REST, currentRound: state.currentRound + 1 };

    case TabataTimerActionTypes.FinishTimer:
      return { ...state, status: Status.IDLE, isStarted: false };

    case TabataTimerActionTypes.IncrementSeconds:
      return { ...state, currentTime: state.currentTime + 1 };

    case TabataTimerActionTypes.ResetTabata:
      return { ...state, currentTime: 0, currentRound: 1, status: Status.IDLE, isStarted: false, segmentSecondsLeft: 0 };

    case TabataTimerActionTypes.SaveSegmentTimeLeft:
      return { ...state, segmentSecondsLeft: action.payload };

    case TabataTimerActionTypes.PauseTabata:
      return { ...state, isStarted: false };

    case TabataTimerActionTypes.ResumeTabata:
      return { ...state, isStarted: true };

    default:
      return state;
  }
}
