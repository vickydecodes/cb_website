const baseUrl = import.meta.env.VITE_BASE_URL;
const notificationUrl = import.meta.env.VITE_NOTIFICATION_URL;

// Endpoints
const urls = {
  userRegistrationUrl: `${baseUrl}${import.meta.env.VITE_USER_REGISTRATION_ENDPOINT}`,
  emailStatusUpdateUrl: `${baseUrl}${import.meta.env.VITE_EMAIL_STATUS_UPDATE_ENDPOINT}`,
  collegeProfileCreationUrl: `${baseUrl}${import.meta.env.VITE_COLLEGE_PROFILE_CREATION_ENDPOINT}`,
  userLoginUrl: `${baseUrl}${import.meta.env.VITE_USER_LOGIN_ENDPOINT}`,
  addEventUrl: `${baseUrl}${import.meta.env.VITE_ADD_EVENT_ENDPOINT}`,
  deleteEventUrl: `${baseUrl}${import.meta.env.VITE_DELETE_EVENT_ENDPOINT}`,
  collegeProfileUrl: `${baseUrl}${import.meta.env.VITE_COLLEGE_PROFILE_ENDPOINT}`,
  collegeUpdateUrl: `${baseUrl}${import.meta.env.VITE_COLLEGE_PROFILE_UPDATE_ENDPOINT}`,
  pushNotificationUrl: `${notificationUrl}${import.meta.env.VITE_PUSH_NOTIFICATION_ENDPOINT}`,
  editPostUrl: `${baseUrl}${import.meta.env.VITE_EDIT_POSTER}`,
  sendSupportUrl: `${baseUrl}${import.meta.env.VITE_COLLEGE_SUPPORT_ENDPOINT}`,
  getEventsUrl: `${baseUrl}${import.meta.env.VITE_COLLEGE_GET_EVENTS_ENDPOINT}`,
  getEventCategoriesUrl: `${baseUrl}${import.meta.env.VITE_GET_EVENT_CATEGORIES}`
};

export default urls;


//   // Base URLs
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const notificationUrl = import.meta.env.VITE_NOTIFICATION_URL;

//   // Endpoints
//   const userRegistrationUrl = `${baseUrl}${
//     import.meta.env.VITE_USER_REGISTRATION_ENDPOINT
//   }`;
//   const emailStatusUpdateUrl = `${baseUrl}${
//     import.meta.env.VITE_EMAIL_STATUS_UPDATE_ENDPOINT
//   }`;
//   const collegeProfileCreationUrl = `${baseUrl}${
//     import.meta.env.VITE_COLLEGE_PROFILE_CREATION_ENDPOINT
//   }`;
//   const userLoginUrl = `${baseUrl}${import.meta.env.VITE_USER_LOGIN_ENDPOINT}`;

//   const addEventUrl = `${baseUrl}${import.meta.env.VITE_ADD_EVENT_ENDPOINT}`;
//   const deleteEventUrl = `${baseUrl}${
//     import.meta.env.VITE_DELETE_EVENT_ENDPOINT
//   }`;
//   const collegeProfileUrl = `${baseUrl}${
//     import.meta.env.VITE_COLLEGE_PROFILE_ENDPOINT
//   }`;
//   const collegeUpdateUrl = `${baseUrl}${
//     import.meta.env.VITE_COLLEGE_PROFILE_UPDATE_ENDPOINT
//   }`;
//   const pushNotificationUrl = `${notificationUrl}${
//     import.meta.env.VITE_PUSH_NOTIFICATION_ENDPOINT
//   }`;
//   const editPostUrl = `${baseUrl}${import.meta.env.VITE_EDIT_POSTER}`;
//   const sendSupportUrl = `${baseUrl}${
//     import.meta.env.VITE_COLLEGE_SUPPORT_ENDPOINT
//   }`;
//   const getEventsUrl = `${baseUrl}${
//     import.meta.env.VITE_COLLEGE_GET_EVENTS_ENDPOINT
//   }`;

//   const getEventCategories = `${baseUrl}${
//     import.meta.env.VITE_GET_EVENT_CATEGORIES
//   }`;
