import { Component, OnInit } from '@angular/core';
import { FetchmenueService } from 'src/app/Shared/fetchmenue.service';
import { Item } from 'src/app/Shared/item';
import { Router } from '@angular/router';
import { Data } from 'src/app/Shared/data';
import { AuthserviceService } from 'src/app/Shared/authservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  items:Item[]=[];
  filterItems:Item[]=[];
  filtercriteria:String;
  showSuccess:boolean=false;
  list:any;
  categoryList:any=[]
  constructor(private fetchdataService:FetchmenueService,private router:Router,private authService:AuthserviceService) { }

  ngOnInit() {
   this.fetchdataService.getData()
    .subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          value: item.payload.doc.data()
        } as unknown as Data
      }).map(data=>{
        var category:any=new Object();
        category.id=data.id;
        category.val=data.value;
        this.categoryList.push(category)
        var x=data.value
        for(let rec in x){
          var item=new Item();
          item.name=rec;
          item.price=x[rec]
          this.items.push(item)
          this.filterItems.push(item)
        }
      })
    })
    
  }
  applyFilter(){
      this.items=this.filterItems.filter(obj=>{
       return  obj.name.trim().toLowerCase().includes(this.filtercriteria.trim().toLowerCase());
      });

  }
  editItem(itemName){
    var priceEditid=document.getElementById(itemName+'hprice');
    var priceDisplayId=document.getElementById(itemName);
    var editId=document.getElementById(itemName+'Edit');
    var saveId=document.getElementById(itemName+'Save');
    priceEditid.style.display="none";
    priceDisplayId.style.display="block";
    editId.style.display="none";
    saveId.style.display="block";
  }
  saveItem(name,price){
    if(confirm("Do you want to update price?")){
        var key;
          for(let x in this.categoryList){
            for (let y in this.categoryList[x].val){
                if (y==name){
                  key=this.categoryList[x].id;
                  break;
                }
            }
          }
        this.fetchdataService.updatedata(name,price,key);
        window.scrollTo(0,0);
        this.showSuccess=true;
        setTimeout(()=>{this.showSuccess=false},4000)
        setTimeout(()=>{
          this.authService.isAdminLoggedIn=true;
        this.router.navigateByUrl('', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/admin/dashboard'])); 
        },4000) 
        
  }
    }
    logOut(){
      this.authService.isAdminLoggedIn=false;
      this.router.navigate(['/home']);
    }
    ngOnDestroy(){
      
    }
}
