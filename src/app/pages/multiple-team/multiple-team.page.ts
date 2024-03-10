import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiple-team',
  templateUrl: './multiple-team.page.html',
  styleUrls: ['./multiple-team.page.scss'],
})
export class MultipleTeamPage implements OnInit {
  options = ['Option 1', 'Option 2', 'Option 3'];
  selectedValues: { [key: string]: boolean } = {};
  
  constructor(private http:HttpClient) { }

  ngOnInit() {
  }
  updateValues() {
    const selectedOptions = Object.keys(this.selectedValues).filter(key => this.selectedValues[key]);
    console.log(selectedOptions); // yaha par aapko selected values mil jayegi
    // aapko yaha par server par bhejne ka logic add karna hoga
  }

}
