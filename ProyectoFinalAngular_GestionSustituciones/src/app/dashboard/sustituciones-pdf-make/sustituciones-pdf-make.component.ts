import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SustitucionesService } from 'src/app/services/sustituciones.service';
import { DocumentosFirestore } from 'src/app/models/documentosFirestore.interface';
import { Sustituciones } from 'src/app/models/sustituciones.interface';
import { Router } from '@angular/router';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-sustituciones-pdf-make',
  templateUrl: './sustituciones-pdf-make.component.html',
  styleUrls: ['./sustituciones-pdf-make.component.scss']
})
export class SustitucionesPdfMakeComponent implements OnInit {

  today = new Date();
  listaSustituciones: DocumentosFirestore<Sustituciones>[];
  listaSustitucionesPDF: DocumentosFirestore<Sustituciones>[];
  fechaPDF: string;
  dd;
  mm;
  yyyy;

  constructor(private sustitucionesService: SustitucionesService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('uid') || localStorage.getItem('photoURL')) {
    } else {
      this.router.navigate(['/session/signin']);
    }
    this.loadSustituciones();
    this.loadTodayDate();
  }

  loadTodayDate(){
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth() + 1;

    this.yyyy = this.today.getFullYear();
    if (this.dd < 10) {
      this.dd = 0 + this.dd;
    } 
    if (this.mm < 10) {
      this.mm = 0 + this.mm;
    } 
    this.fechaPDF = this.dd + '_' + this.mm + '_' + this.yyyy;
  }

  loadPdfDate(){
    return this.dd + '/' + this.mm + '/' + this.yyyy;
  }

  loadSustituciones(){
    this.sustitucionesService.getSustituciones().subscribe(sustitucionesSnapshot => {
      this.listaSustituciones = [];
      sustitucionesSnapshot.forEach((sustitucionesData: any) => {
        this.listaSustituciones.push({
          id: sustitucionesData.payload.doc.id,
          data: sustitucionesData.payload.doc.data()
        });
      });
    });
  }

  loadSustitucionesForPdf(){
    this.listaSustitucionesPDF = [];
    this.listaSustituciones.forEach(((element, index, array) =>{
      if(element.data.fecha.toDate().getMonth() == this.today.getMonth() 
      && element.data.fecha.toDate().getDay() == this.today.getDay()){
        this.listaSustitucionesPDF.push(element);
      }
    }));
  }

  generatePdf(){
    this.loadSustitucionesForPdf();
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download(`Hoja_De_Sustituciones_${this.fechaPDF}.pdf`);
  }

  openPdf(){
    this.loadSustitucionesForPdf();
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
  }
  
  getDocumentDefinition() {
    return {
      content: [
        {
          text: 'Hoja de sustituciones del ' + this.loadPdfDate(),
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [{
              text: 'Hora',
              alignment: 'center',
              bold: true,
              fillColor: '#CCC2C2',
              style: 'tableHeader'
            },
            {
              text: 'Aula',
              alignment: 'center',
              bold: true,
              fillColor: '#CCC2C2',
              style: 'tableHeader'
            },
            {
              text: 'Profesor que falta',
              alignment: 'center',
              bold: true,
              fillColor: '#CCC2C2',
              style: 'tableHeader'
            },
            {
              text: 'Profesor que sustituye',
              alignment: 'center',
              bold: true,
              fillColor: '#CCC2C2',
              style: 'tableHeader'
            },
            ],
            ...this.listaSustitucionesPDF.map(sust => {
              let profesorAusente = sust.data.nombre_profesor_ausente + " " + sust.data.apellidos_profesor_ausente;
              let profesorSustituto = sust.data.nombre_sustituto + " " + sust.data.apellidos_sustituto;
              let horaSustituida = sust.data.fecha.toDate().getHours(); 
              let minutosSustituidos = sust.data.fecha.toDate().getMinutes();
              let momentoASustituir = "";
              if(horaSustituida == 8 && minutosSustituidos == 0){
                momentoASustituir = "1º Hora";//1ºhora
              } else if(horaSustituida == 9 && minutosSustituidos == 0){
                momentoASustituir = "2º Hora";
              } else if(horaSustituida == 10 && minutosSustituidos == 0){
                momentoASustituir = "3º Hora";
              } else if(horaSustituida == 11 && minutosSustituidos == 30){
                momentoASustituir = "4º Hora";
              } else if(horaSustituida == 12 && minutosSustituidos == 30){
                momentoASustituir = "5º Hora";
              } else if(horaSustituida == 13 && minutosSustituidos == 30){
                momentoASustituir = "6º Hora";
              }
              let aulaDeSustitucion = sust.data.nombre_aula;
              return [momentoASustituir, aulaDeSustitucion, profesorAusente, profesorSustituto];
            })
          ]
        }
      }
      ]
    };
  }

}
