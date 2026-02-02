"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white p-10 overflow-auto">
                    <div className="max-w-4xl w-full bg-red-900/20 border border-red-500/50 p-8 rounded-2xl backdrop-blur-xl">
                        <h1 className="text-3xl font-bold mb-4 text-red-400">Uygulama Hatası</h1>
                        <p className="mb-4 text-gray-300">Bir hata oluştu. Lütfen bu ekranın görüntüsünü alıp geliştiriciye iletin.</p>

                        <div className="bg-black/50 p-4 rounded-xl overflow-auto max-h-[60vh] font-mono text-xs md:text-sm">
                            <p className="text-red-300 font-bold mb-2">{this.state.error?.toString()}</p>
                            <pre className="text-gray-400 whitespace-pre-wrap">
                                {this.state.errorInfo?.componentStack || this.state.error?.stack}
                            </pre>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
                        >
                            Önbelleği Temizle ve Yenile
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
