(async () => {
 
  let infoContainer = document.getElementsByClassName("message-container")[0];

  let p1 = document.createElement("p");
  p1.innerText = "waiting for message";


  if (infoContainer) {
    infoContainer.appendChild(p1);
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.action == 'restart'){
          //display message
          p1.innerText = request.message;
          
      } else if (request.action == 'platformInfo'){

        p1.innerText = request.message;
      
      } else if (request.action == 'systemStorage'){

        p1.innerText = request.message;

      }
      
      sendResponse({received: true})
    
  });

})()