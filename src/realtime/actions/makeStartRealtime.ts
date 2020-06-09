import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import io from 'socket.io-client';
import { action } from '../../utils/action';
import { IAppState } from '../../appReducer';
import { updateRealtimeStatus } from './updateRealtimeStatus';
import { updateUserInfo } from '../../users/actions/updateUserInfo';
import { makeUpdateConversation } from '../../conversations/actions/makeUpdateConversation';
import { updateRealtimeSocket } from './updateRealtimeSocket';
import { realtimeReset } from './realtimeReset';
import { makeAcceptedCall } from '../../call/actions/makeAcceptedCall';
import { makeLeftCall } from '../../call/actions/makeLeftCall';
import { makeIncomingCall } from '../../call/actions/makeIncomingCall';

export const makeStartRealtime = action(() => {
  return async (dispatch: ThunkDispatch<IAppState, void, Action>, getState: () => IAppState) => {
    dispatch(updateRealtimeStatus('unavailable'));

    try {
      const socket = io.connect(`${process.env.REACT_APP_SOCKET}`);
      socket.on('connect', function () {
        dispatch(updateRealtimeStatus('ready'));
        console.log('============================== CONNECTED');
        dispatch(updateRealtimeSocket(socket));
        dispatch(updateRealtimeStatus('ready'));
      });

      socket.on('disconnect', function () {
        console.log('============================== DISCONNECTED');
        dispatch(realtimeReset());
      });

      socket.on('user-update', function (data: any) {
        console.log('============================== user-update');
        dispatch(updateUserInfo([data]));
      });
      
      socket.on('chat-message', function (data: any) {
        console.log('============================== chat-message');
        dispatch(makeUpdateConversation([data]));
      });

      socket.on('call-request', function (data: any) {
        console.log('============================== call-accepted');
        dispatch(makeIncomingCall(data.conversationId, data.emitter, data.offer));
      });

      socket.on('call-accepted', function (data: any) {
        console.log('============================== call-accepted');
        dispatch(makeAcceptedCall(data.conversationId, data.answer));
      });
      
      socket.on('call-left', function (data: any) {
        console.log('============================== call-left');
        dispatch(makeLeftCall(data.conversationId));
      });

      // FIXME FOR DEBUG
      (window as any).socket = socket;
    } catch (error) {
      dispatch(updateRealtimeStatus('unavailable'));
    }
  };
});