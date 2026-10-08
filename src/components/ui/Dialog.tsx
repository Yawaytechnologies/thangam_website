import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useDialog } from '../../hooks/use-dialog';

export function Dialog({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  useDialog(onClose);
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={event => event.stopPropagation()}>
      <button className="dialog-close" aria-label="Close dialog" onClick={onClose}><X size={20}/></button>
      {children}
    </div>
  </div>;
}
