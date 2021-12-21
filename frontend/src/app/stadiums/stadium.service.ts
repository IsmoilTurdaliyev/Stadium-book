import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Stadium {
  city: string;
  created_at: string;
  description: string;
  id: number;
  is_verified: boolean;
  map_link: string;
  name: string;
  region: string;
  stadium_owner: Owner;
  telephone: string;
  updated_at?: string;
}
export interface Owner {
  date_joined: string;
  email: string;
  first_name?: string;
  is_active: boolean;
  is_stadium_owner: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login?: string;
  last_name?: string;
  telephone?: string;
  username: string;
}

const api = environment.api;

@Injectable({
  providedIn: 'root',
})
export class StadiumService {
  stadiums: BehaviorSubject<Stadium[]> = new BehaviorSubject<Stadium[]>([]);
  constructor(private http: HttpClient) {}

  getStadiums() {
    return this.http.get(api + 'stadiums/');
  }

  getStadiumById(id: any) {
    return this.http.get(api + `stadiums/${id}/`);
  }

  getOrders() {
    return this.http.get(api + 'orders/');
  }
}
