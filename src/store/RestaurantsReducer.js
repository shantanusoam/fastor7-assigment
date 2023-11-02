const initialState = [];

export const RestaurantsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_DATA":
      return payload;
    default:
      return state;
  }
};
