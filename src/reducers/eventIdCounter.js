import actions from "../action/actions";

const initialState = {
  eventIdCounterData: 1,
};

const eventIdCounter = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_EVENT_ID_COUNTER:
      return {
        ...state,
        eventIdCounterData: state.eventIdCounterData + 1,
      };
    default:
      return state;
  }
};

export default eventIdCounter;
