/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {registerLicense} from '@syncfusion/ej2-base'
registerLicense("ORg4AjUWIQA/Gnt2XFhhQlJHfVhdX3xLflFzVWRTfl16dVFWESFaRnZdR11lSXxTcURgXXpWeH1cTWJV")
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
