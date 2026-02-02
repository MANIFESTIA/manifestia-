'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white p-10">
                    <div className="max-w-2xl bg-red-900/20 border border-red-500/50 p-8 rounded-2xl backdrop-blur-xl">
                        <h2 className="text-3xl font-bold mb-4 text-red-400">Kritik Hata (Global)</h2>
                        <p className="mb-4">Uygulama yüklenirken beklenmedik bir hata oluştu.</p>
                        <div className="bg-black/50 p-4 rounded-xl overflow-auto max-h-[40vh] mb-6 font-mono text-xs">
                            {error.message}
                            <br />
                            {error.stack}
                        </div>
                        <button
                            onClick={() => reset()}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
