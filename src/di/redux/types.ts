import { Action } from '@reduxjs/toolkit';

export interface AppAction<T> extends Action<string> {
  payload: T;
}
