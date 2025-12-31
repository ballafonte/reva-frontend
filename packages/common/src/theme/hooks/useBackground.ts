import { useEffect, useState } from 'react';

interface DocumentWithBody {
	body: {
		style: {
			backgroundImage: string;
			backgroundColor: string;
		};
	};
}

export const useBackground = (document?: DocumentWithBody) => {
	const [backgroundColor, setBackgroundColor] = useState<string | undefined>();
	const [backgroundImage, setBackgroundImage] = useState<string | undefined>();

	const unsetBackground = () => {
		setBackgroundColor(undefined);
		setBackgroundImage(undefined);
	};

	// On web platform ONLY, set the document background when it changes
	useEffect(() => {
		if (!document) {
			return;
		}

		if (backgroundImage) {
			document.body.style.backgroundImage = `url(${backgroundImage})`;
		} else if (backgroundColor) {
			document.body.style.backgroundImage = backgroundColor;
		} else {
			document.body.style.backgroundColor = '';
		}

		return () => {
			document.body.style.backgroundImage = '';
		};
	}, [backgroundColor, backgroundImage, document]);

	return {
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		setBackgroundImage,
		unsetBackground,
		hasBackground: backgroundImage !== undefined,
	};
};
