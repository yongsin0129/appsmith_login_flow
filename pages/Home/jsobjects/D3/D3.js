export default {
	
	// 抓取資料並整理好傳入 iframe_d3
	pass_data_to_iframe () {
		const selectredUserID = Table_partners.selectedRow.學員ID
		const data = this.get_users_partners (selectredUserID)
		postWindowMessage(data, 'Iframe_d3', "*"); 
	},


	// 指定 userID ， 整理使用者的組織圖
	// 這邊的功能跟 util.getAllRelatedUserIDs (userID, data)類似，但懶的改了 XD
	get_users_partners (userID) {
		// 測試用 userID
		// userID = "4757_OOO"

		const data = auth.user_authorized_users_partners
		const userself = data.filter(item => item['學員ID'] === userID)[0]

		// 遞迴查詢傘下所有夥伴
		const users_partners = []
		const dfs = (currentName) => {
			const children = data.filter(item => item['介紹人'] === currentName)
			children.forEach(child => {
				users_partners.push(child)
				dfs(child['學員ID'])
			})
		}
		dfs(userID)

		// 將 self 這個學員本身添加到 users_partners 陣列的開頭
		users_partners.unshift(userself)

		// 指定 d3 org 使用的 column name 	headers = ['id','parentId'];
		const d3_users_partners = users_partners.map((user)=>{
			return {
				"id":user.學員ID,
				"parentId":user.介紹人
			}
		})

		// 清空第一筆資料的 parentId ，防止 D3 找不到最上面一位人員造成錯誤
		if (d3_users_partners.length > 0) {
			d3_users_partners[0].parentId = null;
		}

		return d3_users_partners
	}
}