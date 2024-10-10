(async () => {
 
  let infoContainer = document.getElementsByClassName("message-container")[0];

  let p1 = document.createElement("p");
  p1.innerText = "Extension connected: waiting for message";


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

            const info = `platformInfo: arch=${JSON.stringify(arch)}, nacl_arch=${JSON.stringify(nacl_arch)}, os=${JSON.stringify(os)}`;

            console.log(`chrome extension content-script: ${info}`);

            p1.innerText = info;
            
          } else {

            p1.innerText = request.message;

          }
     
      } else if (request.action == 'systemStorage'){

          let storageInfos = request.message;

          console.log(`chrome extension content-script: ${JSON.stringify(storageInfos)}`);

          p1.innerText = JSON.stringify(storageInfos);

      } else if(request.action == 'getManagedConfig'){

        navigator.managed.getManagedConfiguration(["color"])

        .then(function(result){

          console.log(JSON.stringify(result));

          p1.innerText = JSON.stringify(result);

        });
      
      } else if(request.action == 'getDisplayInfo'){

        let displayId = request.message;

        // console.log(`chrome extension content-script: ${JSON.stringify(displayInfos)}`);

        // displayId = displayInfos[0].id;

        p1.innerText = `System display's id: ${JSON.stringify(displayId)}`;

      } else if(request.action == 'startCalibrating'){

        p1.innerText = JSON.stringify(request.message);
        
      } else if(request.action == 'getCaptureData'){

        p1.innerText = JSON.stringify(request.message);
        
      }
      
      sendResponse({received: true})
    
  });

})()