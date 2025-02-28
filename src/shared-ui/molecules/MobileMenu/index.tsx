import { useTheme } from '@emotion/react';
import { FC, useCallback, useEffect, useRef } from 'react';

import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';

import { Button } from '@/shared-ui';

import {
  containerCss,
  menuButtonCss,
  menuContentCss,
  menuItemCss,
  menuOverlayCss,
  menuHeaderCss,
} from './styles';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  children: React.ReactNode;
  title?: string;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, onOpen, children, title }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleClickOutside]);

  return (
    <>
      <Button
        variant="secondary"
        onClick={onOpen}
        css={menuButtonCss}
        aria-label="Open menu"
        aria-expanded={isOpen}
        className="mobile-menu-button"
      >
        <IoMenuOutline size={24} />
      </Button>

      {isOpen && (
        <>
          <div css={menuOverlayCss} aria-hidden="true" className="mobile-menu-overlay" />
          <div
            css={containerCss(theme)}
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="mobile-menu-container"
          >
            <div css={menuHeaderCss} className="mobile-menu-header">
              {title && <h2>{title}</h2>}
              <Button
                variant="secondary"
                onClick={onClose}
                css={menuButtonCss}
                aria-label="Close menu"
                className="mobile-menu-close-button"
              >
                <IoCloseOutline size={24} />
              </Button>
            </div>
            <div css={menuContentCss} role="menu" className="mobile-menu-content">
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

interface MenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({ children, onClick, icon, disabled }) => {
  const theme = useTheme();

  return (
    <button
      css={menuItemCss(theme)}
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
      tabIndex={0}
      className="mobile-menu-item"
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};

export default MobileMenu;
