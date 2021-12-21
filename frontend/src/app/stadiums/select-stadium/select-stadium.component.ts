import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';
import { Stadium, StadiumService } from '../stadium.service';

@Component({
  selector: 'app-select-stadium',
  templateUrl: './select-stadium.component.html',
  styleUrls: ['./select-stadium.component.scss'],
})
export class SelectStadiumComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'distance', 'location'];
  dataSource!: MatTableDataSource<Stadium>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedProvince!: string;
  selectedDistrict!: string;
  provinces = [
    'Andijon',
    'Namangan',
    "Farg'ona",
    'Toshkent',
    'Jizzah',
    'Samarqand',
    'Qashqadaryo',
    'Surhandaryo',
    'Navoiy',
    'Xorazm',
  ];
  districts = [
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
    'Chilonzor',
  ];
  stadiums!: Stadium[];

  subs: Subscription[] = [];

  constructor(
    private stadiumService: StadiumService,
    private loaderService: LoaderService
  ) {
    this.loaderService.isLoaderActive.next(true);

    this.subs.push(
      this.stadiumService.getStadiums().subscribe((res: any) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res as Stadium[]);
        this.stadiums = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loaderService.isLoaderActive.next(false);
      })
    );
  }
  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
