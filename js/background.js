var contextMenus = {};

contextMenus.createCounterString = 
    chrome.contextMenus.create(
        {"title":"copy_",
        "contexts" : ["all"]
        },
        function (){
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError.message);
            }
        }
    );

chrome.contextMenus.onClicked.addListener(contextMenuHandler);


function contextMenuHandler(info, tab){

    if(info.menuItemId===contextMenus.createCounterString){
		
		chrome.tabs.executeScript( {
		  code: "window.getSelection().toString();"
		}, function(selection) {
			
			var text = ("" + selection).replace(/(\r\n|\n|\r)/gm, "_").replace(/ /g,"_");
			copyTextToClipboard(text);
		
		  	//console.dir(text);
		});		
		
		
       // chrome.tabs.executeScript({
         //   file: 'js/counterstring.js'
          //});
    }
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}