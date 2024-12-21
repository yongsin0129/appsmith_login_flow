export default {
	init () {
		// Check if the user is accessing the page on a mobile device
		const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		if (isMobile) {
			// User is accessing the page on a mobile device
			showAlert("Mobile device detected","info");
		} else {
			// User is accessing the page on a desktop device
			showAlert("Desktop device detected","info");
		}
	}
}