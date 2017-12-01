export const menuActions =
  {
    'EMPTY': [],
    'APPLICATION':[
      {
        name: 'ADD_APPLICATION',
        action: 'ADD_APPLICATION',
        type: 'link',
        state: true
      }
    ],
    'APPLICATION_EDIT': [
      {
        name: 'SIGN_APPLICATION',
        action: 'SIGN_APPLICATION',
        type: 'button',
        state: false
      },
      {
        name: 'SAVE_APPLICATION',
        action: 'SAVE_APPLICATION',
        type: 'button',
        state: true
      },
      {
        name: 'CANCEL_APPLICATION',
        action: 'CANCEL_APPLICATION',
        type: 'button',
        state: true
      }
  ],
    'APPLICATION_VIEW': [
      {
        name: 'ADD_ACT',
        action: 'ADD_ACT',
        type: 'link',
        state: true
      }
    ],
    'ACT_EDIT': [
      {
        name: 'SIGN_ACT',
        action: 'SIGN_ACT',
        type: 'button',
        state: false
      },
      {
        name: 'SAVE_ACT',
        action: 'SAVE_ACT',
        type: 'button',
        state: true
      }
  ],
    'DIRECTION_EDIT': [
      {
        name: 'SIGN_DIRECTION',
        action: 'SIGN_DIRECTION',
        type: 'button',
        state: false
      },
      {
        name: 'SAVE_DIRECTION',
        action: 'SAVE_DIRECTION',
        type: 'button',
        state: true
      }
    ],
    'PARTNER_LIST': [
      {
        name: 'ADD_AGENT',
        action: 'add-agent',
        type: 'link',
        state: true
      }
    ],
    'PROTOCOL_EDIT': [
      {
        name: 'SIGN_PROTOCOL',
        action: 'SIGN_PROTOCOL',
        type: 'button',
        state: false
      },
      {
        name: 'SAVE_APPLICATION',
        action: 'SAVE_PROTOCOL',
        type: 'button',
        state: true
      },
      {
        name: 'CANCEL_APPLICATION',
        action: 'CANCEL_PROTOCOL',
        type: 'button',
        state: true
      }
  ]
  };
