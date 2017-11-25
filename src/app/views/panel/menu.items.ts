export const menuItems = [
  {
    name: 'DOCUMENTS',
    icon: 'docs',
    activator: 1,
    link: 'main/document',
    sub: [
    ],
    actions: [
      {
        name: 'ADD_APPLICATION',
        action: 'ADD_APPLICATION',
        visibleOn: 'main/document'
      },
      // {
      //   name: 'ADD_ACT',
      //   action: 'ADD_ACT'
      // }
    ],
    top: true
  },
  {
    name: 'FILES',
    icon: 'files',
    activator: 2,
    sub: [],
    top: true,
    actions:[]
  },
  {
    name: 'TASKS',
    icon: 'task',
    activator: 3,
    sub: [],
    top: true,
    actions:[]
  },
  {
    name: 'AGENT',
    icon: 'agent',
    link: 'main/agent',
    activator: 4,
    sub: [
      {
        name: 'PHISICS',
        icon: 'user',
        action: 'PERSONAL_FILTER'
      },
      {
        name: 'GROUP',
        icon: 'group',
        action: 'GROUP_FILTER'
      },
      {
        name: 'ALL_PARTNERS',
        icon: 'group',
        action: 'ALL_PARTNERS_FILTER'
      }
    ],
    actions: [
      {
        name: 'ADD_AGENT',
        action: 'add-agent'
      }
    ],
    top: true
  },
  {
    name: 'SETTINGS_TITLE',
    icon: 'settings',
    link: 'main/settings',
    activator: 0,
    top: false,
    actions:[],
    sub: [
      {
        name: 'USERS_TITLE',
        icon: 'user',
        link: 'main/settings/user'
      },
      {
        name: 'ROLE_TITLE',
        icon: 'role',
        link: 'main/settings/roles',
        actions: [
          {
            name: 'ADD_ROLE',
            action: 'ADD_ROLE'
          }
        ]
      },
      {
        name: 'DEPARTMENT_TITLE',
        icon: 'location',
        link: 'main/settings/locations'
      },
      {
        name: 'TAXONOMY_TITLE',
        icon: 'taxonomy',
        link: 'main/settings/taxonomy'
      }
    ]
  },

  {
    name: 'LOGOUT',
    icon: 'logout',
    activator: 5,
    sub: [],
    top: false,
    action: 'logout',
    actions:[]
  }
];
