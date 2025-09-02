import { Component, EventEmitter, Output, Input } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
  standalone: true,
})
export class SearchBar {
  search_control = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  @Output() search = new EventEmitter<string>();
ngOnInit() {
  this.search_control.valueChanges.pipe(
    debounceTime(250),
    distinctUntilChanged(),
    map(v => v?.trim() ?? '')
  ).subscribe(v => this.search.emit(v));
}
  searchSkill(): void {
    if (this.search_control.valid) {
      this.search.emit(this.search_control.value.trim());
    }
  }
}
