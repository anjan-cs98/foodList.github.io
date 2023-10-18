import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FOOD } from '../models/food-Model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, AfterContentInit {
  public foodList:any=[];
  public page: number = 1;
  public foodData!: FormGroup;
  public selectedFoodData: any = [];
  public activeUser: any = '';

  constructor(
    private fService: FoodService,
    private fBuilder: FormBuilder,
    private route: Router
  ) {
    this.foodData = this.fBuilder.group({
      food_name: [''],
      food_desc: [''],
      food_price: [''],
      food_image: [''],
    });
  }

  ngOnInit(): void {
    /* Now call the populatefooods*/
    this.populateFoods();
  }

  /*---------After Load All the content  --------*/
  ngAfterContentInit(): void {
    this.populateUserDetails();
  }

  /*Image Set Function  */
  selectImage(event: any) {
    console.log(event);
    let file = event.target.files[0];
    if (
      file.size <= 2000 ||
      file.type == 'image/jpg' ||
      file.type == 'image/jpeg'
    ) {
      console.log(file);
      //Now set the file .on the Image Key:
      this.foodData.get('food_image')?.setValue(file);
    } else {
      alert('File size max 2MB ');
    }
  }

  /* ------------Populate User Details  For Get User Info -----*/
  populateUserDetails() {
    this.activeUser = localStorage.getItem('User');
  }

  /*--------Populate all foodList----------- */
  populateFoods() {
    this.fService.getAllFoods().subscribe({
      next: (res:any) => {
        console.log(res);
        this.foodList = res;
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('API call Successfully.....');
      },
    });
  }

  /*-------------Posting Food Data--------------- : */
  AddFood() {
    /*
     formularioApartamentoLocacao: FormGroup;

     const formulario = new FormData();

     const formData = formularioApartamentoLocacao.value;

     Object.keys(formData).forEach((key) => {
      formulario.append(key, formData[key]);
     });
    */
    //console.log(this.foodData.value);
    let uploadData = new FormData();
    const formData = this.foodData.value;
    Object.keys(formData).forEach((key: any) => {
      uploadData.append(key, formData[key]);
    });
    // uploadData.append('food_name', this.foodData.get('food')?.value);
    // uploadData.append('food_desc', this.foodData.get('desc')?.value);
    // uploadData.append('food_price', this.foodData.get('price')?.value);
    // uploadData.append('food_image', this.foodData.get('image')?.value);
    /* params : food_name=value[this.foodData.get('food')?.value)] */
    /*Now post formData: uploadData */
    this.fService.addFoodData(uploadData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
        /* Now call the all FoodData api */
        this.populateFoods();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Post api call successfull');
      },
    });

    /*Now reset your form */
    this.foodData.reset();
  }
  /*------------- Now Selecting Food Data---------------- */
  select(fData: any) {
    console.log(fData);
    this.selectedFoodData = fData;
    /*Now set all fData  */
    this.foodData.get('food')?.setValue(this.selectedFoodData.food_name);
    this.foodData.get('desc')?.setValue(this.selectedFoodData.food_desc);
    this.foodData.get('price')?.setValue(this.selectedFoodData.food_price);
    //  this.foodData.get('image')?.setValue(this.selectedFoodData.food_image);
  }

  /*---------------NOw Update Food Data ---------*/
  UpadteFood() {
    let uploadData = new FormData();
    uploadData.append('food_name', this.foodData.get('food')?.value);
    uploadData.append('food_desc', this.foodData.get('desc')?.value);
    uploadData.append('food_price', this.foodData.get('price')?.value);
    uploadData.append('food_image', this.foodData.get('image')?.value);
    /*Now get ID and Update food Data*/
    let Id = this.selectedFoodData._id;
    //console.log(Id);
    this.fService.updateFoodData(Id, uploadData).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message);
        /*Populate food Data*/
        this.populateFoods();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        console.log('Update Food Data api call Successfull');
      },
    });
    /* Now reset your form */
    this.foodData.reset();
  }

  /*----------------------- Now Delete Food Data------------------- */
  DeleteFood() {
    let Id = this.selectedFoodData._id;
    console.log(Id);
    var result = confirm('Want to delete?');
    if (result) {
      //Logic to delete the item
      /* Now Delete Food Data  */
      this.fService.deleteFoodData(Id).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res.message);
          /*Populate food Data*/
          this.populateFoods();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Delete Api Call Successfull');
        },
      });
    }

    /* Reset your form */
    this.foodData.reset();
  }

  UserlogOut(): void {
    console.log('logout');
    /*-------Clear All User info from the localstorage----*/
    alert('Logout Successfull');
    localStorage.clear();
    /* -----Redirect To Login Page -----*/
    this.route.navigateByUrl('/login');
  }
}
