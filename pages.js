/**
 * uniapp的钩子
 * uniapp 读取pages.json 之间的钩子，用于处理、拦截pages
 * 警告 : 该页面在编译前运行，所以报错的话看不到
 * @param {Object} pagesJson //pages.json
 * @param {Object} loader //钩子
 */

var tabBar = []

function handle (pageObj){
	for (let i = 0; i < pageObj.length; i++) {
		let name = pageObj[i].path.match(/(^|(?!\/))+[^\/]+$/)[0]
		//给所有无name属性的page加name
		if (!pageObj[i].name) {
			if (name) {
				pageObj[i].name = name
			}
		}
		//给所有导航栏加属性，跳转时作为标记
		for (let j = 0; j < tabBar.length; j++) {
			if (pageObj[i].path == tabBar[j]) {
				pageObj[i].isTab = true
			}
		}
	}
	return pageObj
}


module.exports = function(pagesJson, loader) {
	console.log('[router-middle] loading ...')
	//记录所有导航栏页面
	
	if (pagesJson.tabBar && pagesJson.tabBar.list) {
		for (let i = 0; i < pagesJson.tabBar.list.length; i++) {
			tabBar.push(pagesJson.tabBar.list[i].pagePath)
		}
	}

	
	handle(pagesJson.pages)
	//handle(pagesJson.subPackages[0].pages) //加载分包 通过json的操作，参数给分包的pages


	return pagesJson
};
