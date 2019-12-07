import { Component, OnInit } from '@angular/core';
import { MenuDto } from '../models/menuDto.dto';
import { Menus } from '../models/menu.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  historicoProfesores = new MenuDto("save_alt", "Historico Profesores", "Historico de profesores", "historicoProfesores");
  profesores = new MenuDto("supervised_user_circle", "Profesores", "Profesores del centro", "profesores");
  aulas = new MenuDto("video_label", "Aulas", "Aulas del centro", "aulas");
  sustituciones = new MenuDto("how_to_reg", "Sustituciones", "Lista de las sustituciones", "sustituciones");
  disposiciones = new MenuDto("low_priority", "Disposiciones", "Disposiciones y profesores disponibles", "disposiciones");
  calendario = new MenuDto("calendar_today", "Calendario de sustituciones", "Calendario interactivo de las sustituciones", "apps/calendar");
  pdfMaker = new MenuDto("picture_as_pdf", "Generar PDF de sustituciones", "Generador del pdf", "generarPdfSustituciones");

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
  }

}
