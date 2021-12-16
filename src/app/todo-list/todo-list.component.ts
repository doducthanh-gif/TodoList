import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterPreloader } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  status: boolean = false;
  listTodoData: any[] = [];
  mainData: any[] = [];
  isShowBulk: boolean = false;
  constructor() { };

 
  ngOnInit(): void {
    this.listTodoData = JSON.parse(sessionStorage.getItem('task') as string);
    this.mainData = JSON.parse(sessionStorage.getItem('task') as string);
    console.log(this.listTodoData);

  }

  updateData() {
    sessionStorage.removeItem("task");
    sessionStorage.setItem("task", JSON.stringify(this.listTodoData));
    alert('Update Thành Công')
    this.reloadPage();

  }
  reloadPage() {
    window.location.reload()
  }

  deleteTask(id: number) {
    let removeIndex = this.listTodoData.findIndex(function (item: any) {
      return item.id === id
    });
    this.listTodoData.splice(removeIndex, 1)
    this.updateData();
    console.log(removeIndex);
  }

  clickEvent(id: number) {
    if (id) {
      this.listTodoData?.forEach(element => {
        if (element.id == id) {
          if (element['isClicked'] == true) {
            element['isClicked'] = false;
          } else {
            element['isClicked'] = true;
          }
        }
      });
    }
  }

  searchList(event: any) {
    this.listTodoData = this.mainData.filter(x => x.title?.toLowerCase()?.indexOf(event?.data?.toLowerCase()?.trim()) != -1)
    let inputValue = event?.data
    if (inputValue = '' || !inputValue) {
      this.listTodoData = this.mainData
    }
  }

  mutiDelete() {
    this.listTodoData = this.listTodoData.filter(x => !x.isCheck);
    this.updateData();
  }
  handlerBulk(event: any) {
    this.isShowBulk = true
    var isTrue = this.listTodoData.every(data => {
      return data.isCheck === false
    })
    this.isShowBulk = !isTrue

  }
  makeDone() {
    this.listTodoData = this.listTodoData.map(this.customDataDone);
    // this.updateData();
    console.log('abc', this.listTodoData);



  }

  customDataDone(val: any) {
    return {
      id: val.id,
      duDate: val.duDate,
      desc: val.desc,
      isCheck: true,
      isClicked: val?.isClicked,
      piority: val.piority,
      title: val.title
    }
  }
}
