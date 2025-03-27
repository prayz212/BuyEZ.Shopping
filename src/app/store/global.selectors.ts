import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  globalSettingsFeatureKey,
  GlobalSettingsState,
} from './global.reducer';

export const selectGlobalSettingsState =
  createFeatureSelector<GlobalSettingsState>(globalSettingsFeatureKey);

export const selectToasts = createSelector(
  selectGlobalSettingsState,
  (state) => state.toasts
);
