'use client';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { DEMO_STORAGE_KEY, emptyDemo, parseDemo, type DemoState } from '@/lib/ticketing/demo';
type Context = { state: DemoState; ready: boolean; storageError: boolean; update: (change: (state: DemoState) => DemoState) => DemoState; reset: () => void };
const DemoContext = createContext<Context | null>(null);
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(emptyDemo);
  const [ready, setReady] = useState(false), [storageError, setStorageError] = useState(false);
  const current = useRef(state);
  useEffect(() => { const timer = setTimeout(() => { try { const next = parseDemo(sessionStorage.getItem(DEMO_STORAGE_KEY)); current.current = next; setState(next); } catch { setStorageError(true); } setReady(true); }, 0); return () => clearTimeout(timer); }, []);
  function update(change: (state: DemoState) => DemoState) {
    if (!ready || storageError) throw new Error('Storage unavailable');
    const next = change(current.current);
    sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(next));
    current.current = next; setState(next); return next;
  }
  function reset() { sessionStorage.removeItem(DEMO_STORAGE_KEY); sessionStorage.removeItem('orderup-demo-challenge'); const next = emptyDemo(); current.current = next; setState(next); setStorageError(false); }
  return <DemoContext.Provider value={{ state, ready, storageError, update, reset }}>{children}</DemoContext.Provider>;
}
export function useDemo() { const context = useContext(DemoContext); if (!context) throw new Error('DemoProvider missing'); return context; }
