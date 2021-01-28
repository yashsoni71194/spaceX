import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  missions = [];

  launchYears = [];

  filter : any = {};

  isLoading = false;

  isUpdateLoading = false;

  constructor(private _dataService: DataService) { }

  ngOnInit(){
    this.getMissions();
  }

  getMissions(){
    this.isLoading = true;
    this._dataService.fetchMissions().subscribe((res)=>{
      this.isLoading = false;
      this.missions = res;
      this.populateLaunchYears();
    },err =>{
      this.missions = [];
      this.isLoading = false;
    })
  }

  populateLaunchYears(){
    this.launchYears = [... new Set(this.missions.map((x)=> x.launch_year))];
  }

  setYear(year){
    if(this.filter.hasOwnProperty('launch_year') && this.filter['launch_year']=== year){
      delete this.filter['launch_year'];
    }else{
      this.filter['launch_year'] = year;
    }
    this.updateMission();
  }

  setSuccessfulLand(bool){
    if(this.filter.hasOwnProperty('land_success') && this.filter['land_success']=== bool){
      delete this.filter['land_success'];
    }else{
    this.filter['land_success']=bool;
    }
    this.updateMission();
  }

  setSuccessfulLaunch(bool){
    if(this.filter.hasOwnProperty('launch_success') && this.filter['launch_success']=== bool){
      delete this.filter['launch_success'];
    }else{
    this.filter['launch_success']=bool;
    }
    this.updateMission();
  }

  updateMission(){
    let payload = '';
    for(let i in this.filter){
      if(this.filter.hasOwnProperty(i)){
        payload = `${payload}&${i}=${this.filter[i]}`;
      }
    }
    this.isUpdateLoading = true;
    this.missions = [];
    this._dataService.updateMission(payload).subscribe(res =>{
      this.isUpdateLoading = false;
      this.missions = res;
    },err=>{
      console.log('err in updating');
      this.isUpdateLoading = false;
    });
  }
}
