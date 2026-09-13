import { artList } from '../store/images.svelte';
import { getPrimaryArtistLink, type ArtistLinks } from './utils';

export type WallPiece = ArtistLinks & {
	image: string;
	artist?: string;
};

function hasArtwork(art: ArtistLinks & { image?: string | null }): art is WallPiece {
	return typeof art.image === 'string' && art.image.length > 0;
}

/** Every real artwork across every theme. New lists on `artList` are included automatically. */
export function getAllArtwork(): WallPiece[] {
	const themes = artList as Record<string, unknown>;
	return Object.keys(themes).flatMap((key) => {
		const theme = themes[key];
		if (!Array.isArray(theme)) return [];
		return theme.filter(hasArtwork);
	});
}

export function artistHref(art: ArtistLinks) {
	const link = getPrimaryArtistLink(art);
	if (link.href) return link.href;
	if (link.profileSlug) return `/${link.profileSlug}`;
	return '';
}
