import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { fadeInAnimation } from 'src/app/styling/fade-in.animation';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [fadeInAnimation],
})
export class UserComponent implements OnInit {

  errorMessage!: string;
  successMessage!: string;
  users!: any;
  originalUsers!: any;
  searchText: string = '';
  filterBy: string = '';

  constructor (private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() { this.getUsers(); }

  getUsers() {
    this.dataService.getRecords("user")
      .subscribe(
        results => this.users = results,
        error =>  this.errorMessage = <any>error);
    this.dataService.getRecords("user")
        .subscribe(
          results => this.originalUsers = results,
          error =>  this.errorMessage = <any>error);
  }

  @HostListener('input') onInput(){
    if(this.filterBy=='uname'){
      this.users = this.originalUsers.filter((u: any)=> u.username.toLowerCase().includes(this.searchText.toLowerCase()));
    } 
  }

  deleteUser(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("user", id)
          .subscribe(
            company => {this.successMessage = "Record(s) deleted successfully"; this.getUsers(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }


}
