import { legacy_createStore } from "redux";
import reducer from "../reducer/auth-reducer";

const store = legacy_createStore(reducer);

export default store