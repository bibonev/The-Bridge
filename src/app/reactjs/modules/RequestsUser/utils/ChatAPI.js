import { showMessage } from '../actions';

let chatsock = null;
let flag1 = false;
let jsonTestMessage = '';

export const ChatAPI = {
  connect: (id) => {
    let ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + '/chat/requests/' + id);
  },

  listen: (store) => {
    chatsock.onmessage = (message) => {
        // identify messages from different sources
        let jsonMessage = JSON.stringify(message.data)
        if(flag1 || jsonTestMessage !== jsonMessage){
            store.dispatch(showMessage(JSON.parse(message.data)))
            flag1 = false;
            jsonTestMessage = jsonMessage;
        }
    }
  },

  send: (handler, message) => {
        let send_message = {
            handle: handler,
            handle_type: 'user',
            message: message,
        }
    flag1 = true;
    chatsock.send(JSON.stringify(send_message));
  },
};