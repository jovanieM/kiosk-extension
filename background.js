// handle message sent from PWA
chrome.runtime.onMessageExternal.addListener(
    async function (request, sender, sendResponse){

        if (request.methodName == 'callRestart') {

            handleTabSendMessage("restart", "restarting now");
                
            console.log(`sendResponse: ${sendResponse}`);

            //restart device immediately
            chrome.runtime.restart();

        } else if (request.methodName == 'callRestartAfterDelay'){

            handleTabSendMessage("restartAfterDelay", "restarting after 5 seconds");

            //restart chrome device after 5 seconds
            chrome.runtime.restartAfterDelay(5);

            console.log(`chrome extension background restartAfterDelay()`);

        } else if (request.methodName == 'getPlatformInfo'){

            const platformInfo = await chrome.runtime.getPlatformInfo();

            handleTabSendMessage("platformInfo", platformInfo);

            console.log(`chrome extension background getPlatformInfo()`);

        } else if (request.methodName == 'getSystemStorageInfo'){

            const storageInfo  = await chrome.system.storage.getInfo();
            
            handleTabSendMessage("systemStorage", storageInfo);

            console.log(`chrome extension background getSystemStorageInfo()`);
            
        } else if (request.methodName == 'managedConfig'){

            handleTabSendMessage("getManagedConfig", "");

        } else if (request.methodName == 'getDisplayInfoMsg'){

            let displayUnitInfos = await chrome.system.display.getInfo();

            let id = displayUnitInfos[0].id;

            handleTabSendMessage("getDisplayInfo", id);

            console.log(JSON.stringify(id));

            sendResponse({displayId: id});

        } else if (request.methodName == 'startCalibrationMsg'){

            let dId = request.displayId;

            handleTabSendMessage("startCalibrating", `Start Calibrating for displayId ${dId}`);

            console.log(dId);

            chrome.system.display.overscanCalibrationStart(dId);
            
        } else if(request.methodName = 'captureScreenshot') {
            try {
              const captureData = await chrome.tabs.captureVisibleTab();

              console.log(`capturedata: ${captureData}`);

              handleTabSendMessage("getCaptureData", captureData);

              sendResponse({capturedData: captureData});
              
            } catch (error){
                sendResponse(null);
            }
          }

    }
);


async function handleTabSendMessage(action, message){
    //send message to content script to update PWA UI
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    return await chrome.tabs.sendMessage(
        tab.id,
        {
            action: action,
            message: message
        },
        function(response) {
            console.log(`received = ${response.received}`);
        }
    );
}