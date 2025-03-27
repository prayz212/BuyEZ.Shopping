import { createReducer, on } from '@ngrx/store';
import { GlobalSettingsActions } from './global.actions';
import { Toast } from './models/toast.model';

export const globalSettingsFeatureKey = 'global-settings';

export interface GlobalSettingsState {
  toasts: Toast[];
}

export const initialState: GlobalSettingsState = {
  toasts: [],
};

export const globalSettingsReducer = createReducer(
  initialState,

  /*  Toast reducers  */
  on(GlobalSettingsActions.showToast, (state, { toast }) => ({
    ...state,
    toasts: [...state.toasts, toast],
  })),
  on(GlobalSettingsActions.hideToast, (state, { id }) => ({
    ...state,
    toasts: [...state.toasts.filter((t) => t.id !== id)],
  }))
);
