// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useDarkMode() {
  const [dark, setDark] = useLocalStorage('portfolio-dark-mode', false);

  useEffect(() => {
    // Always force light mode; ignore any previously saved dark preference
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // On first mount, ensure light mode is active
  useEffect(() => {
    localStorage.removeItem('portfolio-dark-mode');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return [dark, setDark] as const;
}
