import {Component, OnInit, ViewChild, Input, SimpleChanges} from '@angular/core';
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {debounceTime, Subject, map} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @ViewChild('alert', {static: false}) alert!: NgbAlert;
  _alertMessage: string = ""
  @Input() alertType: string = 'success'
  private alertEvent: Subject<string> = new Subject<string>();

  constructor() {
  }

  @Input() set alertMessage(alertMessage: string) {
    this._alertMessage = alertMessage
    this.alertEvent.next(alertMessage)
  }

  ngOnInit(): void {
    this.alertEvent.subscribe(() => console.log("new event"))
    this.alertEvent.pipe(debounceTime(3000)).subscribe(() => {
      if (this.alert) {
        this.alert.close();
      }
    })
  }
}
