const actions = {
  SET_LOGIN_DATA: "SET_LOGIN_DATA",
  SET_CURRENT_USER_DATA: "SET_CURRENT_USER_DATA",
  SET_ID_COUNTER: "SET_ID_COUNTER",
  SET_EVENTS_DATA: "SET_EVENTS_DATA",
  SET_EVENT_ID_COUNTER: " SET_EVENT_ID_COUNTER",
  SET_BOOKING_DATA: " SET_BOOKING_DATA",
  DELETE_EVENT: "DELETE_EVENT",
  FILTER_EVENT: "FILTER_EVENT",

  setLoginData: (data) => ({
    type: actions.SET_LOGIN_DATA,
    data,
  }),
  setCurrentUserData: (data) => ({
    type: actions.SET_CURRENT_USER_DATA,
    data,
  }),
  setUserIdCounterData: (data) => ({
    type: actions.SET_ID_COUNTER,
    data,
  }),
  setEventsData: (data) => ({
    type: actions.SET_EVENTS_DATA,
    data,
  }),
  setDeleteEvent: (data) => ({ type: actions.DELETE_EVENT, data }),
  setEventIdCounterData: (data) => ({
    type: actions.SET_EVENT_ID_COUNTER,
    data,
  }),
  setBookingData: (data) => ({
    type: actions.SET_BOOKING_DATA,
    data,
  }),
  setFilterData: (data) => ({
    type: actions.FILTER_EVENT,
    data,
  }),
};

export default actions;
