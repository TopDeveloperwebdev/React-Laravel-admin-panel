/*
 *
 * Chat App Reducers
 */
import update from 'react-addons-update';

// actions types
import {
   CHAT_WITH_SELECTED_USER,
   SEND_MESSAGE_TO_USER,
   UPDATE_USERS_SEARCH,
   SEARCH_USERS,
   UPDATE_USERS,
   GET_RECENT_CHAT_USERS,
   GET_DEFAULT_SELECTED_USER,
   CHAT_CONVERSATIONS_TYPE
} from 'actions/Types';

// chat users
import recentChat from 'assets/Data/ChatAppUsers.json';

// const INITIAL_STATE = {
//    admin_photo_url: require('assets/Images/avatars/user-6.jpg'),
//    recentChatUsers: recentChat.data,
//    allRecentChatUsers: recentChat.data,
//    allChatUsers: recentChat.data,
//    selectedUser: recentChat.data[1],
//    searchUsers: '',
//    isSidebarShow: true,
//    conversationType: 'all'
// };
const INITIAL_STATE = {
   admin_photo_url: require('assets/Images/avatars/user-6.jpg'),
   recentChatUsers: recentChat.data,
   allRecentChatUsers: recentChat.data,
   allChatUsers: recentChat.data,
   selectedUser: recentChat.data[0],
   searchUsers: '',
   isSidebarShow: true,
   conversationType: 'all' ,
   btnType : 'all'

}
console.log('INITIAL_STATE', INITIAL_STATE);

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      // get recent chat user
      case GET_RECENT_CHAT_USERS:
         return { ...state, recentChat };

      // get selected user
      case GET_DEFAULT_SELECTED_USER:
         let selectUser = 1;
         let user = state.recentChatUsers.filter((item) => item.id === selectUser)
         return update(
            state,
            { selectedUser: { $set: user[0] } }
         );

      // chat with selected user
      case CHAT_WITH_SELECTED_USER:
         let indexOfSelectedUser;
         indexOfSelectedUser = state.recentChatUsers.indexOf(action.payload);
         return update(state, {
            selectedUser: { $set: action.payload },
            recentChatUsers: {
               [indexOfSelectedUser]: {
                  isSelectedChat: { $set: true },
                  new_message_count: { $set: 0 }
               }
            }
         });

      case CHAT_CONVERSATIONS_TYPE:
         state.isSidebarShow = true;
         const filterdata = state.allChatUsers.filter((User) => {
                console.log('user.orderdetail' , User.orderDetails);
            if (action.payload == 'Offen') {
              let orderDetails = User.orderDetails.filter((user) => user.done == false);
               return orderDetails.length;
            }
            else if (action.payload == 'Erledigt') {
              let  orderDetails = User.orderDetails.filter((user) => user.done == true);
               return orderDetails.length == state.selectedUser.orderDetails.length;
            }
            else if(action.payload == 'all'){
               return true;
            }
         });
      
       
         return {
            ...state,
            recentChatUsers: filterdata, 
            btnType : action.payload       
      
         };
  
      case SEND_MESSAGE_TO_USER:
         let adminReplyData = {
            isAdmin: action.payload.isAdmin,
            comment: action.payload.comment,
            sent: action.payload.time
         };
         let pos = state.selectedUser.commentList.length;
         return update(state, {
            selectedUser: { commentList: { $splice: [[pos, 0, adminReplyData]] } }
         })
      case UPDATE_USERS:
         console.log('action.payload', action.payload);
         return { ...state, ...action.payload };
      // update search
      case UPDATE_USERS_SEARCH:
         return { ...state, searchUsers: action.payload };

      // search user
      case SEARCH_USERS:
         if (action.payload === '') {
            return { ...state, recentChatUsers: state.allChatUsers };
         } else {
            const searchUsers = state.allRecentChatUsers.filter((user) => {
               if (user.patient) {
                  console.log('search', user.patient.firstName, action.payload.toLowerCase());
                  let name = user.patient.firstName ? user.patient.firstName : '';
                  name += user.patient.lastName ? user.patient.lastName : '';
                  return name.toLowerCase().indexOf(action.payload.toLowerCase()) > -1;
               }
               else return -1;
            }
            )
            return { ...state, recentChatUsers: searchUsers }
         }

      default: return { ...state };
   }
}