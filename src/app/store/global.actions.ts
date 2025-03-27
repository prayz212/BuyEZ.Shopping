import { createAction, props } from '@ngrx/store';
import { Toast } from './models/toast.model';

/*  Toast actions  */
const showToast = createAction(
  '[Global Settings] Show Toast',
  props<{ toast: Toast }>()
);
const hideToast = createAction('[Global Settings] Hide Toast', props<{ id: string }>());

export const GlobalSettingsActions = {
  showToast,
  hideToast,
};
