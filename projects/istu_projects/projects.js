pageData["lastVisibleElem"] = -1;

setLastPage("projects.html");

document.getElementById('filters').addEventListener('submit', submitFilters);


function submitFilters(event) {
	const conts = document.querySelectorAll(".cont");
	for (var i = 0; i < conts.length; i++) {
		conts[i].remove();
	}

	submitForm(event);
}

function useResponse(obj) {
	const main = document.querySelector('main');
	const pros = obj['projects'];
	for (let i = 0; i < pros.length; i++) {
		const newDiv = document.createElement('div');
		newDiv.className = "cont";
		
		const myH2 = document.createElement('h2');
		myH2.textContent = "Название: " + pros[i].title;
		newDiv.appendChild(myH2);
		
		const myH3 = document.createElement('h3');
		myH3.textContent = "Описание: " + pros[i].description;
		newDiv.appendChild(myH3);
		
		const myH5 = document.createElement('h5');
		myH5.textContent = "Научный руководитель: " + pros[i].professor;
		newDiv.appendChild(myH5);
		
		const myH6 = document.createElement('h6');
		myH6.textContent = "Количество участников: " + pros[i].count;
		newDiv.appendChild(myH6);
		
		const myH62 = document.createElement('h6');
		myH62.textContent = "Категория: " + pros[i].category;
		newDiv.appendChild(myH62);
		
		const myH63 = document.createElement('h6');
		myH63.textContent = "Создатель проекта: " + pros[i].creator;
		newDiv.appendChild(myH63);

		main.appendChild(newDiv);
	}
	lastVisibleElem = 1;
	getDataFromServer(); // проверка на случай, если не весь экран остался покрытым данными
}

submitString('{"sendingDataType":"needNewProjects", "lastVisibleElem":-1}');



window.addEventListener('scroll', getDataFromServer());

function getDataFromServer() {
	var height = document.documentElement.scrollHeight + document.documentElement.clientHeight;
	var scrollTop = window.pageYOffset || document.documentElement.scrollTop||document.body.scrollTop;

	if (height == scrollTop) submitString('{"sendingDataType":"needNewProjects", "lastVisibleElem":' + pageData["lastVisibleElem"] + '}');
}