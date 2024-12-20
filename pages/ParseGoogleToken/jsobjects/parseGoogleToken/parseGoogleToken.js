export default {
	continue () {
		// if(!appsmith.URL.fullPath.includes('#access_token=')) {
			// showAlert("path don`t have access_token","error")
			// navigateTo('Authentication')
			// return
		// }
		
		if(!appsmith.URL.fullPath.includes('#access_token=')) {
			showAlert("非正常管道進入此頁，無作用","error")
			return
		}

		let supabase_google_access_token = appsmith.URL.fullPath.split('#')[1]?.split('&')[0]?.split('=')[1]
		if(!!supabase_google_access_token){
			storeValue('access_token',supabase_google_access_token)
			navigateTo('Home')
		}else{
			showAlert("google 認證失敗，請聯絡系統管理員","error")
			navigateTo('Authentication')
		}

	}
}