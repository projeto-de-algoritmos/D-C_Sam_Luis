function deleteCard(id) {
	$(`.${id}`).remove();

	tierListOne.splice(tierListOne.findIndex(element => element.id == id), 1);
	tierListTwo.splice(tierListTwo.findIndex(element => element.id == id), 1);
}

function handleDragStart(e) {

	this.style.opacity = '0.4';

	dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
	this.style.opacity = '1';
	let items = document.querySelectorAll(`.c${curId}`);
	items.forEach(function (item) {
		item.classList.remove('over');
	});
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
	}

	return false;
}

function handleDragEnter(e) {
	this.classList.add('over');
}

function handleDragLeave(e) {
	this.classList.remove('over');
}

function handleDrop(e) {
	e.stopPropagation();
	this.style.opacity = '1';

	if (dragSrcEl !== this) {
		dragSrcEl.innerHTML = this.innerHTML;
		console.log(this);
		this.innerHTML = e.dataTransfer.getData('text/html');
	}

	return false;
}
var tierListOne = [];
var tierListTwo = [];
var curId = 0;

$(document).ready(() => {
	$("form").submit(function (e) {
		const title = e.target[0].value;
		const url = e.target[1].value;

		if (title.replace(/\s/g, '') != '') {
			tierListOne.push({ title: title, url: url, id: curId });
			tierListTwo.push({ title: title, url: url, id: curId });
			let cardComponent = `<div class="tier-card c${curId}" draggable="true"><span style="background-image: url(${url});"></span><p>${title}</p><span onClick="deleteCard(${curId})">x</span></div>`;
			$(".tierlist").append(cardComponent);

			let items = document.querySelectorAll(`.c${curId}`);
			items.forEach(function (item) {
				item.addEventListener('dragstart', handleDragStart, false);
				item.addEventListener('dragover', handleDragOver, false);
				item.addEventListener('dragenter', handleDragEnter, false);
				item.addEventListener('dragleave', handleDragLeave, false);
				item.addEventListener('drop', handleDrop, false);
				item.addEventListener('dragend', handleDragEnd, false);
			});
		}

		this.reset();
		curId += 1;

		e.preventDefault();
	});
});







/*
var tierListOne = [];
var tierListTwo = [];
var curId = 0;

$(document).ready(() => {
	$("form").submit(function(e) {
		const title = e.target[0].value;
		const url = e.target[1].value;

		if(title.replace(/\s/g, '') != '') {
			tierListOne.push({title: title, url:url, id: curId});
			tierListTwo.push({title: title, url:url, id: curId});

			$(".tierlist").append(`<div id="${curId}" class="tier-card"><span style="background-image: url(${url});"></span><p>${title}</p></div>`);
		}
		curId += 1;
		this.reset();

		e.preventDefault();
	});
});

function deleteCard(id) {
	$(`#${id}`).remove();

	tierListOne.splice(tierListOne.findIndex(element => return element.id == id}), 1);
	tierListTwo.splice(tierListTwo.findIndex(element => return element.id == id}), 1);
}*/

/*
$(document).ready(() => {
	$("form").submit(function(e) {
		const title = e.target[0].value;
		const url = e.target[1].value;

		if(title.replace(/\s/g, '') != '') {
			tierListOne.push({title: title, url:url, id: tierListOne.length});
			tierListTwo.push({title: title, url:url, id: tierListTwo.length});

			$(".tierlist").append(`<div class="tier-card"><span style="background-image: url(${url});"></span><p>${title}</p></div>`);
		}
		this.reset();

		e.preventDefault();
	});
});*/