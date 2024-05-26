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
          
      } else if (request.action == 'restartAfterDelay'){

        p1.innerText = request.message;
    
      } else if (request.action == 'platformInfo'){

          const platformInfo = request.message;

          if (platformInfo){
            const {arch, nacl_arch, os} = platformInfo;
            
            p1.innerText = `platformInfo: arch=${JSON.stringify(arch)}, nacl_arch=${JSON.stringify(nacl_arch)}, os=${JSON.stringify(os)}`;
            
          } else {

            p1.innerText = request.message;

          }
     
      } else if (request.action == 'systemStorage'){

          let storageInfos = request.message;

          p1.innerText = JSON.stringify(storageInfos);

      }
      sendResponse({received: true})
    
  });

})()