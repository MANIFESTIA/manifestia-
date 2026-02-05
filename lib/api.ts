export const getApiUrl = (path: string) => {
    // Production URL'i buraya gelecek (örn: https://manifestia.com)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

    // Path başında / varsa kaldır, yoksa olduğu gibi bırak (çift slash olmaması için)
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    if (!baseUrl) {
        return `/${cleanPath}`;
    }

    return `${baseUrl}/${cleanPath}`;
};
