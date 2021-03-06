export type IDrawerContent = 'contacts' | 'conversations';

export interface ILayoutState {
  showDrawer: boolean;
  drawerContent?: IDrawerContent;
  allowNavigation: boolean;
}

export const LAYOUT_RESET = 'LAYOUT_RESET';
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export const UPDATE_DRAWER_CONTENT = 'UPDATE_DRAWER_CONTENT';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

export interface ILayoutResetAction {
  type: typeof LAYOUT_RESET;
}

export interface IToggleDrawerAction {
  type: typeof TOGGLE_DRAWER;
  showDrawer: boolean;
}

export interface IUpdateDrawerContentAction {
  type: typeof UPDATE_DRAWER_CONTENT;
  drawerContent?: IDrawerContent;
}

export interface IToggleNavigationAction {
  type: typeof TOGGLE_NAVIGATION;
  allowNavigation: boolean;
}

export type ILayoutAction =
  | ILayoutResetAction
  | IToggleDrawerAction
  | IUpdateDrawerContentAction
  | IToggleNavigationAction;
