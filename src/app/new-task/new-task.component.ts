import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskWork } from '../model/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  maxDate = formatDate(new Date(), 'yyyy-MM-dd', 'en_US')
  listTask: Array<TaskWork> = [];
  submitted:boolean = false
  newTaskForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.initNewTaskForm();
    console.log('now', this.maxDate);
    let jsonData = JSON.parse(sessionStorage?.getItem('task') as string)
    if (jsonData !== null) {
      this.listTask = jsonData
    }
    console.log(this.listTask);
  }

  initNewTaskForm() {
    this.newTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      duDate: [this.maxDate, Validators.required],
      piority: ['nomarl', Validators.required],
    });
  }

  addTaskToStorage() {
    this.submitted = true;
    let Task = {
      id: this.listTask?.length + 1,
      isCheck: false,
      title: this.newTaskForm.get('title').value,
      desc: this.newTaskForm.get('desc').value,
      duDate: this.newTaskForm.get('duDate').value,
      piority: this.newTaskForm.get('piority').value,
    }

    if (!this.newTaskForm.valid) {
      alert('Vui lòng nhập đầy đủ trường')
    } else {
      this.listTask.push(Task)
      sessionStorage.setItem("task", JSON.stringify(this.listTask));
      alert('Thành công')
      this.reloadPage()
    }
  }
  reloadPage() {
    window.location.reload()
  }

}
