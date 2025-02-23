import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/shared-ui/atoms/Button';
import { IoRefreshOutline, IoWarningOutline } from 'react-icons/io5';
import { containerCss, iconCss, titleCss, messageCss, buttonsCss, errorDetailsCss } from './styles';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error);
      // Example: LogRocket.captureException(error);
    }

    // Update state with error details
    this.setState({ error, errorInfo });

    // Clear any cached state that might be causing the error
    try {
      // Clear localStorage items that might be corrupted
      localStorage.removeItem('theme');
      localStorage.removeItem('lastError');

      // Store error details for debugging
      localStorage.setItem(
        'lastError',
        JSON.stringify({
          message: error.message,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch (e) {
      console.error('Failed to handle error cleanup:', e);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) {
      return children;
    }

    if (fallback) {
      return fallback;
    }

    return (
      <div css={containerCss}>
        <IoWarningOutline size={64} css={iconCss} />
        <h2 css={titleCss}>Oops! Something went wrong</h2>
        <p css={messageCss}>
          We apologize for the inconvenience. Please try refreshing the page or contact support if
          the problem persists.
        </p>
        <div css={buttonsCss}>
          <Button variant="primary" onClick={this.handleReload} icon={<IoRefreshOutline />}>
            Refresh Page
          </Button>
          <Button variant="secondary" onClick={this.handleReset}>
            Try Again
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div css={errorDetailsCss}>
            <pre>{error.toString()}</pre>
            {errorInfo && <pre>{errorInfo.componentStack}</pre>}
          </div>
        )}
      </div>
    );
  }
}
