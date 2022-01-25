import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  public isScreenSmall: boolean = false;

  users!: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: Direction = 'ltr';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router
  ) {}

  @ViewChild('drawer') drawer: MatDrawer | undefined;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  toggleDir() {
    this.dir = this.dir === 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

    this.users = this.userService.users;
    this.userService.loadAll();
  }

  closeDrawer(): void {
    if (this.isScreenSmall) {
      this.drawer?.close();
    }
  }
}
