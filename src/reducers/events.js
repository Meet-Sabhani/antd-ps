import actions from "../action/actions";

const initialState = {
  eventsData: [],
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_EVENTS_DATA:
      return {
        ...state,
        eventsData: action.data,
      };
    case actions.DELETE_EVENT:
      const updatedEvents = state.eventsData.filter(
        (event) => event.id !== action.data
      );
      return {
        ...state,
        eventsData: updatedEvents,
      };
    default:
      return state;
  }
};

export default events;
