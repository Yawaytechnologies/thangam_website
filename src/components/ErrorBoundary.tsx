import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Website rendering failed', error, info); }
  render() {
    if (this.state.failed) return <main className="section py-24" role="alert">
      <h1 className="text-4xl">Something went wrong.</h1>
      <p className="my-6">Please reload the website to try again.</p>
      <button className="button" onClick={() => window.location.reload()}>Reload website</button>
    </main>;
    return this.props.children;
  }
}
