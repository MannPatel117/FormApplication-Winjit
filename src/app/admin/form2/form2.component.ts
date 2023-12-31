import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryData from '../../../assets/city_data.json';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { StepperOrientation } from '@angular/material/stepper';


@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit{

  registerForm: FormGroup;
  eduExpInfo: FormGroup;
  otherInfo: FormGroup;

  countryArr:any = [];
  countryIndex: number;

  stateArr:any = [];

  cityArr:any = [];

  selectedImage: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;

  isValid1=true;
  isValid2=true;
  isValid4=true;
  isValid6=true;

  layout:StepperOrientation= 'horizontal';
  
  ngOnInit(): void {
    this.init();
    this.fetchCountry();
    this.changeLayout();  
  }


  constructor(private fb: FormBuilder, private route: Router, private appComp: AppComponent
    ) {
  
  
    }


  init(){
    
    this.registerForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        gender: ['', [Validators.required]],
        date: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]]
      }),
      addressInfo: this.fb.group({
        addressLine1: ['', [Validators.required]],
        addressLine2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
      }),
      eduExpInfo: this.fb.group({
        education: this.fb.array([]), // Make sure the education FormArray is initialized
        experience: this.fb.array([])
      }),
      otherInfo: this.fb.group({
        image: ['', [Validators.required]],
        check: [false, Validators.requiredTrue]
      })
    });
    window.addEventListener("resize", this.changeLayout)
  }

  fetchCountry() {
    this.countryArr = countryData.map(item => item.country)
  }

  changeCountry(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setState(value);
  }

  setState(countryInput: string) {
    this.countryIndex = this.countryArr.indexOf(countryInput);
    this.stateArr = countryData[this.countryIndex].states.map(state => state.name);
  }

  changeState(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.setCity(value);
  }

  setCity(stateInput: string) {
    let index = this.stateArr.indexOf(stateInput);
    this.cityArr = countryData[this.countryIndex].states[index].city.map(city => city.name);
  }

  /*
    End of Country and City
  */


  get educations(): FormArray {
    return this.registerForm.get("eduExpInfo.education") as FormArray;
  }

  newEducation(): FormGroup {
    return this.fb.group({
      university: ['', Validators.required],
      qualification: ['', Validators.required],
      percentage: ['', Validators.required]
    })
  }

  addEducation() {
    this.educations.push(this.newEducation());
  }
  remEducation(i: number) {
    this.educations.removeAt(i);
  }

  get experiences(): FormArray {
    return this.registerForm.get("eduExpInfo.experience") as FormArray;
  }

  newExperiences(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      years: ['', Validators.required]
    })
  }

  addExperience() {
    this.experiences.push(this.newExperiences());
  }

  remExperience(i: number) {
    this.experiences.removeAt(i);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
    this.previewImage();
    
  }

  previewImage() {
    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);  
    }
  }


 

  submit1() {

    if (this.registerForm.get('personalInfo').invalid) {
      this.isValid1=false;
    }
  }

  submit2() {
    if (this.registerForm.get('addressInfo').invalid) {
      this.isValid2=false;
    }
  }
  
  
  submit4() {
    if (this.registerForm.get('eduExpInfo').invalid) {
      this.isValid4=false;
    }
  }


  submit6() {
    if (this.registerForm.get('otherInfo').invalid) {
      this.isValid6=false;
    }
    else{
      this.submitFinal()
    }
  }

  submitFinal(){
    // console.log(this.registerForm1.value, this.registerForm2.value,  this.registerForm4.value)
    // const obj= {...this.registerForm1.value, ...this.registerForm2.value,  ...this.registerForm4.value}
    const obj = this.registerForm.value;
    console.log(obj);
    this.saveData(obj);
    this.appComp.routeShow();
  }
  /*
    Function to Submit Data into the Session Storage
  */

    saveData(data: any){
      let num=((sessionStorage.length)+1).toString();     // num variable to set key for the data 
      data.key=String(num);                               //appending the key variable in the object
      sessionStorage.setItem(num,JSON.stringify(data));   //stringifying the object to store it in session storage
    }


    changeLayout(){

      const screenWidth = window.innerWidth;
      console.log(screenWidth)
      if(screenWidth<1000)
      {
        this.layout= 'vertical';
      }
      else
      {
        this.layout= 'horizontal';
      }
    }
}
