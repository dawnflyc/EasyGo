/**
 * uniapp的钩子
 * uniapp 读取pages.json 之间的钩子，用于处理、拦截pages
 * 警告 : 该页面在编译前运行，所以报错的话看不到
 * @param {Object} pagesJson //pages.json
 * @param {Object} loader //钩子
 */
module.exports = function(pagesJson, loader) {
	console.log('[router-middle] loading ...')
	//记录所有导航栏页面
	var tabBar = []
	if (pagesJson.tabBar && pagesJson.tabBar.list) {
		for (let i = 0; i < pagesJson.tabBar.list.length; i++) {
			tabBar.push(pagesJson.tabBar.list[i].pagePath)
		}
	}

	for (let i = 0; i < pagesJson.pages.length; i++) {
		let name = pagesJson.pages[i].path.match(/(^|(?!\/))\w+$/)[0]
		//给所有无name属性的page加name
		if (!pagesJson.pages[i].name) {
			if (name) {
				pagesJson.pages[i].name = name
			}
		}
		//给所有导航栏加属性，跳转时作为标记
		for (let j = 0; j < tabBar.length; j++) {
			if (pagesJson.pages[i].path == tabBar[j]) {
				pagesJson.pages[i].isTab = true
			}
		}
		//没有标题的，以name为标题,有的则把标题加入属性
		if (!pagesJson.pages[i].style.navigationBarTitleText) {
			pagesJson.pages[i].style.navigationBarTitleText = name
		}else{
			pagesJson.pages[i].title = pagesJson.pages[i].style.navigationBarTitleText
		}
	}
	return {
		pages: pagesJson.pages,
		globalStyle: pagesJson.globalStyle,
		tabBar: pagesJson.tabBar
	};
};
