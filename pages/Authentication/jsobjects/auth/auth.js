export default {
	signIn (email,password) {
		this.disable_all_btn()

		API_singIn.run({email,password}).then((data)=>{
			showAlert("登入成功","success")
			storeValue("access_token",data.access_token)
			navigateTo("Home")
		}).catch((error)=>{
			showAlert("登入失敗，請確認 Email , Password 正確","error")
			this.enable_all_btn()
			//showAlert("Error Message : " + JSON.stringify(error),"error")
		})
	},

	signInUseGoogle () {
		this.disable_all_btn()

		navigateTo("https://xhamzhlgfrbjrrgesxaa.supabase.co/auth/v1/authorize",{
			provider: "google",
			redirect_to: "https://app.appsmith.com/app/login-flow/parsegoogletoken-675fb2098d54f328fbb9fa41/edit/widgets/kruql6n90x"
		})		
	},
	
	disable_all_btn(){
		btn_signIn.setDisabled(true)
		btn_google_oauth.setDisabled(true)
	},
	
	enable_all_btn(){
		btn_signIn.setDisabled(false)
		btn_google_oauth.setDisabled(false)
	}
}