import { createContext, useContext } from 'react';

export const DemoModalContext = createContext({
  openDemo: () => {},
  closeDemo: () => {},
});

export function useDemoModal() {
  return useContext(DemoModalContext);
}
