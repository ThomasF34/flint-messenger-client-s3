import axios from 'axios';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateProfileFormStatus } from './updateProfileFormStatus';
import { makeExitApplication } from '../../layout/actions/makeExitApplication';

export const makeDeleteProfile = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    // FIXME confirm before sending

    dispatch(updateProfileFormStatus('unavailable'));

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true });
      dispatch(makeExitApplication());
    } catch (error) {
      dispatch(updateProfileFormStatus('error'));
    }
  };
});
