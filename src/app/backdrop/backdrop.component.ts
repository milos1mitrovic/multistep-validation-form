import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css'],
})
export class BackdropComponent implements OnInit {
  @Output() backdropClicked = new EventEmitter<boolean>();
  backdropClosed = false;

  constructor() {}

  ngOnInit(): void {}

  onBackdropClick() {
    this.backdropClicked.emit(this.backdropClosed);
  }
}
