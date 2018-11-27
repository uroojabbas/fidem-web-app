import { Injectable } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {RefdataService} from '../common/refdata.service';
import {User} from '../user';
import {Observable} from 'rxjs';
import {NotificationService} from '../common/notification.service';
import {CommonService} from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productData: any;
  public languageList: any[];
  public countryList: any[];
  public pagerQualityList: any[];
  public marketSegmentList: any[];
  public productCategoryList: any[];
  public vendorList: any[];

  constructor(private _http: HttpClient,
              private refDataService: RefdataService,
              private userService: UserService,
              private notificationService: NotificationService,
              private commonService: CommonService) {
    this.languageList = this.refDataService.getLanguageList();
    this.countryList = this.refDataService.getCountryList();
    this.pagerQualityList = this.refDataService.getPaperQualityList();
    this.marketSegmentList = this.refDataService.getMarketSegmentList();
    this.productCategoryList = this.refDataService.getProductCategoryList();
    this.commonService.initVendorList().subscribe(data => this.setVendorList(data));

  }

  setVendorList(vendorList: any): void {
    this.vendorList = vendorList;
  }

  public searchISBN(): void {
    const isbn = this.productForm.controls['isbn'].value;
    console.log('isbn : ' + isbn);
    const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    console.log('url : ' + url);
    this._http.get(url).pipe(map(this.refDataService.extractData)).subscribe(data => this.setProductDetail(data));
  }

  private setProductDetail(data): void {
    this.productData = data;
    console.log(data.totalItems);
    if (this.productData != null && this.productData.totalItems > 0) {

      this.productForm.get('author').setValue(this.productData.items[0].volumeInfo.authors.toString());

      const languagecode =  this.productData.items[0].volumeInfo.language;
      const language = this.languageList.find(language => language.languagecode === languagecode);

      console.log('Language : ' + language.language);
      console.log('languagecode : ' + languagecode);
      this.productForm.get('languagename').setValue(language.language);

      const countrycode =  this.productData.items[0].saleInfo.country;
      const country = this.countryList.find(country => country.countrycode === countrycode);

      console.log('Country : ' + country.id);
      console.log('countrycode : ' + countrycode);
      this.productForm.get('countryid').setValue(country.id);

      const title = this.productData.items[0].volumeInfo.title;
      this.productForm.get('name').setValue(title === undefined ? '' : title.toString());

      const publisher = this.productData.items[0].volumeInfo.publisher;
      this.productForm.get('publisher').setValue(publisher === undefined ? '' : publisher.toString());
      this.productForm.get('pagecount').setValue(this.productData.items[0].volumeInfo.pageCount);

      const subject = this.productData.items[0].volumeInfo.categories;
      this.productForm.get('subject').setValue(subject === undefined ? '' : subject.toString());
     }

    return this.productData || {};
  }

  public productForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    isbn: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    edition: new FormControl('', Validators.required),
    barcode: new FormControl('', Validators.required),
    languagename: new FormControl('', Validators.required),
    publisher: new FormControl('', Validators.required),
    countryid: new FormControl(null, Validators.required),
    productcategoryid: new FormControl(null, Validators.required),
    marketsegmentid: new FormControl(null, Validators.required),
    pagecount: new FormControl(null, Validators.required),
    productcost: new FormControl(null, Validators.required),
    paperqualityid: new FormControl(null),
    retailprice: new FormControl(null, Validators.required),
    vendorName: new FormControl('', Validators.required),
    userid: new FormControl(this.userService.getUserId(), Validators.required)
  });


  initializeProductForm() {
    this.productForm.setValue(
      {
        id: null,
        name: '',
        isbn: '',
        author: '',
        subject: '',
        edition: '',
        barcode: '',
        languagename: '',
        publisher: '',
        countryid: null,
        productcategoryid: null,
        marketsegmentid: null,
        pagecount: null,
        productcost: null,
        paperqualityid: null,
        retailprice: null,
        vendorName: '',
        userid: this.userService.getUserId()


      });
  }

  populateForm(product) {
    this.productForm.setValue({
      id: product.id,
      name: product.name,
      isbn: product.isbn,
      author: product.author,
      subject: product.subject,
      edition: product.edition,
      barcode: product.barcode,
      languagename: product.languagename,
      publisher: product.publisher,
      countryid: product.countryid,
      productcategoryid: product.productcategoryid,
      marketsegmentid: product.marketsegmentid,
      pagecount: product.pagecount,
      productcost: product.productcost,
      paperqualityid: product.paperqualityid,
      retailprice: product.retailprice,
      vendorName: product.vendorName,
      userid: this.userService.getUserId()

    });
  }

  saveProduct(): Observable<any> {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      return this._http.post<User>(this.userService.getrestURL() + '/product/save', this.productForm.value);
    }
  }

  save(): void {
    this.saveProduct().subscribe(data => {
        this.notificationService.showSuccess(':: Client Successfully Added.');
      this.populateForm(data); },
      error => this.notificationService.showError(error));
  }

  clearForm() {
    this.productForm.reset();
    this.initializeProductForm();
  }

  public remove(id: number): Observable<any>  {
    return this._http.post<User>(this.userService.getrestURL() + '/product/delete', id);
  }

  editForm(id: number): void {
    this.getProductById(id).subscribe(data => {console.log('edit client:' + data);
        this.populateForm(JSON.parse(JSON.stringify(data))); } ,
      error => this.notificationService.showError(error));
  }

  getProductById(id: number): Observable<any>  {
    return this._http.get(this.userService.getrestURL() + '/product/' + id).pipe(map(this.refDataService.extractData));
  }
}
