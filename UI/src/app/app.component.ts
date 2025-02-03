import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient, HttpResponse,HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
// welcome
  public welcomeMessage!: string;
  public convertedTimes!: string;

  private baseURL: string = 'http://localhost:8080';
  private getURL: string = this.baseURL + '/room/reservation/v1/';
  private postUrl: string = this.baseURL + '/room/reservation/v1';
  //room search and reservations
  public submitted!: boolean;
  roomsearch!: FormGroup;
  rooms!: Room[];
  request!: ReserveRoomRequest;
  currentCheckInVal!: string;
  currentCheckOutVal!: string;

  constructor(private httpClient:HttpClient){}

  ngOnInit() {
    this.getWelcomeMessage();
    this.getConvertedTimes();

    this.roomsearch = new FormGroup({
      checkin: new FormControl(' '),
      checkout: new FormControl(' ')
    });

    const roomsearchValueChanges$ = this.roomsearch.valueChanges;
// Subscribe to the stream
    roomsearchValueChanges$.subscribe(x => {
      this.currentCheckInVal = x.checkin;
      this.currentCheckOutVal = x.checkout;
    });
  }

  // Fetch welcome message from the backend
  getWelcomeMessage() {
    this.httpClient.get(this.baseURL + '/welcome', { responseType: 'text' })
      .subscribe(data => {
        this.welcomeMessage = data;
      }, error => {
        console.error('There was an error!', error);
      });
  }
  getConvertedTimes() {
    this.httpClient.get(this.baseURL + '/timezone-conversion', { responseType: 'text' })
      .subscribe(data => {
        this.convertedTimes = data;
      }, error => {
        console.error('Error fetching converted times!', error);
      });
  }

  // Handle form submission to get available rooms
  onSubmit({ value, valid }: { value: Roomsearch, valid: boolean }) {
    if (valid) {
      this.getAll().subscribe(rooms => {
        this.rooms = <Room[]>Object.values(rooms)[0];
        this.roomsearch.reset();
        // Convert prices to CAD and EUR
        this.rooms.forEach(room => {
          const priceUSD = parseFloat(room.price);

          // Simple conversion calculations (these are examples)
          room.priceCAD = (priceUSD * 1.25).toFixed(2);  // Conversion to CAD
          room.priceEUR = (priceUSD * 0.85).toFixed(2);  // Conversion to EUR
        });
      }, error => {
        console.error('Error fetching rooms', error);
      });
    } else {
      console.error('Form is invalid');
    }
  }

  // Reserve a room based on the selected value
  reserveRoom(value: string) {
    this.request = new ReserveRoomRequest(value, this.currentCheckInVal, this.currentCheckOutVal);
    this.createReservation(this.request);
  }

  // Create a reservation with the backend
  createReservation(body: ReserveRoomRequest) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    };

    this.httpClient.post(this.postUrl, body, options)
      .subscribe(res => console.log(res));
  }

  // Get all rooms based on search criteria
  getAll(): Observable<any> {
    return this.httpClient.get(this.baseURL + '/room/reservation/v1?checkin=' + this.currentCheckInVal + '&checkout=' + this.currentCheckOutVal, { responseType: 'json' });
  }
}

export interface Roomsearch {
  checkin: string;
  checkout: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  price: string;
  links: string;
  priceCAD?: string;  // Canada dollars
  priceEUR?: string;  // Euros
}

export class ReserveRoomRequest {
  roomId: string;
  checkin: string;
  checkout: string;

  constructor(roomId: string, checkin: string, checkout: string) {
    this.roomId = roomId;
    this.checkin = checkin;
    this.checkout = checkout;
  }
}
