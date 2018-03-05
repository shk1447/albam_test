'use strict';

var wrapper = function(_div, _data) {
	var {container, workList} = {
		container:undefined,
		workList:[]
	};

	var workInput, uncompletedWrap, completedWrap;

	function add(e) {
		console.log('add');
		let item = {
			checked : false,
			content : workInput.value
		}
		workList.push(item);
		render();
	}

	function remove() {
		console.log('remove')
		workList.splice(this.parentElement.data.workItem.key, 1);
		render();
	}

	function check() {
		console.log('checked');
		workList[this.parentElement.data.workItem.key].checked = true;
		render();
	}

	function uncheck() {
		console.log('unchecked');
		workList[this.parentElement.data.workItem.key].checked = false;
		render();
	}

	function render() {
		uncompletedWrap.innerHTML = "";
		completedWrap.innerHTML = "";
		if(workList.length > 0) {
			for(let i = 0; i < workList.length; i++) {
				let workItem = workList[i];
				workList[i].key = i;
				let listItem =document.createElement('li');
				listItem.data = {
					workItem
				};
				let workCheck = document.createElement('input');
				workCheck.setAttribute('type','checkbox');
				let workLabel = document.createElement('label');
				workLabel.textContent = workItem.content;
				let workRemove = document.createElement('button');
				workRemove.setAttribute('class', 'remove');
				workRemove.textContent = '-';
				listItem.appendChild(workCheck); listItem.appendChild(workLabel); listItem.appendChild(workRemove);
				
				if(workItem.checked) {
					workCheck.setAttribute('checked', 'checked');
					completedWrap.appendChild(listItem);
					workCheck.onchange = uncheck;
				} else {
					uncompletedWrap.appendChild(listItem);
					workCheck.onchange = check;
				}
				workRemove.onclick = remove;
			}
		}
	}

	class workManager {
		constructor(_container, _list) {
			container = _container;
			workList = _list

			let header = document.createElement("h2");
			header.textContent = "할 일 관리"
			container.appendChild(header);

			let main = document.createElement("div");
			main.setAttribute("class", "main");

			workInput = document.createElement("input");
			workInput.setAttribute("id", "work_txt")
			workInput.setAttribute("type", "text")
			workInput.setAttribute("placeholder", "할일 입력");

			let workBtn = document.createElement("button");
			workBtn.textContent = "할일 추가";
			workBtn.onclick = add;

			main.appendChild(workInput);
			main.appendChild(workBtn);

			container.appendChild(main);

			let contents = document.createElement("div");
			contents.setAttribute("class", "contents");

			uncompletedWrap = document.createElement("div");
			uncompletedWrap.setAttribute("class", "worklist");

			completedWrap = document.createElement("div");
			completedWrap.setAttribute("class", "worklist");

			var uncompletedHeader = document.createElement('h3');
			uncompletedHeader.textContent = "미완료";
			contents.appendChild(uncompletedHeader);
			contents.appendChild(uncompletedWrap);

			var completedHeader = document.createElement('h3');
			completedHeader.textContent = "완료";
			contents.appendChild(completedHeader);
			contents.appendChild(completedWrap);

			container.appendChild(contents);

			render();
		}
		reset() {
			workList = [];
			render();
		}
	}
	return new workManager(_div, _data);
};