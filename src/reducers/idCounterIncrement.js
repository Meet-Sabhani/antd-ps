import actions from "../action/actions";

const initialState = {
  userIdCounterData: 1,
};

const idCounterIncrement = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_ID_COUNTER:
      return {
        ...state,
        userIdCounterData: state.userIdCounterData + 1,
      };
    default:
      return state;
  }
};

export default idCounterIncrement;
