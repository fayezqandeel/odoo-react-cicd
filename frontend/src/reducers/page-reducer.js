
export default function reducer(state = { pages: [] }, action) {
  switch (action.type) {
    // getting advertisers fro server and load it into redux state
    case 'FETCH_PAGES': {
      return Object.assign({}, state, { pages: action.payload });
    }
    default: {
      break;
    }
  }
  return state;
}
