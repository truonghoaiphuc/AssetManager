import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CongTyService } from '../Services/cong-ty.service';
import { PhongBanService } from '../Services/phong-ban.service';
import { CongTy, PhongBan } from './PhongBan';

@Component({
  selector: 'app-phong-ban',
  templateUrl: './phong-ban.component.html',
  styleUrls: ['./phong-ban.component.scss']
})
export class PhongBanComponent implements OnInit {

  deptDialog: boolean=false;
  depts : PhongBan[]=[];
  dept : PhongBan ={};
  Companies : CongTy[]=[];

  DeptForm = new FormGroup({
    MaPhong: new FormControl(''),
    TenPhong: new FormControl(''),
    CongTy: new FormControl(''),
    GhiChu: new FormControl('')
  });

  constructor(private phongbanService: PhongBanService
              , private congtyService: CongTyService
              , private msgService: MessageService
              , private confirmService: ConfirmationService) { }

  ngOnInit(): void {
    this.phongbanService.getPhongBan().subscribe(data => this.depts =data);
    this.congtyService.getCongTy().subscribe((data)=>{
      this.Companies=data;
    });
  }
  openNew()
  {
    this.dept={};
    this.DeptForm.controls['CongTy'].setValue(this.Companies[0].id);
    this.deptDialog=true;
    console.log("dept",this.DeptForm.value);
  }

  SaveDept(){
    console.log(this.DeptForm.value);
    this.dept = this.DeptForm.value as PhongBan;
    this.phongbanService.addPhongBan(this.dept).subscribe((data)=>{
      this.msgService.add({severity:'success', summary: 'Success', detail: 'Thêm phòng ban thành công'});
      this.depts.push(data);
      this.deptDialog=false;
    });
  }

  Cancel(){
    this.deptDialog=false;
  }

  editPhongBan(dept: PhongBan) {
    this.dept = {...dept};
    this.DeptForm.controls['MaPhong'].setValue(this.dept.MaPhong);
    this.DeptForm.controls['TenPhong'].setValue(this.dept.TenPhong);
    this.DeptForm.controls['CongTy'].setValue(this.dept.CongTy);
    this.DeptForm.controls['GhiChu'].setValue(this.dept.GhiChu);
    this.deptDialog = true;
}

deletePhongBan(dept: PhongBan) {
    this.confirmService.confirm({
        message: 'Are you sure you want to delete ' + dept.TenPhong + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.depts = this.depts.filter(val => val.MaPhong !== dept.MaPhong);
            this.dept = {};
            this.msgService.add({severity:'success', summary: 'Successful', detail: 'Department Deleted', life: 3000});
        }
    });
}
}
