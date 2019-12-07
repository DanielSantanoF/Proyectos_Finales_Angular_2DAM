import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAll() {
    return [
      {
        link: '/',
        label: 'Menu',//this.translate.instant('HOME')
        icon: 'explore'
      },
      {
        link: '/apps/calendar',
        label: 'Calendario',
        icon: 'calendar_today'
      },
      {
        link: '/sustituciones',
        label: 'Sustituciones',
        icon: 'how_to_reg'
      },
      {
        link: '/disposiciones',
        label: 'Disposiciones',
        icon: 'low_priority'
      },
      {
        link: '/aulas',
        label: 'Aulas',
        icon: 'video_label'
      },
      {
        link: '/profesores',
        label: 'Profesores',
        icon: 'supervised_user_circle'
      },
      {
        link: '/historicoProfesores',
        label: 'Historico de profesores',
        icon: 'save_alt'
      },
      {
        link: '/generarPdfSustituciones',
        label: 'Generar pdf sustituciones',
        icon: 'picture_as_pdf'
      }
    ];
  }
}
