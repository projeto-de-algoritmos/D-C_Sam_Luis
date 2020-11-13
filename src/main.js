var tierListOne = [];
var tierListTwo = [];
var curId = 0;

$(document).ready(() => {
	$("form").submit(function (e) {
		const title = e.target[0].value;
		const url = e.target[1].value;

		if (title.replace(/\s/g, '') != '') {
			tierListOne.push(curId);
			tierListTwo.push(curId);
			let cardComponent = `<div class="tier-card ${curId}" draggable="true"><span style="background-image: url(${url});"></span><p>${title}</p><span onClick="deleteCard(${curId})">x</span></div>`;
			$(".tierlist").append(cardComponent);

			setupDragAndDrop(curId);
		}

		this.reset();
		curId += 1;

		e.preventDefault();
	});
});

function compare() {
	const listTwoValues = [];
	const numberOfElements = tierListOne.length;
	let listOneMap = {};

	tierListOne.forEach((element, index) => {
		listOneMap[element] = index;
	});

	tierListTwo.forEach((element, index) => {
		listTwoValues.push(listOneMap[element]);
	});

	const maxInversions = ((numberOfElements * (numberOfElements - 1)) / 2);
	const inversions = sortAndCount({array: listTwoValues, count: 0})
	const listDifference = (( 1 - (inversions / maxInversions)) * 100.0);

}