import { Component } from '@angular/core'
import { DialogFormField, DialogService } from 'dialog-service'
import { filter } from 'rxjs/internal/operators/filter'
import { switchMap } from 'rxjs/operators'
import { tap } from 'rxjs/internal/operators/tap'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {
  title = 'dialog-service-mat-demo'

  constructor (private dialogService: DialogService) {
  }

  doDemo () {
    // simple demo
    // this.dialogService.withAlert('Hello!')

    // simple, form demo
    const fields: DialogFormField[] = [
      { title: 'Name' },
      { title: 'Gender', type: 'radio', options: [ 'Male', 'Female' ] },
    ]
    this.dialogService.withConfirm('Start now ok?').pipe(
      filter(ok => ok),
      switchMap(() => this.dialogService.withForm('Tell Me About Yourself', fields)),
      filter(values => values),
      tap(values => this.dialogService.withAlert('You?', {
        content: `FORM DATA: \n${JSON.stringify(values, null, 2)}`
      }))
    ).subscribe()
  }
}
