import uuid from 'uuid';
// Action Types

export const Types = {
  CREATE: 'contacts/CREATE',
  DELETE: 'contacts/DELETE',
  EDIT: 'contacts/EDIT',
  LIST: 'contacts/LIST',
};

// Reducer

const initialState = [];

export default function contacts(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE:
      return [
        ...state,
        {
          id: uuid(),
          name: action.payload.name,
          email: action.payload.email,
        },
      ];

    case Types.EDIT:
      return state.map(contact =>
        contact.id === action.payload.id
          ? {
              ...contact,
              name: action.payload.name,
              email: action.payload.email,
            }
          : contact
      );

    case Types.DELETE:
      return state.filter(contact => contact.id !== action.payload.id);

    default:
      return state;
  }
}

// Action Creators

export const Creators = {
  createContact: ({ name, email }) => ({
    type: Types.CREATE,
    payload: { name, email },
  }),

  deleteContact: id => {
    return {
      type: Types.DELETE,
      payload: { id },
    };
  },

  editContact: ({ id, name, email }) => ({
    type: Types.EDIT,
    payload: { id, name, email },
  }),
};
