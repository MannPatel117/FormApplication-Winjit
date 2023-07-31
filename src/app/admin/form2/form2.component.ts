import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import countryData from '../../../assets/city_data.json';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit{
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  registerForm4: FormGroup;
  registerForm5: FormGroup;
  registerForm6: FormGroup;

  countryArr:any = [];
  countryIndex: number;

  stateArr:any = [];

  cityArr:any = [];

  selectedImage: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;

  isValid1=true;
  isValid2=true;
  isValid3=true;
  isValid4=true;
  isValid5=true;
  isValid6=true;

  ngOnInit(): void {
    this.init();
    this.fetchCountry();
  }


  constructor(private fb: FormBuilder, private route: Router, private appComp: AppComponent
    ) {
  
  
    }


  init(){
    this.registerForm1=this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      gender: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })


    this.registerForm2=this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]+$')]],
    })

    this.registerForm3=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
    })

    this.registerForm4 = this.fb.group({
      education: this.fb.array([]) // Make sure the education FormArray is initialized
    });

    this.registerForm5=this.fb.group({
      experience: this.fb.array([])
    })

    this.registerForm6=this.fb.group({
      image: ['', [Validators.required]],
      check: [false, Validators.requiredTrue]
    })
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
    return this.registerForm4.get("education") as FormArray;
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
    return this.registerForm5.get("experience") as FormArray;
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
    if (this.registerForm1.invalid) {
      this.isValid1=false;
    }
  }

  submit2() {
    if (this.registerForm2.invalid) {
      this.isValid2=false;
    }
  }
  
  submit3() {
    if (this.registerForm3.invalid) {
      this.isValid3=false;
    }
  }
  submit4() {
    if (this.registerForm4.invalid) {
      this.isValid4=false;
    }
  }
  submit5() {
    if (this.registerForm5.invalid) {
      this.isValid5=false;
    }
  }

  submit6() {
    if (this.registerForm5.invalid) {
      this.isValid6=false;
    }
    else{
      this.submitFinal()
    }
  }

  submitFinal(){
    console.log(this.registerForm1.value, this.registerForm2.value, this.registerForm3.value, this.registerForm4.value, this.registerForm5.value)
    const obj= {...this.registerForm1.value, ...this.registerForm2.value, ...this.registerForm3.value, ...this.registerForm4.value, ...this.registerForm5.value}
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
}
