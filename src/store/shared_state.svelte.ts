export const sharedState = $state({
	chosenArtGrid: 1,
	chosenSize: 'XL',
	sizes: ['XS', 'S', 'M', 'L', 'XL'],
	rounds: [
		{
			round: 'Round 1',
			name: 'Ethiopian Artists',
			index: 1,
			defaultSize: 'XL'
		},
		{
			round: 'Round 2',
			name: 'Christian Cross',
			index: 2,
			defaultSize: 'L'
		},
		{
			round: 'Round 3',
			name: 'Space',
			index: 3,
			defaultSize: 'XL'
		}
	]
});
