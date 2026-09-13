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

export type GridCell = {
	image?: string | null;
	position?: string;
};

function loadImage(src: string) {
	return new Promise<HTMLImageElement>((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = 'anonymous';
		img.onload = () => resolve(img);
		img.onerror = () => reject(new Error(`Failed to load ${src}`));
		img.src = src;
	});
}

/** Stitches every grid cell (art, numbered empties, and blank tiles) into one PNG download. */
export async function downloadCombinedGridImage(
	arts: GridCell[],
	cols: number,
	filename: string
) {
	const cellSize = 512;
	const rows = Math.ceil(arts.length / cols);
	const canvas = document.createElement('canvas');
	canvas.width = cols * cellSize;
	canvas.height = rows * cellSize;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('Could not create canvas');

	ctx.fillStyle = '#18181b';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const sources = [
		...new Set(arts.map((art) => art.image).filter((src): src is string => Boolean(src)))
	];
	const loaded = await Promise.all(
		sources.map(async (src) => {
			try {
				return [src, await loadImage(src)] as const;
			} catch {
				return [src, null] as const;
			}
		})
	);
	const images = new Map(loaded);

	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.font = `500 ${Math.round(cellSize * 0.14)}px ui-sans-serif, system-ui, sans-serif`;

	for (let i = 0; i < arts.length; i++) {
		const art = arts[i];
		const x = (i % cols) * cellSize;
		const y = Math.floor(i / cols) * cellSize;

		if (art.image) {
			const img = images.get(art.image);
			if (img) {
				ctx.drawImage(img, x, y, cellSize, cellSize);
			} else {
				ctx.fillStyle = '#09090b';
				ctx.fillRect(x, y, cellSize, cellSize);
			}
			continue;
		}

		if (art.image === '') {
			ctx.fillStyle = '#09090b';
			ctx.fillRect(x, y, cellSize, cellSize);
			ctx.fillStyle = '#ffffff';
			ctx.fillText(art.position ?? '', x + cellSize / 2, y + cellSize / 2);
		}
	}

	await new Promise<void>((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(new Error('Could not create image'));
				return;
			}
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = filename;
			link.click();
			URL.revokeObjectURL(url);
			resolve();
		}, 'image/png');
	});
}
