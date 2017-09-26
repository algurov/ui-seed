export const menuItems = [
  {
    name: 'DOCUMENTS',
    icon: 'docs',
    activator: 1,
    sub: [],
    top: true
  },
  {
    name: 'FILES',
    icon: 'files',
    activator: 2,
    sub: [],
    top: true
  },
  {
    name: 'TASKS',
    icon: 'task',
    activator: 3,
    sub: [],
    top: true
  },
  {
    name: 'AGENT',
    icon: 'agent',
    activator: 4,
    sub: [],
    top: true
  },
  {
    name: 'SETTINGS_TITLE',
    icon: 'settings',
    activator: 0,
    top: false,
    sub: [
      {
        name: 'USERS_TITLE',
        icon: 'user',
        link: 'main/user'
      },
      {
        name: 'ROLE_TITLE',
        icon: 'role',
        link: 'main/roles'
      },
      {
        name: 'DEPARTMENT_TITLE',
        icon: 'location',
        link: 'main/locations'
      },
      {
        name: 'TAXONOMY_TITLE',
        icon: 'taxonomy',
        link: 'main/taxonomy'
      }
    ]
  },

  {
    name: 'LOGOUT',
    icon: 'logout',
    activator: 5,
    sub: [],
    top: false,
    action: 'logout'
  }
];
