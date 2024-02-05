import actions from "../action/actions";

const initialState = {
  bookingData: [],
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BOOKING_DATA:
      return {
        ...state,
        bookingData: action.data,
      };
    default:
      return state;
  }
};

export default booking;
