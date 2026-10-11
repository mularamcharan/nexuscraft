import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 my-8 bg-[#0e1628] border border-red-500/30 rounded-3xl text-center space-y-4 shadow-2xl animate-fadeIn max-w-xl mx-auto">
          <div className="w-14 h-14 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-white">
              {this.props.fallbackTitle || 'Something went wrong in this section'}
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              {this.state.error?.message || 'An unexpected error occurred while rendering this component. Your session and progress are safely preserved.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] p-8 space-y-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-pulse" />
        <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
      </div>
      <p className="text-xs font-extrabold text-cyan-400 tracking-wider uppercase animate-pulse">Loading section...</p>
    </div>
  );
}

