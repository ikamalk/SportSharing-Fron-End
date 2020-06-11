import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialog } from './requestDialog/request-dialog';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss']
})
export class MyRequestComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  ];
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(RequestDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
  }

  stars(val) {
    const starPercentage = (val / 5) * 100;
    const starPercentageRounded = `${(starPercentage / 10) * 10}%`;
    return starPercentageRounded;
  }

}
