import actions from "../action/actions";

const initialState = {
  filterData: [],
};

const filter = (state = initialState, action) => {
  switch (action.type) {
    case actions.FILTER_EVENT:
      return {
        filterData: action.data,
      };

    default:
      return state;
  }
};

export default filter;
