import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-admin-modal',
  imports: [],
  templateUrl: './admin-modal.html',
  styleUrl: './admin-modal.css'
})
export class AdminModal {
@Input() open = false;
  @Input() title = '';
  @Input() showFooter = false;
  @Input() backdropClose = true;

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
