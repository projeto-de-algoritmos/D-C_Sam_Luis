var tierListOne = [];
var tierListTwo = [];
var curId = 0;
var spinAudio;

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
	
	let request = new XMLHttpRequest();
	request.open("GET", "assets/spin.mp3", true);
	request.responseType = "blob";    
	request.onload = function() {
		if(this.status == 200) {
			spinAudio = new Audio(URL.createObjectURL(this.response));
			spinAudio.load();
		}
	}
	
	request.send();
});

function deleteCard(id) {
	$(`.${id}`).remove();
	
	tierListOne.splice(tierListOne.findIndex(element => element.id == id), 1);
	tierListTwo.splice(tierListTwo.findIndex(element => element.id == id), 1);
}

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
	const inversions = sortAndCount({array: listTwoValues, count: 0});
	const listDifference = (( 1 - (inversions.count / maxInversions)) * 100.0);

	showResults(listDifference);
}

function sleep(ms) {
	return new Promise((resolve, reject) => setTimeout(() => resolve(), ms));
}

async function showResults(result) {
	const resultDisplay = $('.result');
	const spinNumber = 25;
	let numberOfUselessNumbers = spinNumber;
		
	while(numberOfUselessNumbers) {
		resultDisplay.text(`${(Math.random() * 100).toFixed(2)}%`);
		spinAudio.currentTime = 0;
		spinAudio.play();
		await sleep(50 + 100 * (1 - numberOfUselessNumbers/spinNumber));
		numberOfUselessNumbers -= 1;
	}
	
	spinAudio.currentTime = 0;
	spinAudio.play();
	resultDisplay.text(`${result.toFixed(2)}%`);
	resultDisplay.animate({
		fontSize: '500px'
	}, 0, () => {
		resultDisplay.animate({fontSize: '64px'}, 1000, 'easeInCubic', () => {
			resultDisplay.animate({fontSize: '84px'}, 500, 'easeOutCubic', () => {
				resultDisplay.animate({fontSize: '64px'}, 500, 'easeInCubic', () => {
					resultDisplay.animate({fontSize: '70px'}, 250, 'easeOutCubic', () => {
						resultDisplay.animate({fontSize: '64px'}, 250, 'easeInCubic');
					});
				});
			});
		});
	});
}