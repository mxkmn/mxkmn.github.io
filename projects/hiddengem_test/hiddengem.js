function addPicture(div, data) {
  const newFigure = document.createElement("figure"); // контейнер

  if (data['source'] != null && data['source'] != "") {
    const newImg = document.createElement("img");
    newImg.src = data['source'];
    newFigure.appendChild(newImg);
  }

  if (data['text'] != null && data['text'] != "") {
    newCaption = document.createElement("figcaption");
    addText(newCaption, data);
    newFigure.appendChild(newCaption);
  }

  div.appendChild(newFigure);
}

function getFirstLink(str, startFrom) {
  let success = false, startIndex, stopIndex, text, link;

  startIndex = str.indexOf('$[$', startFrom);
  if (startIndex != -1) {
    let middleIndex = str.indexOf('$|$', startIndex);
    if (middleIndex != -1) {
      stopIndex = str.indexOf('$]$', middleIndex);
      if (stopIndex != -1) {
        text = str.substring(startIndex+3, middleIndex).trim();

        link = str.substring(middleIndex+3, stopIndex).trim();
        if (!(link.includes('://') || link.includes('tel:'))) {
          link = 'https://' + link;
        }

        success = true;
      }
    }
  }

  return {'success': success, 'startIndex': startIndex, 'stopIndex': stopIndex+3, 'text': text, 'link': link};
}

function addText(div, data) {
  data['text'].split("\n").forEach((line) => {
    const newParagraph = document.createElement("p");

    let linkInfo, stopIndex = 0;
    do {
      linkInfo = getFirstLink(line, stopIndex);
      if (linkInfo['success']) {
        const usualText = document.createTextNode(line.substring(stopIndex, linkInfo['startIndex']));
        newParagraph.appendChild(usualText);

        const link = document.createElement("a");
        link.href = linkInfo['link'];
        link.innerText = linkInfo['text'];
        link.target = '_blank'; /* открытие в новой вкладке */
        newParagraph.appendChild(link);

        stopIndex = linkInfo['stopIndex'];
      }
      else {
        const usualText = document.createTextNode(line.substring(stopIndex));
        newParagraph.appendChild(usualText);
      }
    } while (linkInfo['success']);
    div.appendChild(newParagraph);
  });
}

function addCollapsibleBox(div, data) {
  const newTitleButton = document.createElement("button");
  newTitleButton.className = "collapsible-block-button";
  newTitleButton.textContent = data["text"];

  newTitleButton.addEventListener("click", function () {
    this.classList.toggle("active");
    this.nextElementSibling.classList.toggle("hidden")
  });

  div.appendChild(newTitleButton);

  const newContainer = document.createElement("div");
  newContainer.className = 'content hidden';
  data['content'].forEach((jsonElement) => { // перебираю элементы ячейки
    newContainer.appendChild(getElement(jsonElement));
  });
  div.appendChild(newContainer);
}

function getElement(data) {
  const newContainer = document.createElement("div");
  newContainer.className = data["type"];

  switch (data["type"]) {
    case "collapsible-box":
      addCollapsibleBox(newContainer, data);
    break;

    case "text":
      addText(newContainer, data);
    break;

    case "picture":
      addPicture(newContainer, data);
    break;

    default:
      console.log(data["type"] + " isn't analyzed as a HiddenGem element!");
    break;
  }
  return newContainer;
}

function hiddenGemSetup(data) {
  for (var divId in data) { // перебор ячеек (ключей входного JSON)
    const editableDiv = document.getElementById(divId);

    if (editableDiv) { // если элемент существует
      data[divId].forEach((jsonElement) => { // перебираем элементы ячейки
        editableDiv.appendChild(getElement(jsonElement));
      });
    } else {
      console.log(divId + " wasn't found in HTML!");
    }
  }
}