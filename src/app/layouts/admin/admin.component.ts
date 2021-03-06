import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { state, style, transition, animate, trigger, AUTO_STYLE } from '@angular/animations';
import 'rxjs/add/operator/filter';
import { Menu, MenuItems } from '../../shared/menu-items/menu-items';
import { AuthenticationService } from 'src/services/AuthenticationService';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { MenuItem } from 'src/models/menuItem';
import { ReadKeyExpr } from '@angular/compiler';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  chatToggle = 'out';
  chatInnerToggle = 'off';
  innerHeight: string;
  isScrolled = false;
  isCollapsedMobile = 'no-block';
  toggleOn = true;
  windowWidth: number;
  @ViewChild('searchFriends', /* TODO: add static flag */ { static: false }) search_friends: ElementRef;
  @ViewChild('toggleButton', /* TODO: add static flag */ { static: false }) toggle_button: ElementRef;
  @ViewChild('sideMenu', /* TODO: add static flag */ { static: false }) side_menu: ElementRef;

  config: any;
  currentUser: User;
  userName : string;
  menuItems: Menu[];
  constructor(public menu: MenuItems, private router: Router, private authenticationService: AuthenticationService) {
    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributs(this.windowWidth);
   
    //if(this.authenticationService.currentUser != null){
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.userName = this.currentUser.username;
      this.menuItems = [{
        label: 'Reporting',
        main: [
          {
            state: 'home',
            name: 'Home',
            type: 'link',
            icon: 'icofont icofont-stylish-right text-danger'
          },
          {
            state: 'mab-survey-form',
            name: 'Survey Form',
            type: 'link',
            icon: 'icofont icofont-stylish-right text-danger'
          }
        ]
      }];
      var menuItemList: MenuItem[];
   //ti-layout-sidebar-left
   if(typeof this.currentUser.userId != "undefined"){
      const menuMap = new Map(Object.entries(this.currentUser.menuItem));
      menuMap.forEach((value, key) => {
        const menuItemList: MenuItem[] = value;
        if (key == "No_Category") {
          menuItemList.forEach(e => {
            var item = {
              state: e.url1,
              name: e.menu_name,
              type: 'link',
              icon: 'icofont icofont-stylish-right text-danger'
            };
            this.menuItems[0].main.push(item);
          });
        }
        else {
          var mitem = {
            state: '',
            name: menuItemList[0].category_name,
            type: 'sub',
            icon: 'icofont icofont-stylish-right text-danger',
            children: []
          };
//ti-direction-alt
          menuItemList.forEach(e => {
            var sub_item = {
              state: e.url1,
              name: e.menu_name
            };
            mitem.children.push(sub_item);
          });
          this.menuItems[0].main.push(mitem);
        }
     
        });
   }
  
      
    //console.log("menu serve data = "+JSON.stringify(this.currentUser.menuItem));
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.userName = this.currentUser.username;
   }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 768 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }

    if (reSizeFlag) {
      this.setMenuAttributs(this.windowWidth);
    }
  }

  setMenuAttributs(windowWidth) {
    if (windowWidth >= 768 && windowWidth <= 1024) {
      this.deviceType = 'tablet';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'push';
    } else if (windowWidth < 768) {
      this.deviceType = 'mobile';
      this.verticalNavType = 'offcanvas';
      this.verticalEffect = 'overlay';
    } else {
      this.deviceType = 'desktop';
      this.verticalNavType = 'expanded';
      this.verticalEffect = 'shrink';
    }
  }

  /*searchFriendList(event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function (elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }*/

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
  }

  toggleOpened() {
    if (this.windowWidth < 768) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    } else {
      this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
    }
  }
  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  onScroll(event) {
    this.isScrolled = false;
  }

  logout() {
    this.authenticationService.applicationBackend_logout(this.currentUser.userId);
  }

}
