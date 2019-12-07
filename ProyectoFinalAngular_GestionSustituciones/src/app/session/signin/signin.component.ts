import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ProfesoresSignInDto } from 'src/app/models/profesoresSignInDto.dto';
import { ProfesoresDto } from 'src/app/models/profesoresDto.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    //this.router.navigate(['/dashboard']);
  }

  googleSignIn(){
    this.authService.googleLogin().then(resp => {
      this.authService.setLocalData(
        resp.user.uid,
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );
        this.authService.getUser().subscribe(usuarioEncontrado => {
          if(usuarioEncontrado){
            const dto = new ProfesoresSignInDto(resp.user.email, resp.user.displayName);
            this.authService.updateProfesoresLogueado(resp.user.uid, dto).then(resp2 => {
              this.router.navigate(['/']);
            }).catch(err => {
              this._snackBar.open("Error al iniciar sesión", err);
            });
          } else {
            const dto2 = new ProfesoresDto(true, '', resp.user.email, resp.user.displayName, '');
            this.authService.saveProfesoresLogueado(resp.user.uid, dto2).then(resp3 => {
              this.router.navigate(['/']);
            }).catch(err => {
              this._snackBar.open("Error al iniciar sesión", err);
            })
          }
        });
      }).catch(err =>{
        this._snackBar.open("Error al iniciar sesión", err);
      })
    }

}
