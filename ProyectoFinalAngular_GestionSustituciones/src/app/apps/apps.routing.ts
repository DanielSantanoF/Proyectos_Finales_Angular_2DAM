import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { Routes } from '@angular/router';

export const AppsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: FullcalendarComponent
      }
    ]
  }
];
