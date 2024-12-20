export default {
	// 經過 filter 後的人員名單
	filtered_users:auth.user_authorized_users,
	filtered_logs_pivot:auth.user_authorized_logs_pivot,
	// 總表上點擊個人，顯示的 logs
	selected_user_logs:[],

	get_selected_user_logs (userID) {
		let logs = auth.user_authorized_logs.filter((log)=>{
			return log.學員名稱 === userID
		})

		logs.sort((a,b)=>{
			// 2 - 1 是大到小
			const date1 = new Date(Date.parse(a.課程時間.replace('年','-').replace('月','-').replace('日','')))
			const date2 = new Date(Date.parse(b.課程時間.replace('年','-').replace('月','-').replace('日','')))
			return date2 - date1
		})

		return logs
	},

	make_filter_option (columnName) {
		// 測試用
		// columnName = "課程類型"
		// 取出所有課程類型
		// 取出所有課程期數
		// 取出所有課程主題
		const all_type_arr = auth.user_authorized_logs.map((log)=>{
			return log[columnName]
		})

		// 使用 Set  選出唯一值，再展開
		const unique_type = [...new Set(all_type_arr)	]		

		// 格式化為　select list 的格式
		const result = []
		unique_type.forEach((type)=>{
			if(!!type) result.push({"name":type})
		})

		return result.length===0? [{"name":""}] : result
	},

	apply_filter () {
		const selected_type = filter_type.selectedOptionValue
		const selected_series = filter_series.selectedOptionValue
		const selected_topic = filter_topic.selectedOptionValue
		const selected_noType = filter_noType.selectedOptionValue
		const selected_noTopic = filter_noTopic.selectedOptionValue
		// 預篩選名單
		let target_users = auth.user_authorized_users

		if(!!selected_type){
			let verify_users = new Set()
			auth.user_authorized_logs.forEach((log)=>{
				if(log.課程類型 === selected_type) verify_users.add(log.學員名稱)
			})
			verify_users = [...verify_users]
			target_users = target_users.filter((user)=>verify_users.includes(user))
		}

		if(!!selected_series){
			let verify_users = new Set()
			auth.user_authorized_logs.forEach((log)=>{
				if(log.課程期數 === selected_series) verify_users.add(log.學員名稱)
			})
			verify_users = [...verify_users]
			target_users = target_users.filter((user)=>verify_users.includes(user))
		}

		if(!!selected_topic){
			let verify_users = new Set()
			auth.user_authorized_logs.forEach((log)=>{
				if(log.課程主題 === selected_topic) verify_users.add(log.學員名稱)
			})
			verify_users = [...verify_users]
			target_users = target_users.filter((user)=>verify_users.includes(user))
		}

		if(!!selected_noType){
			let verify_users = new Set()
			auth.user_authorized_logs.forEach((log)=>{
				if(log.課程類型 === selected_noType) verify_users.add(log.學員名稱)
			})			
			verify_users = [...verify_users]			
			// 將所有人員名單　去掉　有上過的名單，就是沒上過的名單
			verify_users = auth.user_authorized_users.filter((user)=> !(verify_users.includes(user)))
			
			target_users = target_users.filter((user)=>verify_users.includes(user))
		}

		if(!!selected_noTopic){
			let verify_users = new Set()
			auth.user_authorized_logs.forEach((log)=>{
				if(log.課程主題 !== selected_noTopic) verify_users.add(log.學員名稱)
			})
			verify_users = [...verify_users]
			target_users = target_users.filter((user)=>verify_users.includes(user))
		}

		filter.filtered_users = target_users

		this.filtered_logs_pivot = auth.user_authorized_logs_pivot.filter((user)=>{
			return filter.filtered_users.includes(user.學員名稱)
		})

		return this.filtered_logs_pivot
	},

	clean_filter(){
		filter_type.setSelectedOption("")
		filter_series.setSelectedOption("")
		filter_topic.setSelectedOption("")
		filter_noType.setSelectedOption("")
		filter_noTopic.setSelectedOption("")
		this.filtered_users = auth.user_authorized_users
		this.filtered_logs_pivot = auth.user_authorized_logs_pivot
	}
}