import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../user.service';
import {RefdataService} from '../common/refdata.service';
import {NotificationService} from '../common/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public clientTypeList: any[];
  public institutionTypeList: any[];
  public cityList: any[];
  public regionList: any[];

  constructor(private _http: HttpClient, private userService: UserService,
              private refDataService: RefdataService,
              private notificationService: NotificationService) {

    this.clientTypeList = refDataService.getClientTypeList();
    this.institutionTypeList = refDataService.getInstitutionTypeList();
    this.cityList = refDataService.getCityList();
    this.regionList = refDataService.getRegionList();
  }

  public clientForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    principlename: new FormControl('', Validators.required),
    contact: new FormControl(null, [Validators.minLength(11), Validators.required]),
    contactpersontwo: new FormControl(''),
    contacttwo: new FormControl(null, Validators.minLength(11)),
    totalbranches: new FormControl('', Validators.required),
    strenght: new FormControl('', Validators.required),
    discount: new FormControl(null, Validators.required),
    paymentterms: new FormControl(0, Validators.required),
    institutetypename: new FormControl(1, Validators.required),
    clienttypename: new FormControl(1, Validators.required),
    address: new FormControl(1, Validators.required),
    area: new FormControl(''),
    cityname: new FormControl('', Validators.required),
    regionname: new FormControl('', Validators.required),
    userid: new FormControl(this.userService.getUserId(), Validators.required)

  });

  initializeClientForm() {
    this.clientForm.setValue(
      {
        id: null,
        name: '',
        email: '',
        principlename: '',
        contact: '',
        contactpersontwo: '',
        contacttwo: '',
        totalbranches: null,
        strenght: null,
        discount: null,
        paymentterms: null,
        institutetypename: '',
        clienttypename: '',
        address: '',
        area: '',
        cityname: null,
        regionname: null,
        userid: this.userService.getUserId()


      });
  }

  populateForm(client) {
    this.clientForm.setValue({
      id: client.id ,
      name: client.name ,
      email: client.email,
      principlename: client.principlename,
      contact: client.contact,
      contactpersontwo: client.contactpersontwo,
      contacttwo: client.contacttwo,
      totalbranches: client.totalbranches,
      strenght: client.strenght,
      discount: client.discount,
      paymentterms: client.paymentterms,
      institutetypename: client.institutetypename,
      clienttypename: client.clienttypename,
      address: client.address,
      area: client.area,
      cityname: client.cityname,
      regionname: client.regionname,
      userid: this.userService.getUserId()

    });
  }


  saveVendor(): Observable<any> {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
      return this._http.post<User>(this.userService.getrestURL() + '/client/save', this.clientForm.value);
    }
  }

  save(): void {
    this.saveVendor().subscribe(data => this.notificationService.showSuccess(':: Client Successfully Added.'),
      error => this.notificationService.showError(error));
  }

  clearForm() {
    this.clientForm.reset();
    this.initializeClientForm();
  }

  public remove(id: number): Observable<any>  {
    return this._http.post<User>(this.userService.getrestURL() + '/client/delete', id);
  }

  editForm(id: number): void {
    this.getClientById(id).subscribe(data => {console.log('edit client:' + data);
        this.populateForm(JSON.parse(JSON.stringify(data))); } ,
      error => this.notificationService.showError(error));
  }

  getClientById(id: number): Observable<any>  {
    return this._http.get(this.userService.getrestURL() + '/client/' + id).pipe(map(this.refDataService.extractData));
  }
}
