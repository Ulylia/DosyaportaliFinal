import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/model/uye';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  uyesList: Uye[] = [];
  uyeObj: Uye = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    mobile: ''
  };
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  mobile: string = '';

  constructor(private auth: AuthService, private data: DataService) { }

  ngOnInit(): void {
    this.getAllUyes();
  }

  // register() {
  //   this.auth.logout();
  // }

  getAllUyes() {

    this.data.getAllUyes().subscribe(res => {

      this.uyesList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })

    }, err => {
      alert('Error while fetching uye data');
    })

  }

  resetForm() {
    this.id = '';
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.mobile = '';
  }

  addUye() {
    if (this.first_name == '' || this.last_name == '' || this.mobile == '' || this.email == '') {
      alert('Fill all input fields');
      return;
    }

    this.uyeObj.id = '';
    this.uyeObj.email = this.email;
    this.uyeObj.first_name = this.first_name;
    this.uyeObj.last_name = this.last_name;
    this.uyeObj.mobile = this.mobile;

    this.data.addUye(this.uyeObj);
    this.resetForm();

  }

  updateUye() {

  }

  deleteUye(uye: Uye) {
    if (window.confirm('Are you sure you want to delete ' + uye.first_name + ' ' + uye.last_name + ' ?')) {
      this.data.deleteUye(uye);
    }
  }


}
