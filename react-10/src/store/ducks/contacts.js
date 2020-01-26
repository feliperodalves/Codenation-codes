// Action Types

export const Types = {
  CREATE: 'contacts/CREATE',
  DELETE: 'contacts/DELETE',
};

// Reducer

const initialState = {
  contacts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.CREATE:
      return { ...state };
    case Types.DELETE:
      return { ...state };
    default:
      return state;
  }
}

// Action Creators

export function createContact(name, email) {
  return {
    type: Types.CREATE,
    payload: {
      name,
      email,
    },
  };
}

export function deleteContact() {
  return {
    type: Types.DELETE,
  };
}
