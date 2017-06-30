// Manipulates classList
exports.add = (el, str) => {
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index === -1){
		let cn = el.className
		if(cn) cn = `${cn} `
		el.className = `${cn}${str}`
	}
}
exports.remove = (el, str) => {
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index > -1){
		classes.splice(index, 1)
		el.className = classes.join(' ')
	}
}
exports.toggle = (el, str) => {
	let classes = el.className.split(' ')
	const index = classes.indexOf(str)
	if(index > -1){
		classes.splice(index, 1)
		el.className = classes.join(' ')
		return false
	}
	else{
		el.className = `${el.className} ${str}`
		return true
	}
}

exports.removePrefix = (el, str) => {
	let classes = el.className.split(' ')
	for(let i = classes.length; i--;){
		if(classes[i].indexOf(str) === 0){
			classes.splice(i, 1)
		}
	}
	el.className = classes.join(' ')
}
