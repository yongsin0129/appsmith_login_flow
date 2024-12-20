export default {
	user_email:null,
	user_id:null,
	// 有權限查看的人員名單、logs、logs pivot、推薦人數表
	user_authorized_users:[],
	user_authorized_logs:[],
	user_authorized_logs_pivot:[],
	user_authorized_users_partners:[],
	
	/*
	*  使用 store 的 access token 跟 supabase 取得 email ，再到 googlesheet 認證名單 確認有經過永昕手動認證
	*/ 
	async check_access_token () {
		await API_get_supaUser.run({access_token:appsmith.store.access_token}).then(async (data)=>{	
			this.user_email = data.email

			//	使用 user_email 檢查 google sheet 認證名單，得到 userID
			const result = await GSDB.check_gs_email_and_get_userID(this.user_email)

			if(!!result.data) {
				this.user_id = result.data[0]["system_id_&_user_name"]
				showAlert("憑證有效，歡迎 " + this.user_id ,"success")

				// 有了 userID ， 才能更新 GSDB
				GSDB.updateDB()

			}	else{
				showAlert(this.user_email + " 尚未經過核淮，請聯絡系統管理員","error")
				navigateTo("Authentication")
				return
			}

		}).catch((error)=>{
			showAlert("登入憑證失效，請重新登入","error")
			// showAlert("Error Message : " + JSON.stringify(error),"error")
			navigateTo("Authentication")
			return
		})
	},

	logout () {
		clearStore()
		showAlert(this.user_email + " 登出成功 ","success")
		navigateTo("Authentication")
	},
}