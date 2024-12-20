export default {
	async updateDB () {
		try{
			showAlert("更新資料庫，速度視網路環境而定，請稍等..." ,"info")
			// 更新傘下名單
			const user_relative_partners = await this.check_gs_user_authorized_users (auth.user_id) 
			auth.user_authorized_users = user_relative_partners

			// 更新傘下名單的 logs
			const partners_logs = await this.get_gs_user_authorized_logs (user_relative_partners)
			auth.user_authorized_logs = partners_logs

			// 更新傘下名單的 logs_pivot
			const authorized_logs_pivot = await this.get_gs_user_authorized_logs_pivot(user_relative_partners)
			auth.user_authorized_logs_pivot = authorized_logs_pivot

			// 更新傘下名單的 users_partners
			const authorized_users_partners = await this.get_gs_user_authorized_users_partners(user_relative_partners)
			auth.user_authorized_users_partners = authorized_users_partners

			showAlert("更新程序執行完畢" ,"info")
		}catch(error){
			showAlert("資料庫更新失敗，請聯絡系統管理員" ,"error")
		}

	},

	/*
	*  給 user_email 查 userID
	*/ 
	async check_gs_email_and_get_userID (user_email) {
		let result = {}

		await API_check_googlesheet_user.run({user_email}).then((data)=>{			
			if(Array.isArray(data) && data.length === 0){
				result.fail = true
			}else{
				result.data = data
			}
		}).catch((error)=>{
			showAlert("系統未知錯誤 : HOME error101，請聯絡系統管理員","error")
			result.fail = true
		})

		return result
	},

	/*
	*  給 userID 查 gs table 得到傘下名單
	*/ 
	async check_gs_user_authorized_users (userID) {

		// 測試用 userID
		// userID = "4757_OOO"

		try{
			// Start the recursive search from the given userID
			const data = await API_get_all_partners_list.run()

			const relatedUserIDs = util.getAllRelatedUserIDs (userID, data)

			// Convert the Set to an array and return it
			return relatedUserIDs	

		}catch(error){
			showAlert("系統未知錯誤 : HOME error102，請聯絡系統管理員","error")	
		}

	},

	/*
	*  給 userlist , 查到這些人的 logs
	*/ 
	async get_gs_user_authorized_logs (userlist) {
		try{
			const result = await API_get_authorized_log.run({userlist})

			return result
		}catch(error){
			showAlert("獲取 userlist logs 失敗，請聯絡系統管理員","error")
		}
	},

	/*
	*  給 userlist , 查到這些人的 logs pivot
	*/ 
	async get_gs_user_authorized_logs_pivot (userlist) {		
		try{
			const result = await API_get_authorized_logs_pivot.run({userlist})

			return result
		}catch(error){
			showAlert("獲取 userlist logs pivot 失敗，請聯絡系統管理員","error")
		}
	},

	/*
	*  給 userlist , 查到這些人的 partners
	*/ 
	async get_gs_user_authorized_users_partners (userlist) {
		try{
			const result = await API_get_authorized_users_ptner.run({userlist})

			return result
		}catch(error){
			showAlert("獲取 userlist partners 失敗，請聯絡系統管理員","error")
		}
	}
}