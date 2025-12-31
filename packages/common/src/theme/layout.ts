import { WHITESPACE } from './whitespace';

const flexBoxCenteredStyles = {
	alignItems: 'center',
	display: 'flex',
	justifyContent: 'center',
} as const;

const flexBoxColumnCenteredStyles = {
	...flexBoxCenteredStyles,
	flexDirection: 'column',
} as const;

const containerStyles = {
	paddingLeft: WHITESPACE.md,
	paddingRight: WHITESPACE.md,
	marginLeft: 'auto',
	marginRight: 'auto',
	width: '100%',
} as const;

export const layoutStyles = {
	containerStyles,
	flexBoxCenteredStyles,
	flexBoxColumnCenteredStyles,
};
