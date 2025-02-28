import { useTheme } from '@emotion/react';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import { IoClose } from 'react-icons/io5';

import { breakpoints } from '@/styles/variables';
import { useResponsive } from '@/utils/context/ResponsiveContext';

import {
  closeButtonCss,
  modalBodyCss,
  modalContentWrapperCss,
  modalFooterCss,
  modalHeaderCss,
  modalOverlayCss,
} from './styles';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
};

const Card = dynamic(() => import('@/shared-ui/atoms/Card'), {
  ssr: false,
  loading: () => null,
});

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  closeOnOverlayClick = true,
  closeOnEsc = true,
}: ModalProps) => {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEsc]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeStyles = {
    small: { width: breakpoints.sm },
    medium: { width: breakpoints.md },
    large: { width: breakpoints.lg },
    extraLarge: { width: breakpoints.xl },
  };

  const modalContent = (
    <div css={modalOverlayCss} onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        css={modalContentWrapperCss(theme, isMobile)}
        style={sizeStyles[size]}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <Card>
          <div css={modalHeaderCss}>
            <h2 id="modal-title">{title}</h2>
            <button css={closeButtonCss(theme)} onClick={onClose} aria-label="Close modal">
              <IoClose size={24} />
            </button>
          </div>
          <div css={modalBodyCss}>{children}</div>
          {footer && <div css={modalFooterCss}>{footer}</div>}
        </Card>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
