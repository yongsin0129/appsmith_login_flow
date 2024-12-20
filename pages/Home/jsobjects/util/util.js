export default {
	/*
	*  遞迴查詢函數
	*/ 
	getAllRelatedUserIDs (userID, data) {
		// Create a Set to store all related userIDs to avoid duplicates
		const relatedUserIDs = new Set();

		// Helper function to recursively find all related userIDs
		function findRelated(currentUserID) {
			// Add the current userID to the set
			relatedUserIDs.add(currentUserID);

			// Find all users who were introduced by the current userID
			const children = data.filter(item => item.介紹人 === currentUserID);

			// Recursively find related userIDs for each child
			children.forEach(child => {
				findRelated(child.學員ID);
			});
		}

		// Start the recursive search from the given userID
		findRelated(userID);

		// Convert the Set to an array and return it
		return Array.from(relatedUserIDs);
	}
}