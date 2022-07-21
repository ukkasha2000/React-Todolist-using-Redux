import { createStore } from "redux";
// import thunk from "redux-thunk"; 
//, applyMiddleware 
import rootReducers from "./reducers/rootReducer";

const store = createStore(rootReducers);
//, {}, applyMiddleware(thunk)

export default store;