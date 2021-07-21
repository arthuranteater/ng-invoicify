import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  auth_user: any = {};

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.refreshUser();
  }

  isAuthenticated(){
    return this.authService.isAuthenticated()
  }

  logout(){
    this.authService.logout().subscribe(
      success=> {
        this.refreshUser();
        this.router.navigate(["home"])
      } 
    );
  }

  login(user: NgForm){
    this.authService.login(user.value).subscribe(
      success=> {
        this.refreshUser();
      },
      error => {
        this.errorMessage = "Invalid login"
      }
    );
  }

  refreshUser(){
    this.auth_user = JSON.parse(localStorage.getItem("auth_user") || '{}');
  }

}
