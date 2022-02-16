
module.exports = (url,data={}, isRedirect=false)=> {
	console.log(url)
	let param = ''
	for(let key in data){
		if(!param){
			param+='?'
		}else{
			param+='&'
		}
		param+= (key+'='+data[key]);
		console.log(param)
	}
	ROUTES.forEach((value) => {
		if (url == value.asp || url == value.name  || url == value.path || '/pages/' + url == value.path || url == value.title) {
			console.log(value.path)
			if (value.isTab) {
				uni.switchTab({
					url: value.path+param
				})
			} else {
				if (isRedirect) {
					uni.redirectTo({
						url: value.path+param
					})
				} else {
					uni.navigateTo({
						url: value.path+param
					})
				}
			}

		}
	})
}

