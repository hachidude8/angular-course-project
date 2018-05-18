import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dataStorage: DataStorageService,
    private auth: AuthService
  ) {}

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorage.storeRecipes()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  onFetchData() {
    this.dataStorage.getRecipes();
  }

  onLogout() {
    this.auth.logout();
  }

}
