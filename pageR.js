/**
 * pageR
 * 读取并解析Pages
 * 在pages.js后运行
 * 使用了 https://ext.dcloud.net.cn/plugin?id=1220 
 */
const path = require('path')
const CONFIG = {
	includes: ['path', 'asp', 'name']
}
const rootPath = path.resolve(process.cwd(), 'node_modules');

/** 解析绝对路径
 * @param {Object} dir 
 */
function resolvePath(dir) {
	return path.resolve(rootPath, dir);
}

class TransformPages {
	constructor(config) {
		config = {
			...CONFIG,
			...config
		};
		console.log('[routerR] loading...')
		this.CONFIG = config;
		this.webpack = require(resolvePath('webpack'));
		this.uniPagesJSON = require(resolvePath('@dcloudio/uni-cli-shared/lib/pages.js'));
		this.routes = this.getPagesRoutes().concat(this.getNotMpRoutes());
	}
	/**
	 * 获取所有pages.json下的内容 返回json
	 */
	get pagesJson() {
		return this.uniPagesJSON.getPagesJson();
	}
	/**
	 * 通过读取pages.json文件 生成直接可用的routes
	 */
	// getPagesRoutes(pages = this.pagesJson.pages, rootPath = null) {
	// 	const routes = [];
	// 	for (let i = 0; i < pages.length; i++) {
	// 		const item = pages[i];
	// 		const route = {};
	// 		for (let j = 0; j < this.CONFIG.includes.length; j++) {
	// 			const key = this.CONFIG.includes[j];
	// 			let value = item[key];
	// 			if (key === 'path') {
	// 				value = rootPath ? `/${rootPath}/${value}` : `/${value}`
	// 			}
	// 			if (key === 'asp' && i == 0 && rootPath == null) {
	// 				route[key] = route[key] || '/'
	// 			} else if (value !== undefined) {
	// 				route[key] = value;
	// 			}
	// 		}
	// 		routes.push(route);
	// 	}
	// 	return routes;
	// }

	getPagesRoutes(pages = this.pagesJson.pages, rootPath = null) {
		const routes = [];
		for (let i = 0; i < pages.length; i++) {
			const item = pages[i];
			const route = {};
			// for (let j = 0; j < this.CONFIG.includes.length; j++) {
			// 	const key = this.CONFIG.includes[j];
			// 	let value = item[key];
			// 	if (key === 'path') {
			// 		value = rootPath ? `/${rootPath}/${value}` : `/${value}`
			// 	}
			// 	if (key === 'asp' && i == 0 && rootPath == null) {
			// 		route[key] = route[key] || '/'
			// 	} else if (value !== undefined) {
			// 		route[key] = value;
			// 	}
			// }
			if(i == 0 && rootPath == null) {
				route.asp = item.asp || '/'
			}
			for (let key in item) {
				let value = item[key]
				if (typeof(value) != 'object') {
					if (key == 'path') {
						route.path = rootPath ? `/${rootPath}/${value}` : `/${value}`
					} else {
						route[key] = value
					}
				}
			}
			routes.push(route);
		}
		return routes;
	}

	/**
	 * 解析小程序分包路径
	 */
	getNotMpRoutes() {
		const {
			subPackages
		} = this.pagesJson;
		let routes = [];
		if (subPackages == null || subPackages.length == 0) {
			return [];
		}
		for (let i = 0; i < subPackages.length; i++) {
			const subPages = subPackages[i].pages;
			const root = subPackages[i].root;
			const subRoutes = this.getPagesRoutes(subPages, root);
			routes = routes.concat(subRoutes)
		}
		return routes
	}
	/**
	 * 单条page对象解析
	 * @param {Object} pageCallback 
	 * @param {Object} subPageCallback
	 */
	parsePages(pageCallback, subPageCallback) {
		this.uniPagesJSON.parsePages(this.pagesJson, pageCallback, subPageCallback)
	}
}
module.exports = TransformPages
