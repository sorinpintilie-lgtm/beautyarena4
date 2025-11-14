import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-beauty-pink mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Ceva nu a mers bine
            </h2>
            <p className="text-gray-600 mb-6">
              Ne pare rău, dar a apărut o eroare. Te rugăm să reîncarci pagina.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reîncarcă pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;