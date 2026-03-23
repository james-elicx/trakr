/**
 * Wraps image URLs from domains that block direct access (walter-r2.trakt.tv, etc.)
 * through our image proxy API, so Next.js image optimizer can fetch them.
 */
const PROXIED_HOSTS = ["walter-r2.trakt.tv", "walter.trakt.tv"];

export function proxyImageUrl(url: string | null | undefined): string | null {
	if (!url) return null;

	try {
		const parsed = new URL(url);
		if (PROXIED_HOSTS.includes(parsed.hostname)) {
			return `/api/image-proxy?url=${encodeURIComponent(url)}`;
		}
	} catch {
		// Not a valid URL, return as-is
	}

	return url;
}
