const API_URL_FISH = 'https://acnhapi.com/v1/fish/';
const API_URL_BUGS = 'https://acnhapi.com/v1/bugs/';
const API_URL_SEA_CREATURES = 'https://acnhapi.com/v1/sea/';
const BODY_REFERENCE = document.getElementsByTagName("body")[0];
const VIDEO_REFERENCE = document.getElementsByTagName("iframe")[0];
let type;

/*const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';*/

setEventsForButtons("btn");

setFishData();
setBugsData();
setSeaCreaturesData();

VIDEO_REFERENCE.style.display = "block";
hideDataSections();

function setFishData() {

    let fishResponse = getResponseByFetch(API_URL_FISH);

    fishResponse.then((data) => {

        setData(data, "fish", 9);
        setEventsForSelect("shadow", data, "fish");
        setEventsForCheckbox("fish-location", data, "fish");

        console.log(data);
    })
        .catch((error) => {
            console.error("Error: ", error)
        });
}

function setBugsData() {
    
    let bugsResponse = getResponseByFetch(API_URL_BUGS);

    bugsResponse.then((data) => {

        setData(data, "bugs", 9);
        setEventsForCheckbox("bugs-location", data, "bugs");

        console.log(data);
    })
        .catch((error) => {
            console.error("Error: ", error)
        });
}

function setSeaCreaturesData() {
    
    let seaCreaturesResponse = getResponseByFetch(API_URL_SEA_CREATURES);

    seaCreaturesResponse.then((data) => {
        
        setData(data, "sea-creatures", 4);
        console.log(data);
    })
        .catch((error) => {
            console.error("Error: ", error)
        });
}

/**
 * Creates a fetch promise by a passed url param, which promise's response errors number 404 and 400 are handled.
 * @param {String} url 
 * @returns Fetch promise whose response had been result, leading to a promise which next .then method call will get the data directly.
 */
async function getResponseByFetch(url) {

    let promise = await fetch(url)

        .then((response) => {

            console.log(response);

            if (response.status === 404) {

                throw new Error(handleError(404, "NOT FOUND"));

            } else if (response.status === 400) {
                
                throw new Error(handleError(400, "BAD REQUEST"));
            }

            return response.json();
        });

    return promise;
}

/**
 * Sets the data of the referenced table.
 * @param {Object} data 
 * @param {String} nameReference 
 */
function setData(data, nameReference, powNumber) {
    
    let auxCount = 0;
    let auxTableRowContainer;
    let auxTableColumnContainer;
    let auxAnchorElement;
    let auxImgElement;

    const DATA = data;

    let tableHeader = document.getElementById(`table-header-${nameReference}`);
    tableHeader.colSpan = powNumber + 1;

    let tableBody = document.getElementById(`table-body-${nameReference}`);
    auxTableRowContainer = createElementWithTextNode("tr");

    for (const DATA_KEY in DATA) {

        const OBJECT = DATA[DATA_KEY];

        auxImgElement = createElementWithTextNode("img", null, {src: OBJECT["icon_uri"], alt: OBJECT["file-name"], width: "75px", class: "img-icon"});
        auxAnchorElement = createElementWithTextNode("a", auxImgElement, {href: `index/${nameReference}.html`});
        
        auxAnchorElement.addEventListener("click", () => setCookie("animal", JSON.stringify(OBJECT), 365));
        auxTableColumnContainer = createElementWithTextNode("td", auxAnchorElement, {id: OBJECT["id"] + "-" + nameReference, class: "text-center"});
        addFavouriteStar("../img/favourite-unmarked.png", auxTableColumnContainer);
        auxTableRowContainer.appendChild(auxTableColumnContainer);
        
        if (auxCount === powNumber) {
           
            tableBody.appendChild(auxTableRowContainer);
            auxTableRowContainer = createElementWithTextNode("tr");
            auxCount = 0;

        } else {

            auxCount++;
        }
    }
}

/**
 * Set event listeners for the referenced element. The events set the data filtered, changing the disposed data table style.
 * @param {*} elementReference 
 * @param {*} data 
 * @param {*} nameReference 
 */
function setEventsForSelect(elementReference, data, nameReference) {
    
    let selectElement = document.getElementById(elementReference);
    selectElement.addEventListener('click', () => setDataFiltered(data, nameReference, 9, selectElement.value));
}

/**
 * Set event listeners for the different button sections, which displays the appropriate data.
 * @param {String} elementReference
 */
function setEventsForButtons(elementReference) {
    
    let buttons = document.getElementsByClassName(elementReference);

    for (let buttonCount = 0; buttonCount < buttons.length; buttonCount++) {

        const BUTTON = buttons[buttonCount];
        BUTTON.addEventListener("click", showSelectedDataSection);
    }
}

function setEventsForCheckbox(elementReferenceId, data, nameReference) {

    let checkboxElement = document.getElementById(elementReferenceId);
    checkboxElement.addEventListener("click", () => setDataFiltered(data, nameReference, 9, checkboxElement));
}

function showSelectedDataSection() {
    
    let dataSections = document.querySelectorAll(".data");
    
    for (let sectionsCount = 0; sectionsCount < dataSections.length; sectionsCount++) {

        const DATA_SECTION = dataSections[sectionsCount];
        DATA_SECTION.style.display = "none";

        if (sectionsCount == 0) {
            
            document.getElementsByTagName("iframe")[0].style.display = "none";
        }
        console.log(DATA_SECTION.children);
        // if (sectionsCount == 4) {
            
        //     DATA_SECTION.style.d
        //     //Object.values(DATA_SECTION.children).map((information) => {information.style.display = "none"});
        // }

        if (DATA_SECTION.id === this.value) {
        
            changeBackground(DATA_SECTION.id);
            DATA_SECTION.style.display = "flex";
        }
    }
}

function hideDataSections() {
    
    let dataSections = document.querySelectorAll(".data");
    Object.values(dataSections).map((dataSection) => {dataSection.style.display = "none"});
}

function changeBackground(sectionName) {
    
    BODY_REFERENCE.style.backgroundImage = `url(../img/${sectionName}.jpg)`;
    BODY_REFERENCE.style.backgroundPosition = "0px 0px";
    BODY_REFERENCE.style.backgroundSize = "cover";
}

function addBetterLocationMeaning(imgUrl, tableDataElement) {
    auxImgElement = createElementWithTextNode("img", null, {src: imgUrl});
    auxImgElement.classList.add("sticker-location"); 
    tableDataElement.appendChild(auxImgElement);
}

function addFavouriteStar(imgUrl, tableDataElement) {
    auxImgElement = createElementWithTextNode("img", null, {src: imgUrl});
    auxImgElement.classList.add("favourite-star"); 
    tableDataElement.appendChild(auxImgElement);
}

/* Cookie management */

/**
 * Set a document cookie.
 * @param {String} cname 
 * @param {String} cvalue 
 * @param {number} exdays 
 */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;";
}

/**
 * Adjust the styling of certain items filtered by 
 * @param {*} data 
 * @param {*} nameReference 
 * @param {*} powNumber 
 * @param {*} type 
 */
function setDataFiltered(data, nameReference, powNumber, eventHandler = null) {
    
    let auxCount = 0;
    let auxTableRowContainer;
    let auxTableColumnContainer;
    let auxTextNode;
    let auxImgElement;

    let tableHeader = document.getElementById(`table-header-${nameReference}`);
    let tableBody = document.getElementById(`table-body-${nameReference}`);

    const DATA = Object.values(data);
    DATA.map(OBJECT => document.getElementById(`${OBJECT.id}-${nameReference}`).classList.remove("selected-shadow"));

    let dataFiltered;
    let dataLocation;

    if (eventHandler.type === "checkbox") {

        switch (eventHandler.id) {
            case "fish-location":

                let fishBackgrounds = ["sea", "river", "river-mouth", "pond", "pier", "river-clifftop"];

                if (eventHandler.checked) {
            
                    let tableDataElement;
        
                    dataLocation = DATA.map(OBJECT => {
        
                        tableDataElement = document.getElementById(`${OBJECT.id}-${nameReference}`);
        
                        switch (OBJECT.availability.location) {
                            case "Sea":
                                tableDataElement.classList.add("sea-background");
                                break;
                            case "River":
                                tableDataElement.classList.add("river-background");
                                break;
                            case "River (Mouth)":
                                tableDataElement.classList.add("river-mouth-background");
                                break;
                            case "River (Clifftop)":
                                tableDataElement.classList.add("river-clifftop-background");
                                break;    
                            case "Pond":
                                tableDataElement.classList.add("pond-background");
                                break;
                            case "Pier":
                                tableDataElement.classList.add("sea-background");
                                addBetterLocationMeaning("../img/pier.png", tableDataElement);
                                break;
                            case "Sea (when raining or snowing)":
                                tableDataElement.classList.add("sea-background");
                                addBetterLocationMeaning("../img/rain.png", tableDataElement);
                                break;
                            case "River (Clifftop) & Pond":
                                tableDataElement.classList.add("river-clifftop-background");
                                break;
                            default:
                                break;
                        }
                    });

                } else {

                    fishBackgrounds.forEach(backgroundName => {
        
                        DATA.map(OBJECT => document.getElementById(`${OBJECT.id}-${nameReference}`).classList.remove(`${backgroundName}-background`));
                    });
                } 

                break;
            case "bugs-location":
                
                let bugsBackgrounds = ["ponds-and-rivers", "beach", "ground", "rotten-food", "rocks", "flowers", "villagers", "tree-stumps", "tree-shaking", "palm-trees", "trees", "flying"];

                if (eventHandler.checked) {

                    let tableDataElement;
        
                    dataLocation = DATA.map(OBJECT => {
        
                        tableDataElement = document.getElementById(`${OBJECT.id}-${nameReference}`);
        
                        switch (OBJECT.availability.location) {
                            case "On palm trees":
                                tableDataElement.classList.add("palm-trees-background");
                                break;
                            case "Flying (near water)":
                                tableDataElement.classList.add("flying-background");
                                break;
                            case "Flying near hybrid flowers":
                                tableDataElement.classList.add("flying-background");
                                addBetterLocationMeaning("../img/flower.png", tableDataElement);
                                break;
                            case "Flying by light":
                                tableDataElement.classList.add("flying-background");
                                addBetterLocationMeaning("../img/light.png", tableDataElement);
                                break;
                            case "Flying":
                                tableDataElement.classList.add("flying-background");
                                break;
                            case "On tree stumps":
                                tableDataElement.classList.add("tree-stumps-background");
                                break;
                            case "On ponds and rivers":
                                tableDataElement.classList.add("ponds-and-rivers-background");
                                break;  
                            case "On the beach":
                                tableDataElement.classList.add("beach-background");  
                                break;
                            case "On beach rocks":
                                tableDataElement.classList.add("beach-background");
                                addBetterLocationMeaning("../img/rock.png", tableDataElement);
                                break;
                            case "Hitting rocks":
                                tableDataElement.classList.add("rocks-background"); 
                                break;
                            case "On rocks and bush (when raining)":
                                tableDataElement.classList.add("rocks-background"); 
                                addBetterLocationMeaning("../img/bush.png", tableDataElement);
                                break;
                            case "Underground":
                                tableDataElement.classList.add("ground-background");
                                addBetterLocationMeaning("../img/underground.png", tableDataElement);
                                break;
                            case "On the ground":
                                tableDataElement.classList.add("ground-background");
                                break;
                            case "On rotten food":
                                tableDataElement.classList.add("rotten-food-background");
                                addBetterLocationMeaning("../img/rotten-food.png", tableDataElement);
                                break;
                            case "On flowers":
                                tableDataElement.classList.add("flowers-background");
                                break;
                            case "On white flowers":
                                tableDataElement.classList.add("flowers-background");
                                addBetterLocationMeaning("../img/white-flower.png", tableDataElement);
                                break;
                            case "On villagers":
                                tableDataElement.classList.add("villagers-background");
                                break;
                            case "On trees":
                                tableDataElement.classList.add("trees-background");
                                break;
                            case "Shaking trees":
                                tableDataElement.classList.add("trees-background");
                                addBetterLocationMeaning("../img/tree.png", tableDataElement);
                                break;
                            case "Under trees":
                                tableDataElement.classList.add("trees-background");
                                addBetterLocationMeaning("../img/undertrees.png", tableDataElement);
                                break;
                            case "Near trash":
                                tableDataElement.classList.add("rotten-food-background");
                                addBetterLocationMeaning("../img/trash.png", tableDataElement);
                                break;
                            default:
                                break;
                        }
                    });

                } else {

                    bugsBackgrounds.forEach(backgroundName => {
        
                        DATA.map(OBJECT => document.getElementById(`${OBJECT.id}-${nameReference}`).classList.remove(`${backgroundName}-background`));
                    });
                } 
        }

    } else if (typeof(eventHandler) === "string") {
        
        dataFiltered = DATA.filter(object => (object.shadow.includes(eventHandler)));

        for (const DATA_FILTERED_KEY in dataFiltered) {

            const FILTERED_OBJECT = dataFiltered[DATA_FILTERED_KEY];
            let tableDataElement = document.getElementById(`${FILTERED_OBJECT.id}-${nameReference}`);

            if (DATA.includes(FILTERED_OBJECT)) {
                
                tableDataElement.classList.add("selected-shadow");  
            }
        }

    } else {

        tableHeader.colSpan = Object.keys(DATA).length / powNumber;
        auxTableRowContainer = createElementWithTextNode("tr");

        for (const DATA_KEY in DATA) {

            const OBJECT = DATA[DATA_KEY];

            auxImgElement = createElementWithTextNode("img", null, {src: OBJECT["icon_uri"], alt: OBJECT["file-name"], width: "75px"});
            auxTableColumnContainer = createElementWithTextNode("td", auxImgElement);
            auxTableRowContainer.appendChild(auxTableColumnContainer);
        
            if (auxCount === Object.keys(DATA).length / powNumber) {
            
                tableBody.appendChild(auxTableRowContainer);
                auxTableRowContainer = createElementWithTextNode("tr");
                auxCount = 0;
            }

            auxCount++;
        }
    }
}

/**
 * Handles the error passed by param, displaying only the error on the page (user-friendly).
 * @param {String | number} errorNum 
 * @param {String} errorMeaning 
 */
function handleError(errorNum, errorMeaning) {

    console.log(BODY_REFERENCE.children);
    
    for (let childCount = 0; childCount < BODY_REFERENCE.children.length; childCount++) {

        let element = BODY_REFERENCE.children[childCount];
        element.style.display = "none";
    }

    let errorContentHeader = createElementWithTextNode("h1", errorNum + " : " + errorMeaning);
    let errorContentContact = createElementWithTextNode("p", "Please contact with: donovanmarh@gmail.com.");
    let errorContentParagraph = createElementWithTextNode("p", "The API URL service which displays this application is wrong or down.");
    let errorElement = createElementWithTextNode("div", errorContentHeader, { class: "error-container" });
    errorElement.appendChild(errorContentParagraph);
    errorElement.appendChild(errorContentContact);


    console.log(errorElement);

    BODY_REFERENCE.appendChild(errorElement);
    console.log(document.querySelectorAll("div"));
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