import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <span className="font-display text-6xl font-black text-cyber-red opacity-20">!</span>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">Something went wrong</h1>
          <p className="mt-2 max-w-md font-mono text-xs text-gray-500">{this.state.error?.message ?? "Unexpected error"}</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-6 !px-6">
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
