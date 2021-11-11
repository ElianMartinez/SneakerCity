import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import config from '../../config';

const initialState = {
  isLoading: false,
  error: false,
  gruposList: []
};

const slice = createSlice({
  name: 'grupos',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getGruposListSuccess(state, action) {
      state.isLoading = false;
      state.error = false;
      state.gruposList = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow } = slice.actions;

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
