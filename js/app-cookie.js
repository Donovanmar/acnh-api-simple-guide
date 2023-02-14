if (getCookie("animal")) {
    let object = JSON.parse(getCookie("animal"));
    console.log(object);
    setDataPage(object);
    switch (document.title) {
      case "ACNH - Fish":
        changeBackground("fish");
        break;
      case "ACNH - Bug":
        changeBackground("bugs");
        break;
      case "ACNH - Sea creature":
        changeBackground("sea-creatures");
        break;
      default:
        break;
    }

} else {
    window.location.href = "../index.html";
}

function setDataPage(data) {
    
    let contentContainer = document.getElementsByClassName("animal-content")[0];
    let auxTitle = createElementWithTextNode("h2", fixObjectLowercaseName(data.name["name-USen"]));
    let auxIcon = createElementWithTextNode("img", null, {src: data["icon_uri"], width: "50px"});
    let auxContainerTitle = createElementWithTextNode("div", auxTitle, {class: "animal-title"});
    auxContainerTitle.appendChild(auxIcon);
    let auxCatchPrase = createElementWithTextNode("h5", data["catch-phrase"]);
    let auxCatchPraseContainer = createElementWithTextNode("div", auxCatchPrase);
    let auxImg = createElementWithTextNode("img", null, {src: data.image_uri, class: "animal-img"});
    let auxImgContainer = createElementWithTextNode("div", auxImg, {class: "animal-data"});
    let auxImgDataContainer = createElementWithTextNode("div", null, {class: "animal-text-data"});
    let auxShadowContainer;

    if (data.shadow) {
      
      let auxShadow = createElementWithTextNode("h5", `Size: ${data.shadow}`);
      let auxShadowImg = createElementWithTextNode("img", null, {src: "../img/shadow.png", class: "animal-data-img"});
      auxShadowContainer = createElementWithTextNode("div", auxShadowImg, {class: "animal-line"});
      auxShadowContainer.appendChild(auxShadow);
    }

    let auxPrice = createElementWithTextNode("h5", `Price: ${data.price} bells.`);
    let auxPriceImg = createElementWithTextNode("img", null, {src: "../img/price.png", class: "animal-data-img"});
    let auxPriceContainer = createElementWithTextNode("div", auxPriceImg, {class: "animal-line"});
    auxPriceContainer.appendChild(auxPrice);
    let auxPriceBoost;
    let auxPriceBoostImg;

    if (data["price-flick"]) {
      
      auxPriceBoost = createElementWithTextNode("h5", `Price Flick: ${data["price-flick"]} bells.`);
      auxPriceBoostImg = createElementWithTextNode("img", null, {src: "../img/net.png", class: "animal-data-img"});

    } else if (data["price-cj"]) {
      
      auxPriceBoost = createElementWithTextNode("h5", `Price CJ: ${data["price-cj"]} bells.`);
      auxPriceBoostImg = createElementWithTextNode("img", null, {src: "../img/fishing-rod.png", class: "animal-data-img"});
    }

    let auxLegendPrices = createElementWithTextNode("legend", "Prices");
    let auxLegendOther = createElementWithTextNode("legend", "Other");
    let auxPricesFieldset = createElementWithTextNode("fieldset", auxLegendPrices);
    let auxTimeContainer;
    let auxLocationContainer;
    let auxAvailabilityFieldset;

    if (data.availability.time.length != 0) {

      let auxLegendAvailability = createElementWithTextNode("legend", "Availability");
      auxAvailabilityFieldset = createElementWithTextNode("fieldset", auxLegendAvailability);

      let auxTime = createElementWithTextNode("h5", `Time: ${data.availability["time"]}.`);
      let auxTimeImg = createElementWithTextNode("img", null, {src: "../img/time.png", class: "animal-data-img"});
      auxTimeContainer = createElementWithTextNode("div", auxTimeImg, {class: "animal-line"});
      auxTimeContainer.appendChild(auxTime);
    }

    if (data.availability.location) {
      
      if (!auxAvailabilityFieldset) {
        let auxLegendAvailability = createElementWithTextNode("legend", "Availability");
        auxAvailabilityFieldset = createElementWithTextNode("fieldset", auxLegendAvailability);
      }

      let auxLocation = createElementWithTextNode("h5", `Location: ${data.availability.location}.`);
      let auxLocationImg = createElementWithTextNode("img", null, {src: "../img/location.png", class: "animal-data-img"});
      auxLocationContainer = createElementWithTextNode("div", auxLocationImg, {class: "animal-line"});
      auxLocationContainer.appendChild(auxLocation);
    }

    let auxOtherFieldset = createElementWithTextNode("fieldset", auxLegendOther);

    let auxPriceImg2 = createElementWithTextNode("img", null, {src: "../img/price.png", class: "animal-data-img"});
    let auxPriceBoostContainer = createElementWithTextNode("div", null, {class: "animal-line"});

    auxLegendSpeed = createElementWithTextNode("legend", "Speed");
    let auxSpeedFieldset = createElementWithTextNode("fieldset", auxLegendSpeed);
    let auxRarityContainer;

    if (data.availability.rarity) {
      
      let auxRarity = createElementWithTextNode("h5", `Rarity: ${data.availability["rarity"].replace("-", " ")}.`);
      let auxRarityImg = createElementWithTextNode("img", null, {src: "../img/rarity.png", class: "animal-data-img"});
      auxRarityContainer = createElementWithTextNode("div", auxRarityImg, {class: "animal-line"});
      auxRarityContainer.appendChild(auxRarity);
    }

    let auxSpeedContainer;

    if (data.speed) {
      
      let auxSpeed = createElementWithTextNode("h5", `State: ${data.speed}.`);
      let auxSpeedImg = createElementWithTextNode("img", null, {src: "../img/speed.png",class: "animal-data-img"});
      auxSpeedContainer = createElementWithTextNode("div", auxSpeedImg, {class: "animal-line"});
      auxSpeedContainer.appendChild(auxSpeed);
    }

    let auxContainer = createElementWithTextNode("div", null, {class: "animal-container"});
    auxContainer.appendChild(auxContainerTitle);
    auxContainer.appendChild(auxCatchPraseContainer);
    auxContainer.appendChild(auxImgContainer);
    auxPricesFieldset.appendChild(auxPriceContainer);
    auxPricesFieldset.appendChild(auxPriceBoostContainer);

    if (data["price-flick"] || data["price-cj"]) {

      auxPriceBoostContainer.appendChild(auxPriceImg2);
      auxPriceBoostContainer.appendChild(auxPriceBoostImg);
      auxPriceBoostContainer.appendChild(auxPriceBoost);
    } 

    if (auxAvailabilityFieldset) { 
      if (auxTimeContainer) auxAvailabilityFieldset.appendChild(auxTimeContainer);
      if (auxLocationContainer) auxAvailabilityFieldset.appendChild(auxLocationContainer);
      auxImgDataContainer.appendChild(auxAvailabilityFieldset);
    }
    
    auxImgDataContainer.appendChild(auxPricesFieldset);

    if (auxSpeedContainer) {
      auxImgDataContainer.appendChild(auxSpeedFieldset);
      auxSpeedFieldset.appendChild(auxSpeedContainer);
    };

    auxImgContainer.appendChild(auxImgDataContainer);

    if (auxShadowContainer) {
      auxOtherFieldset.appendChild(auxShadowContainer);
      auxImgDataContainer.appendChild(auxOtherFieldset);
    }
    if (auxRarityContainer) auxOtherFieldset.appendChild(auxRarityContainer);

    contentContainer.appendChild(auxContainer);
}

function fixObjectLowercaseName(objectName) {
    
    let objectLowercaseName = objectName.split(" ");
    let objectFixedName = "";

    for (let wordCount = 0; wordCount < objectLowercaseName.length; wordCount++) {
        
        let word = objectLowercaseName[wordCount];

        objectLowercaseName[wordCount] = word.charAt(0).toUpperCase() + word.slice(1);
        objectFixedName += objectLowercaseName[wordCount] + " ";
    }

    return objectFixedName;
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function changeBackground(sectionName) {
    
  const BODY_REFERENCE = document.getElementsByTagName("body")[0];
  BODY_REFERENCE.style.backgroundImage = `url(../img/${sectionName}.jpg)`;
  BODY_REFERENCE.style.backgroundPosition = "0px 0px";
  BODY_REFERENCE.style.backgroundSize = "cover";
}

/**
 * Creates an element of the DOM (Document Object Model) with his pertinent text node.
 * @param {string} elementType 
 * @param {string | element} textNode 
 * @param {Object} elementAttributes 
 * @returns The element to be created in the DOM.
 */
function createElementWithTextNode(elementType, textNode = null, elementAttributes = null) {

  const BODY_REFERENCE = document.getElementsByTagName("body")[0];
  let element = document.createElement(elementType);
  let newTextNode;

  if (textNode && typeof (textNode) === "string") {

      newTextNode = document.createTextNode(textNode);
      element.appendChild(newTextNode);

  } else if (textNode) {

      element.appendChild(textNode);
  }

  if (elementAttributes) {

      for (const ATTRIBUTE_NAME in elementAttributes) {
          
          const ATTRIBUTE_VALUE = elementAttributes[ATTRIBUTE_NAME];
          element.setAttribute(ATTRIBUTE_NAME, ATTRIBUTE_VALUE);
      }
  }

  return element;
}