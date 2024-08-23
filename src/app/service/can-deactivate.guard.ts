import {  CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}
export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};