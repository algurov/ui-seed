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
  ],
    'STANDARD_LIST' : [
      {
        name: 'ADD_STANDARD',
        action: 'ADD_STANDARD',
        type: 'link',
        state: true
      },
    ],
    'STANDARD_EDIT' : [
      {
        name: 'EDIT_STANDARD',
        action: 'EDIT_STANDARD',
        type: 'button',
        state: true
      },
      {
        name: 'REMOVE_STANDARD',
        action: 'REMOVE_STANDARD',
        type: 'button',
        state: false
      }
    ],
    'STANDARD_PROPERTY_EDIT': [
      {
        name: 'EDIT_STANDARD_PROPERTY',
        action: 'EDIT_STANDARD_PROPERTY',
        type: 'button',
        state: true
      }
    ],
    'CERTIFICATE_EDIT': [
      {
        name: 'SIGN_CERTIFICATE',
        action: 'SIGN_CERTIFICATE',
        type: 'button',
        state: false
      },
      {
        name: 'SAVE_CERTIFICATE',
        action: 'SAVE_CERTIFICATE',
        type: 'button',
        state: true
      }
  ],
  'PROPERTY_LIST' : [
    {
      name: 'ADD_PROPERTY',
      action: 'ADD_PROPERTY',
      type: 'link',
      state: true
    },
  ],
  'PROPERTY_EDIT': [
    {
      name: 'SAVE_PROPERTY',
      action: 'SAVE_PROPERTY',
      type: 'button',
      state: true
    },
    {
      name: 'REMOVE_PROPERTY',
      action: 'REMOVE_PROPERTY',
      type: 'button',
      state: false
    }
  ],
  'UNIT_LIST' : [
    {
      name: 'ADD_UNIT',
      action: 'ADD_UNIT',
      type: 'link',
      state: true
    },
  ],
  'UNIT_EDIT': [
    {
      name: 'SAVE_UNIT',
      action: 'SAVE_UNIT',
      type: 'button',
      state: true
    },
    {
      name: 'REMOVE_UNIT',
      action: 'REMOVE_UNIT',
      type: 'button',
      state: false
    }
  ],
  'ANALYSIS_CARD_EDIT': [
    {
      name: 'SIGN_ANALYSIS_CARD',
      action: 'SIGN_ANALYSIS_CARD',
      type: 'button',
      state: false
    },
    {
      name: 'SAVE_ANALYSIS_CARD',
      action: 'SAVE_ANALYSIS_CARD',
      type: 'button',
      state: true
    }]
  };
