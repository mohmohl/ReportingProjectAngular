import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'src/models/menuItem';
import { MenuService } from 'src/services/MenuService';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  error='';
  message='';
  user_id : string;
  loading = false;
  menuList: any=[];
  categoryList: any = [];

  form = new FormGroup({
    categoryName: new FormControl('', Validators.required),
    menuName: new FormControl('', Validators.required),
    menuUrl: new FormControl('', Validators.required),
    program: new FormControl('', Validators.required),
    menuStatus: new FormControl('', Validators.required)
  });

  constructor(private service: MenuService) { }

  ngOnInit() {
    this.loading = true
    this.error = '';
    this.message = '';
    this.service.getMenuData().subscribe(res => {
      this.loading = false;
      if(res){
        this.menuList = res
      }
    },
    error => {
      this.error = "(System have the error!..)";
      this.loading = false;
    });

    this.service.getCategoryData().subscribe(res => {
      this.loading = false;
      if(res){
        this.categoryList = res
      }
    },
    error => {
      this.error = "(System have the error!..)";
      this.loading = false;
    });

  }

  submit() {
  this.error = '';
  this.message = '';
  this.loading = true;

  let data = new MenuItem();
  data.menu_name = this.form.get(["menuName"])!.value
  data.category_id = this.form.get(["categoryName"])!.value
  data.url1 = this.form.get(["menuUrl"])!.value
  data.program =  this.form.get(["program"])!.value
  data.menu_status = this.form.get(["menuStatus"])!.value

  this.service.saveMenu(data).subscribe(res =>{
      this.loading = false;
      if(res){
      this.message = "Saved Successful!..."

      this.form = new FormGroup({
        categoryName: new FormControl('', Validators.required),
        menuName: new FormControl('', Validators.required),
        menuUrl: new FormControl('', Validators.required),
        program: new FormControl('', Validators.required),
        menuStatus: new FormControl('', Validators.required)
      });

      this.service.getMenuData().subscribe(res => {
        if(res){
          this.menuList = res
        }
      },
      error => {
        this.error = "(System have the error!..)";
        this.loading = false;
      });

      }
      else{
        this.error="Saved Fail"
      }
  },
    error => {
      this.error = "(System have the error!..)";
      this.loading = false;
    });

  }

}
