import { dataRoutes, extractMenuStructure } from './menus';

// Get routes configuration
export const getDataRoutes = () => {
  return dataRoutes;
};

// Get menu structure from data routes
export const getMenusFromDataRoutes = () => {
  return extractMenuStructure(dataRoutes);
};
