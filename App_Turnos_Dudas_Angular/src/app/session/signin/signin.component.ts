import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserDto } from 'src/app/models/user.dto';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  public form: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  onSubmit() {
    
  }

  googleSignIn() {
    this.authService.googleLogin().then(resp => {
      this.authService.setLocalData(
        resp.user.uid,
        resp.user.displayName,
        resp.user.email,
        resp.user.photoURL
      );
      if(resp.user.email == "miguel.campos@salesianos.edu"){
        localStorage.setItem('es_Profesor', "Y")
      } else {
        localStorage.setItem('es_Profesor', "N")
      }
      this.authService.getUser().subscribe(usuarioEncontrado => {
        if(usuarioEncontrado){
          const dto = new UserDto( resp.user.displayName, resp.user.email, resp.user.photoURL);
          this.authService.updateUserLogged(resp.user.uid, dto).then(resp2 => {
            this.router.navigate(['/']);
          }).catch(err => {
            this._snackBar.open("Error al iniciar sesión", err);
          });
        } else {
          const dto2 = new UserDto(resp.user.displayName, resp.user.email, resp.user.photoURL);
          this.authService.saveUserLogged(resp.user.uid, dto2).then(resp3 => {
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
