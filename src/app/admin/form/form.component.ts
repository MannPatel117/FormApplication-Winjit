import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryData from '../../../assets/city_data.json';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-form, ',

  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  registerForm: FormGroup;
  registerForm1: FormGroup;
  
  countryArr:any = [];
  countryIndex: number;

  stateArr:any = [];

  cityArr:any = [];

  selectedImage: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;

  isValid=true;
  isValid1=true;

  ngOnInit(): void {
    this.init();
  }
  constructor(private fb: FormBuilder, private route: Router, private appComp: AppComponent
  ) {


  }

  /*
    Function Name: init
    Usage: Triggered on initialization, initializes the values to form group
  */

  init() {

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      gender: ['', [Validators.required]],
      date: ['', [Validators.required]],
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
      image: ['', [Validators.required]],
      education: this.fb.array([]),
      experience: this.fb.array([]),
      check: [false, Validators.requiredTrue]
    });
    this.fetchCountry();

    this.registerForm1 = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      gender: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
  }



  /*
    Functions for Country and City
  */

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
    return this.registerForm.get("education") as FormArray;
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
    return this.registerForm.get("experience") as FormArray;
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


  async submit() {
    if (this.registerForm.invalid) {
      this.isValid=false;
    }
    else {
      this.saveData(this.registerForm.value);
      this.appComp.routeShow();
    }
  }

  submit1() {
    if (this.registerForm1.invalid) {
      this.isValid1=false;
    }
  }
  
  /*
    Function to Submit Data into the Session Storage
  */

    saveData(data: any){
      let num=((sessionStorage.length)+1).toString();     // num variable to set key for the data 
      data.key=String(num);                               //appending the key variable in the object
      sessionStorage.setItem(num,JSON.stringify(data));   //stringifying the object to store it in session storage
    }
 
}
