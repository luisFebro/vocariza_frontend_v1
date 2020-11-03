import { API } from "../config";
// URLs ONLY
// user
export const getTestMsg = () => `${API}/user/test/msg`;
// export const updateUser = (userId) => `/api/user/${userId}?noResponse=true`;
// export const removeUser = (userId) => `/api/user/${userId}`;

// // client's register
// export const readUserList = (cliAdminId) =>
//     `/api/user/list/all?bizId=${cliAdminId}`;
// export const readHighestScores = (cliAdminId) =>
//     `/api/user/list/highest-scores?bizId=${cliAdminId}`;

// // Purchase's History
// export const readPurchaseCardsList = (userId) =>
//     `/api/user/list/purchase-history/${userId}`;
// export const readPrizes = (userId) =>
//     `/api/user/list/purchase-history/prizes/${userId}`;
// export const changePrizeStatus = (cliUserId, statusType) =>
//     `/api/user/purchase-history/update-status/${cliUserId}?statusType=${statusType}`; // PUT - +params: newValue, taskId

// // Automatic Tasks
// export const readTasks = (userId, doneStatus) =>
//     `/api/task/read/${userId}?doneStatus=${doneStatus}`; // GET
// export const addTask = (userId) => `/api/task/add?userId=${userId}`; // PUT
// export const toggleDoneUrl = () => `/api/task/toggle`; // PUT
// export const removeTaskAndExpireCliPrize = () => `/api/task/remove-and-expire`;

// // Notifications
// export const readNotifications = (userId) => `/api/notification/read/${userId}`; // GET

// // SMS
// export const readContacts = (userId) =>
//     `/api/sms/read/contacts?userId=${userId}`;
// export const sendSMS = () => `/api/sms/send`; // POST
// export const readCredits = (userId) => `/api/sms/credits/read?userId=${userId}`;
// export const getGeneralTotals = (userId) =>
//     `/api/sms/history/general-totals?userId=${userId}`;
// export const readSMSMainHistory = (userId) =>
//     `/api/sms/history/read-main?userId=${userId}`;
// export const readSMSHistoryStatement = (userId, cardId) =>
//     `/api/sms/history/read-statement?userId=${userId}&cardId=${cardId}`;
// export const cancelSMS = (userId, cardId) =>
//     `/api/sms/cancel?userId=${userId}&cardId=${cardId}`;
// export const readAutoService = (userId) =>
//     `/api/sms/automatic/read?userId=${userId}`;
// export const activateAutoService = () => `/api/sms/automatic/activate`; // POST

// // PAY
// export const startCheckout = () => `/api/pay/transparent-checkout/start`; // POST
// export const finishCheckout = () => `/api/pay/transparent-checkout/finish`; // POST
// export const readTransactionHistory = () => `/api/pay/transactions/history`; // GET

// // PRO
// export const getProData = (userId) =>
//     `/api/pro/pro-member-data?userId=${userId}`; // POST
// export const getNextExpiryDate = (userId) =>
//     `/api/pro/service/next-expiry-date?userId=${userId}`; // GET
// export const removeServices = (userId) =>
//     `/api/pro/service/remove?userId=${userId}`; // DELETE

// // PASSWORD AND AUTH
// export const checkPassword = () => `/api/auth/pswd/check`;
// export const getDecryptedToken = () => `/api/auth/pswd/decrypt-token`;
// export const getToken = () => `/api/auth/pswd/token`;
// export const forgotPasswordRequest = () => `/api/auth/pswd/forgot`;
// export const recoverPassword = () => `/api/auth/pswd/recover`;
// export const changePassword = () => `/api/auth/pswd/change`;
// export const createPassword = () => `/api/auth/pswd/create`;
