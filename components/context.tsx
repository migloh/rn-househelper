import React from 'react';

type AppContext = {
  signIn: () => void,
  signInAdmin: () => void,
  signOut: () => void
}

export const AuthContext = React.createContext<Partial<AppContext>>({});