import { Component } from '@angular/core';
import { TaskService } from '../../services/TaskService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  tasks: any[] = [];
  loading = false;
  selectedTab = 0;
  filter = 'all';
  showTaskForm = false;
  map = ['all', 'completed', 'pending'];
  editingTask: any = null;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.filter = this.map[0];
    this.loadTasks();
  }

  onTabChange(index: number) {
    this.filter = this.map[index];
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks(this.filter).subscribe({
      next: (res) => {
        this.tasks = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  markComplete(id: number) {
    this.taskService.markComplete(id).subscribe(() => this.loadTasks());
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openTaskForm() {
    this.showTaskForm = true;
    this.editingTask = null;
  }

  closeTaskForm() {
    this.showTaskForm = false;
    this.editingTask = null;
  }

  handleAddTask(data: any) {
    if (this.editingTask) {
      // Update existing task
      this.taskService.updateTask(this.editingTask.id, data).subscribe(() => {
        this.loadTasks();
        this.closeTaskForm();
      });
    } else {
      // Create new task
      this.taskService.createTask(data).subscribe(() => {
        this.loadTasks();
        this.closeTaskForm();
      });
    }
  }

  editTask(task: any) {
    this.editingTask = task;
    this.showTaskForm = true;
  }
}
