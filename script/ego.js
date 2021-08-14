/**
 * 用别名、name、path、nopagepath 跳
 * @param {String} url
 * @param {Boolen} isRedirect 是否重定向
 */
function rgo(url, isRedirect) {
	ROUTES.forEach((value) => {
		if (url == value.asp || url == value.name  || url == value.path || '/pages/' + url == value.path || value.title) {
			console.log(value.path)
			if (value.isTab) {
				uni.switchTab({
					url: value.path
				})
			} else {
				if (isRedirect) {
					uni.redirectTo({
						url: value.path
					})
				} else {
					uni.navigateTo({
						url: value.path
					})
				}
			}

		}
	})
}
/**
 * 用name找url跳转
 * @param {String} url
 * @param {Boolen} isRedirect 是否重定向
 */
function ngo(url, isRedirect) {
	ROUTES.forEach((value) => {
		if (value.name == url) {
			if (isRedirect) {
				uni.redirectTo({
					url: value.path
				})
			} else {
				uni.navigateTo({
					url: value.path
				})
			}
		}
	})
}

module.exports = {
	rgo: rgo,
	ngo: ngo
}
// if (typeof(url) == 'object') {
// 	let mode = url.mode
// 	let route = url.route // name=

// 	ROUTES.forEach((value) => {

// 	})

// }
