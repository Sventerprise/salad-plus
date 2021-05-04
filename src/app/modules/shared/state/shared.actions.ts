import { createAction, props } from '@ngrx/store';


export const updateHeader = createAction(
  '[Component] Update Header',
  props<{ header: string }>()
)




