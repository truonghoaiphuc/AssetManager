import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Staff } from './staffs';


interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  staffDialog: boolean=false;

  staffs: Staff[]=[];

  staff: Staff={};

  selectedProducts: Staff[]=[];

  submitted: boolean = false;

  public staffForm = new FormGroup({
    MaNV: new FormControl(''),
    TenNV: new FormControl(''),
    DiaChi: new FormControl(''),
    PhongBan: new FormControl('')
  });

  cities: City[]=[];

  selectedCityCode: string='';

  constructor() {
      this.cities = [
          {name: 'New York', code: 'NY'},
          {name: 'Rome', code: 'RM'},
          {name: 'London', code: 'LDN'},
          {name: 'Istanbul', code: 'IST'},
          {name: 'Paris', code: 'PRS'}
      ];
  }

  ngOnInit(): void {
  }

  showDialog() {
    this.staff = {};
    this.staffDialog = true;
  }

  SaveStaff(){
    console.log("Staff",this.staffForm.value);
    console.log("Ten",this.staffForm.controls['PhongBan'].value.name);
    console.log("length", this.submitted);
  }
}
