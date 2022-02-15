import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/services/MenuService';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  error='';
  message='';
  user_id : string;
  loading = false;
  categoryList: any=[];
  menuList: any=[];

  form = new FormGroup({
    categoryName: new FormControl('', Validators.required)
  });

  constructor(private service: MenuService) { }

  ngOnInit() {
    this.loading = true
    this.error = '';
    this.message = '';
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
  let categoryName  = this.form.get(["categoryName"])!.value

  this.service.saveCategory(categoryName).subscribe(res =>{
      this.loading = false;
      if(res){
      this.message = "Saved Successful!..."
      this.form = new FormGroup({
        categoryName: new FormControl('', Validators.required)
      });

      this.service.getCategoryData().subscribe(res => {
        if(res){
          this.categoryList = res
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
