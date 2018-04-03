// 解析rul参数
// @example ?id=12345&a=b
// @return object {id:12345,a:b}
 export function urlParse() {
let url = window.location.search
let obj = {}
let reg = /[?&][^?&]+=[^?&]+/g
let arr = url.match(reg)
	if (arr) {
		arr.forEach((item) => {
			let tmpArr = item.substring(1).split('=')
			let key = decodeURIComponent(tmpArr[0])
			let val = decodeURIComponent(tmpArr[1])
			obj[key] = val
		})
	}
	return obj
}
