import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

  constructor() { }


  public handelError(err: any): any {
    if (err instanceof HttpErrorResponse && err != null) {
      if (err.error.errors) {
        return err.error.errors;
      } else {
        return 'Connection refused';
      }
    } else {
      console.log(err);
      return 'Connection refused';
    }

  }

}
