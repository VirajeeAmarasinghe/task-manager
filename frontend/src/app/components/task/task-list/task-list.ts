import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskList {
  @Input() tasks: any[] = [];
  @Input() loading = false;
  @Output() onComplete = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<any>();

  handleEdit(task: any) {
    this.onEdit.emit(task);
  }
}
