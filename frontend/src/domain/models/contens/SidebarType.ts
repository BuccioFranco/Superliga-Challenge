export interface SidebarProps {
  onComponentChange: (component: string) => void;
  currentComponent: string | null;
}