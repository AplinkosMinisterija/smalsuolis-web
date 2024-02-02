import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../utils/types';
import type { RootState } from '../store';

export interface UserReducerProps {
  userData: User;
  loggedIn: boolean;
}

const initialState: UserReducerProps = {
  userData: { id: '', firstName: '', lastName: '', email: '' },
  loggedIn: false,
};

export const UserReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { userData, loggedIn } = action.payload;
      return {
        ...state,
        userData: { ...userData },
        loggedIn: loggedIn,
        error: '',
      };
    },
  },
});

export const selectUser = (state: RootState) => state;

export const actions = UserReducer.actions;

export default UserReducer.reducer;
