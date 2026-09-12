import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ArtistLinks = {
	instagram?: string;
	telegram?: string;
	site?: string;
	/** @deprecated Use `instagram` instead. Treated as an Instagram username. */
	link?: string;
};

function firstValue(...values: Array<string | undefined>) {
	for (const value of values) {
		if (typeof value === 'string' && value.trim() !== '') {
			return value.trim().replace(/^@/, '');
		}
	}
	return '';
}

function siteHref(site: string) {
	return /^https?:\/\//i.test(site) ? site : `https://${site}`;
}

function siteLabel(site: string) {
	try {
		return new URL(siteHref(site)).hostname.replace(/^www\./, '');
	} catch {
		return site.replace(/^https?:\/\//i, '').replace(/^www\./, '').replace(/\/.*$/, '');
	}
}

/** Instagram, then Telegram, then site — the first set field wins. */
export function getPrimaryArtistLink(art: ArtistLinks) {
	const instagram = firstValue(art.instagram, art.link);
	if (instagram) {
		return {
			href: `https://www.instagram.com/${instagram}`,
			label: `@${instagram}`,
			profileSlug: instagram
		};
	}

	const telegram = firstValue(art.telegram);
	if (telegram) {
		return {
			href: `https://t.me/${telegram}`,
			label: `@${telegram}`,
			profileSlug: telegram
		};
	}

	const site = firstValue(art.site);
	if (site) {
		return {
			href: siteHref(site),
			label: siteLabel(site),
			profileSlug: null as string | null
		};
	}

	return { href: '', label: '', profileSlug: null as string | null };
}

export function artMatchesArtist(art: ArtistLinks, artistUsername: string) {
	const instagram = firstValue(art.instagram, art.link);
	const telegram = firstValue(art.telegram);
	return instagram === artistUsername || telegram === artistUsername;
}
