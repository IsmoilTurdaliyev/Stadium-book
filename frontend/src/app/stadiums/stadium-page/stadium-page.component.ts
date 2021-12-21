import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Stadium, StadiumService } from '../stadium.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-stadium-page',
  styleUrls: ['stadium-page.component.scss'],
  templateUrl: 'stadium-page.component.html',
})
export class StadiumPageComponent implements OnInit, OnDestroy {
  stadium!: Stadium;
  displayedColumns: string[] = ['id', 'from', 'to'];
  dataSource!: MatTableDataSource<any>;
  orders!: any[];
  isZoomOpen = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subs: Subscription[] = [];

  constructor(
    private stadiumService: StadiumService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {
    this.subs.push(
      this.stadiumService.getOrders().subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res);

        this.orders = res;
        console.log(res);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  ngOnInit() {
    let id: number;
    this.loaderService.isLoaderActive.next(true);

    this.route.params.subscribe((params: Params) => {
      id = +params['id'];

      this.subs.push(
        this.stadiumService.getStadiumById(id).subscribe((stadium: any) => {
          this.stadium = stadium;
          this.loaderService.isLoaderActive.next(false);
        })
      );
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
