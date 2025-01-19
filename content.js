console.log("Content.js loaded");
load()
chrome.runtime.onMessage.addListener(() => {
       load(); 
});
function load(){
        // Remove all linked stylesheets
        document.querySelectorAll('link[rel="stylesheet"]')
        .forEach(
            link => link.parentNode.removeChild(link));
        document.querySelectorAll('link[rel="stylesheet"]')
        .forEach(
            link => link.remove(link));
        
        // Remove all inline styles in <style> tags
        document.querySelectorAll('style').forEach(style => style.remove());
        
        // Remove inline styles on elements
        document.querySelectorAll('*').forEach(el => el.removeAttribute('style'));

        // Add redesigned by message
        const header = document.createElement('h5');
        header.setAttribute('class', 'redesignMessage');
        header.textContent = 'Redesigned by Nathan Obcemea';
        document.body.appendChild(header);

        // Functions to run
        removeEmptyBoxes();
        fixSubText();
        rewording();
        addImage();
        loadFont();
        //addIcons();
        tabIcon();
        // fixTranscriptPage();
        fix2();
}
//Adds tab icon
function tabIcon(){
    const icon = document.createElement('link');
    icon.rel = 'icon';
    icon.href = chrome.runtime.getURL('./images/64.png');
    document.head.appendChild(icon);
}

//Removes empty boxes
function removeEmptyBoxes() {
    document.querySelectorAll('table.menuplaintable').forEach(table => {
        table.querySelectorAll('tr').forEach(el => {
            const firstChild = el.querySelector('td:first-child');
            if (firstChild) {
                firstChild.remove();
            }
        });
    });
}

//Makes span text a child of the link in each textbox
function fixSubText(){
    document.querySelectorAll('td.mpdefault').forEach(td => {
        const span = td.querySelector('span');
        const link = td.querySelector('a');
        try{
            if (link) {
                if(span){
                    td.removeChild(span);
                    link.appendChild(span);
                }
            }
        }catch(e){
            console.log(e);
        }
    });
}

//Rewording, removing, and reorganizing elements
function rewording() {
    const header = document.querySelector('.vtheader');
    if(header){
        header.textContent = '';
    }
    document.querySelectorAll('.skiplinks').forEach(
        link => link.remove());
    document.querySelector('.pagetitlediv').remove();
    // Select the form element
    const form = document.querySelector('form');

    // Remove the text node (which contains "search") from the form
    form.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() === "Search") {
        node.remove();
        console.log("Removed");
        }
    });

    //remove search and menu
    const search = document.querySelectorAll('[summary="This table displays Menu Items and Banner Search textbox."]');
    search.forEach(s => s.remove());

    //make top links child of header
    const wrapper = document.querySelector('.headerwrapperdiv');
    const pageheader = wrapper.children[0];
    const links = wrapper.children[1];
    wrapper.removeChild(links);
    pageheader.appendChild(links);

    //remove empty images
    document.querySelectorAll('.bgtaboff img').forEach(img => img.remove());
    document.querySelectorAll('.bgtabon img').forEach(img => img.remove());


}

//Add burrus image and vt logo
function addImage() {
    const wrapper = document.querySelector('.headerwrapperdiv');
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL("./images/burrus.jpg");   
    img.className = 'burrus';
    wrapper.appendChild(img);

    const vtheader = document.querySelector('.vtheader');
    const vtlogo = document.createElement('img');
    vtlogo.src = chrome.runtime.getURL("./images/vtlogo-gray.png");   
    vtlogo.className = 'vtlogo';
    vtheader.appendChild(vtlogo);
}

//Load font
function loadFont() {
    const fontUrl = chrome.runtime.getURL('fonts/AcherusGrotesque/regular2.otf');
    console.log(fontUrl);

    // Create the @font-face CSS rule
    const style = document.createElement('style');
    style.textContent = `
    @font-face {
        font-family: 'AcherusGrotesque';
        src: url('${fontUrl}') format('opentype');
    }
    `;

    // Append the style tag to the document's head
    document.head.appendChild(style);

    // Apply the font to the body (or any other element)
    console.log('Font loaded');
}
//In progress: add icons to the menu
function addIcons(){
    const box = document.querySelector('.menuplaintable').querySelector('tbody');
    const box2 = document.querySelector('.mpdefault');
    const icon = document.createElement('img');
    icon.src = chrome.runtime.getURL("images/form.png");
    icon.className = 'icon';
    box2.appendChild(icon);

}
function fixTranscriptPage() {
    document.querySelectorAll('.menuplaintable tbody tr .mpdefault').forEach(mpdefault => {
        const itemsChildren = mpdefault.children;
        const title = itemsChildren[1].textContent;
        const firstLink = itemsChildren[0];
        const span = itemsChildren[2];
        console.log(title);
        for (let i = 0; i < firstLink.children.length; i++) {
            itemsChildren[1].append(firstLink.children[i]);
            console.log("appended");
        }
        itemsChildren[0].remove();
        if (span) {
            mpdefault.appendChild(span);
        }
    });
}
function fix2(){
    if (window.location.href === "https://selfservice.banner.vt.edu/ssb/twbkwbis.P_GenMenu?name=bmenu.P_TranscriptMnu") {
        document.querySelectorAll('tr').forEach(row => {
            // Remove all <img> elements
            row.querySelectorAll('img').forEach(img => img.remove());
    
            // Remove all elements containing "&nbsp;"
            row.querySelectorAll('*').forEach(child => {
                if (child.nodeType === Node.ELEMENT_NODE && child.innerHTML.trim() === '&nbsp;') {
                    child.remove();
                }
            });
    
            // Remove all text nodes containing only "&nbsp;"
            Array.from(row.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() === '\u00A0') {
                    child.remove();
                }
            });
    
            // Move the children of the first link to the second link and remove the first link
            const links = row.querySelectorAll('a');
            if (links.length >= 2) {
                const firstLink = links[0];
                const secondLink = links[1];
    
                // Move all children from the first link to the second link
                while (firstLink.firstChild) {
                    secondLink.appendChild(firstLink.firstChild);
                }
    
                // Remove the first link
                firstLink.remove();
            }
        });
    }
     
    
}