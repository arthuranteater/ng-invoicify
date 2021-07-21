import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.css']
})
export class StatusMessageComponent implements OnInit {

  @Input() errorMessage: string = ''
  @Input() successMessage: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
