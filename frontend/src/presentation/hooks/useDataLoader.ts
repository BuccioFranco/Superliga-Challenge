import { useState } from 'react';

export const useDataLoader = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const loadData = () => {
    setDataLoaded(true);
  };

  const clearData = () => {
    setDataLoaded(false);
    setCurrentComponent(null);
  };

  const changeComponent = (component: string) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentComponent(component);
      setIsVisible(true);
    }, 300);
  };

  return {
    dataLoaded,
    loadData,
    clearData,
    currentComponent,
    changeComponent,
    isVisible,
  };
};
