import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private api = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  getTasks(filter: string = '') {
    return this.http.get<any[]>(this.api + (filter ? `?status=${filter}` : ''));
  }

  createTask(task: any) {
    return this.http.post(this.api, task);
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.api}/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  markComplete(id: number) {
    return this.http.patch(`${this.api}/${id}/complete`, {});
  }
}
