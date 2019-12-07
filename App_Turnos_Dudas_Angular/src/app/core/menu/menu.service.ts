import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class MenuService {

  constructor(public translate: TranslateService) {}

  getAllAlumno() {
    return [
      {
        link: '/',
        label: 'Menú principal',
        icon: 'explore'
      },
      {
        link: '/modalidades',
        label: 'Cursos',
        icon: 'class'
      },
      {
        link: '/turnos',
        label: 'Turnos Dudas',
        icon: 'format_list_numbered'
      }
    ];
  }

  getAllProfesor() {
    return [
      {
        link: '/',
        label: 'Menú principal',
        icon: 'explore'
      },
      {
        link: '/modalidades',
        label: 'Cursos',
        icon: 'class'
      },
      {
        link: '/turnos',
        label: 'Turnos Dudas',
        icon: 'format_list_numbered'
      },
      {
        link: '/historicoTurnos',
        label: 'Historico de turnos',
        icon: 'playlist_add_check'
      }
    ];
  }

}
