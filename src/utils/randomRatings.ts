export const getRandomRating = () => {
	const baseRating = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
	const isHalf = Math.random() < 0.5; // 50% chance for half rating
	return isHalf ? baseRating + 0.5 : baseRating;
};