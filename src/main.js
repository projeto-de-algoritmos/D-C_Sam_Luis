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
			
			$(".tierlist").append(`<div class="tier-card ${curId}"><span style="background-image: url(${url});"></span><p>${title}</p><span onClick="deleteCard(${curId})">x</span></div>`);
		}
		this.reset();
		curId += 1;
		
		e.preventDefault();
	});
});

function deleteCard(id) {
	$(`.${id}`).remove();
	
	tierListOne.splice(tierListOne.findIndex(element => element.id == id), 1);
	tierListTwo.splice(tierListTwo.findIndex(element => element.id == id), 1);
}

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