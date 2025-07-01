import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm {
  @Output() submit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() task: any = null;
  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.setFormValues();
  }

  initForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setFormValues();
  }

  private setFormValues() {
    if (this.taskForm) {
      if (this.task) {
        this.taskForm.patchValue({
          title: this.task.title,
          description: this.task.description,
        });
      } else {
        this.taskForm.reset();
      }
    }
  }
}
