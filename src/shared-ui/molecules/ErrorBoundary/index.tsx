import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/shared-ui/atoms/Button';
import { IoRefreshOutline } from 'react-icons/io5';
import Image from 'next/image';
import {
  containerCss,
  contentWrapperCss,
  illustrationCss,
  titleCss,
  messageCss,
  buttonsCss,
  errorDetailsCss,
} from './styles';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  message: string;
  emoji: string;
}

const funnyMessages = [
  { message: 'Whoops! Our code took an unexpected vacation.', emoji: '🏖️' },
  { message: 'Looks like our hamsters need a coffee break! ', emoji: '☕' },
  { message: "Houston, we've had a problem... ", emoji: '🚀' },
  { message: "404: Success not found. But we're working on it! ", emoji: '🔍' },
  { message: 'Our code is playing hide and seek... and winning! ', emoji: '🙈' },
];

export class ErrorBoundary extends Component<Props, State> {
  static randomNumber = Math.floor(Math.random() * funnyMessages.length);

  public state: State = {
    hasError: false,
    message: funnyMessages[ErrorBoundary.randomNumber].message,
    emoji: funnyMessages[ErrorBoundary.randomNumber].emoji,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      message: funnyMessages[ErrorBoundary.randomNumber].message,
      emoji: funnyMessages[ErrorBoundary.randomNumber].emoji,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    this.setState({ error, errorInfo });

    try {
      localStorage.setItem(
        'lastError',
        JSON.stringify({
          message: error.message,
          timestamp: new Date().toISOString(),
        }),
      );
    } catch (e) {
      console.error('Failed to store error details:', e);
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      message: funnyMessages[ErrorBoundary.randomNumber].message,
      emoji: funnyMessages[ErrorBoundary.randomNumber].emoji,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    const { hasError, error, errorInfo, message, emoji } = this.state;
    const { children } = this.props;

    if (!hasError) {
      return children;
    }

    return (
      <div css={(theme) => containerCss(theme)}>
        <div css={contentWrapperCss}>
          <span css={(theme) => illustrationCss(theme)}>
            <Image
              src="/assets/images/error.gif"
              alt="Error Illustration"
              width={480}
              height={270}
              unoptimized
              priority
            />
          </span>
          <h1 css={(theme) => titleCss(theme)}>
            <span>{message}</span>
            <strong>{emoji}</strong>
          </h1>
          <p css={(theme) => messageCss(theme)}>
            Don&apos;t worry, our team of expert debug ninjas are already on the case! 🥷
            <br />
            In the meantime, you can try refreshing the page or starting over.
          </p>
          <div css={buttonsCss}>
            <Button variant="primary" onClick={this.handleReload} icon={<IoRefreshOutline />}>
              Give it another shot
            </Button>
            <Button variant="secondary" onClick={this.handleReset}>
              Start Fresh
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && error && (
            <div css={(theme) => errorDetailsCss(theme)}>
              <pre>{error.toString()}</pre>
              {errorInfo && <pre>{errorInfo.componentStack}</pre>}
            </div>
          )}
        </div>
      </div>
    );
  }
}
