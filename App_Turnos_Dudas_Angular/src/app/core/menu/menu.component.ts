import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  template: `<ng-material-multilevel-menu [configuration]='config' [items]='menuItems' class='navigation'></ng-material-multilevel-menu>`,
  providers: [MenuService]
})
export class MenuComponent implements OnChanges, OnInit, OnDestroy {
  @Input() direction: string;

  es_profesor: boolean;

  private langChangeSubscription!: Subscription;
  currentLang = 'en';
  menuItems = [];

  config = {
    paddingAtStart: false,
    interfaceWithRoute: true,
    collapseOnSelect: true,
    highlightOnSelect: true,
    rtlLayout: this.direction === 'rtl' ? true : false,
    selectedListFontColor: '#D60000',
  };

  constructor(
    public translate: TranslateService,
    public menuService: MenuService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.config = {...this.config, rtlLayout: this.direction === 'rtl' ? true : false};
  }

  ngOnInit() {
    if(localStorage.getItem('es_Profesor') == "Y"){
      this.es_profesor = true;
    }

    if(this.es_profesor){
      const menu =  this.menuService.getAllProfesor();
    this.menuItems = menu;
    } else {
      const updatedMenu = this.menuService.getAllAlumno();
        this.menuItems = updatedMenu;
    }
    
    this.langChangeSubscription = this.translate.onLangChange.subscribe( () => {
      if(this.es_profesor){
        const updatedMenu = this.menuService.getAllProfesor();
        this.menuItems = updatedMenu;
      } else {
        const updatedMenu = this.menuService.getAllAlumno();
        this.menuItems = updatedMenu;
      }
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription.unsubscribe();
  }
}
