# DialogServiceMatDemo

A minimal demo to use [dialog-service](https://github.com/kctang/dialog-service).

1. Create new Angular project, install Angular Material and `dialog-service`.
```
ng new mat-demo --minimal=true
cd mat-demo
ng add @angular/material
npm install dialog-service
```

2. Import the module `MatDialogServiceModule` in `app.module.ts`.

3. Extract template from `app.component.ts` to `app.component.html`.

4. Add button to `app.component.html` that when clicked, triggers `doDemo()` in component.

````typescript
  doDemo () {
    // simple demo
    this.dialogService.withAlert('Hello!')

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
````

5. Start the app with `ng serve` and click on the 'Demo' button.
