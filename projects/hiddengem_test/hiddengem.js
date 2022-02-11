function addText(div, data) {
  data['text'].split("\n").forEach((line) => {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = line;
    div.appendChild(newParagraph);
  });
}

function addCollapsibleBox(div, data) {
  const newTitleButton = document.createElement("button");
  newTitleButton.className = "collapsible";
  newTitleButton.textContent = data["text"];
  div.appendChild(newTitleButton);

  const newContainer = document.createElement("div");
  newContainer.className = 'content';
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
      console.log(key + " wasn't found in HTML!");
    }
  }
}