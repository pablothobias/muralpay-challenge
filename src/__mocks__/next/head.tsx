import React, { useEffect } from 'react';

interface HeadProps {
  children: React.ReactNode;
}

export default function Head({ children }: HeadProps) {
  useEffect(() => {
    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return;

      if (child.type === 'title' && child.props.children) {
        document.title = child.props.children;
      }

      if (child.type === 'meta' && child.props.name === 'robots') {
        let metaTag = document.querySelector('meta[name="robots"]');
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', 'robots');
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', child.props.content);
      }

      if (child.type === 'meta' && child.props.name === 'description') {
        let metaTag = document.querySelector('meta[name="description"]');
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('name', 'description');
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', child.props.content);
      }
    });

    return () => {};
  }, [children]);

  return <>{children}</>;
}
