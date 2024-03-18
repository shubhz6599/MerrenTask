import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  objects: any[]=[];
  newObject: any = { id: '', name: '', data: { price: null, color: '' } };
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchObjects();
  }

  fetchObjects(): void {
    this.apiService.getObjects().subscribe(
      (response: any[]) => {
        this.objects = response.map(obj => ({
          ...obj,
          data: obj.data ? obj.data : { price: null, color: null }
        }));
      },
      (error) => {
        console.error('Error fetching objects:', error);
      }
    );
  }

  addObject(): void {
    this.apiService.addObject(this.newObject).subscribe(
      (response: any) => {
        console.log('Object added successfully:', response);
        // this.fetchObjects();
        this.objects.push(this.newObject)
        this.newObject = { id: '', name: '', data: { price: null, color: '' } };
      },
      (error) => {
        console.error('Error adding object:', error);
      }
    );
  }
}
