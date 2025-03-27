export interface Toast {
  id: string;
  severity: 'success' | 'info' | 'warn' | 'error';
  title: string;
  message: string;
  life: number;
}
