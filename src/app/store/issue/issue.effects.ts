import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IssueService } from '../../services/issue.service';
import * as IssueActions from './issue.actions';

@Injectable()
export class IssueEffects {
  submit$ = createEffect(() =>
    this.action$.pipe(
      ofType(IssueActions.submit),
      mergeMap((action) =>
        this.issues.save(action.issue).pipe(
          map((issue) => IssueActions.submitSuccess({ issue })),
          catchError(() => of(IssueActions.submitFailure()))
        )
      )
    )
  );

  constructor(
    private action$: Actions,
    private issues: IssueService,
    private store: Store
  ) {}
}
