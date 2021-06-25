import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  /*
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  },
  {
    label: 'UI Element',
    main: [
      {
        state: 'basic',
        name: 'Basic Components',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'button',
            name: 'Button'
          },
          {
            state: 'typography',
            name: 'Typography'
          }
        ]
      },
      {
        state: 'notifications',
        name: 'Notifications',
        type: 'link',
        icon: 'ti-crown'
      }
    ]
  },
  {
    label: 'Forms',
    main: [
      {
        state: 'forms',
        name: 'Form Components',
        type: 'link',
        icon: 'ti-layers'
      }
    ]
  },
  {
    label: 'Tables',
    main: [
      {
        state: 'bootstrap-table',
        name: 'Bootstrap Table',
        type: 'link',
        icon: 'ti-receipt'
      }
    ]
  },
  {
    label: 'Map',
    main: [
      {
        state: 'map',
        name: 'Maps',
        type: 'link',
        icon: 'ti-map-alt'
      }
    ]
  },
  {
    label: 'Pages',
    main: [
      {
        state: 'auth',
        short_label: 'A',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          }, {
            state: 'registration',
            type: 'link',
            name: 'Registration',
            target: true
          }
        ]
      }
    ]
  },*/
  {
    label: 'Reporting',
    main: [
      {
        state: '',
        name: 'Menu Levels',
        type: 'sub',
        icon: 'ti-direction-alt',
        children: [
          {
            state: '',
            name: 'Menu Level 2.1',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.2',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.2.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.2.2',
                target: true
              }
            ]
          }, {
            state: '',
            name: 'Menu Level 2.3',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.4',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.4.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.4.2',
                target: true
              }
            ]
          }
        ]
      }, 
      {
        state: 'simple-page',
        name: 'Welcome Page',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      },
      {
        state: 'welcome',
        name: 'Welcome Page',
        type: 'link',
        icon: 'ti-layout-grid2-alt'
      },
      {
        state: 'searchPDF',
        name: 'Search PDF',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      }
    ]
  }
];

@Injectable()
export class MenuItems {
  constructor(){}
  getAll():Menu[]{
    var menuList = [{
      label : 'Reporting',
      main : [
        {
          state: 'simple-page',
          name: 'Simple Page',
          type: 'link',
          icon: 'ti-layout-sidebar-left'
        }
      ]
    }];
    
   var item = {
    state: 'searchPDF',
    name: 'Search PDF',
    type: 'link',
    icon: 'ti-layout-sidebar-left'
  };
  menuList[0].main.push(item);

return menuList;
    //return MENUITEMS;
  }

  add(me: Menu) {
   // MENUITEMS.push(me);
  }
}
