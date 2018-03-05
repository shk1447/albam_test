window.onload = function(){
	let workList = [{
		checked: true,
		content:'Do not anything.'
	}];
	let container = document.getElementById('container')
	let wm = wrapper(container, workList);
	wm.reset();
};