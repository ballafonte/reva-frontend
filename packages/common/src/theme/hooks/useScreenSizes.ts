import { useCallback, useEffect, useMemo, useState } from 'react';
import { BREAKPOINTS } from '../responsiveness';

interface WindowWithInnerHeightAndWidth {
	innerHeight: number;
	innerWidth: number;
	addEventListener: (event: string, handler: () => void) => void;
	removeEventListener: (event: string, handler: () => void) => void;
}

export const useScreenSizes = (window: WindowWithInnerHeightAndWidth) => {
	const [screenHeight, setScreenHeight] = useState<number>(0);
	const [screenWidth, setScreenWidth] = useState<number>(0);

	useEffect(() => {
		// Handler to call on window resize
		const handleResize = () => {
			// Set window width/height to state
			setScreenHeight(window.innerHeight);
			setScreenWidth(window.innerWidth);
		};
		// Add event listener
		window.addEventListener('resize', handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Empty array ensures that effect is only run on mount

	const relativeSizeChecks = useMemo(
		() => ({
			isAtLeastXs: screenWidth >= BREAKPOINTS.XS,
			isAtLeastSm: screenWidth >= BREAKPOINTS.SM,
			isAtLeastMd: screenWidth >= BREAKPOINTS.MD,
			isAtLeastLg: screenWidth >= BREAKPOINTS.LG,
			isAtLeastXl: screenWidth >= BREAKPOINTS.XL,
			isAtLeastXxl: screenWidth >= BREAKPOINTS.XXL,
			isAtMostXs: screenWidth <= BREAKPOINTS.XS,
			isAtMostSm: screenWidth <= BREAKPOINTS.SM,
			isAtMostMd: screenWidth <= BREAKPOINTS.MD,
			isAtMostLg: screenWidth <= BREAKPOINTS.LG,
			isAtMostXl: screenWidth <= BREAKPOINTS.XL,
			isAtMostXxl: screenWidth <= BREAKPOINTS.XXL,
		}),
		[screenWidth]
	);

	const getResponsiveStyles = useCallback(
		(size: keyof typeof relativeSizeChecks, styles: React.CSSProperties) =>
			relativeSizeChecks[size] ? styles : {},
		[relativeSizeChecks]
	);

	return {
		...relativeSizeChecks,
		isLandscape: window.innerHeight <= window.innerWidth,
		isPortait: window.innerHeight > window.innerWidth,
		screenHeight,
		screenWidth,
		getResponsiveStyles,
	};
};
