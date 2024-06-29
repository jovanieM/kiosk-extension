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
        } else if (request.methodName == 'startCalibrationMsg'){

            handleTabSendMessage("startCalibrating", "Start Calibrating");

            let displayUnitInfos = await chrome.system.display.getInfo();

            console.log(JSON.stringify(displayUnitInfos));

            let displayId = displayUnitInfos[0].id;

            chrome.system.display.overscanCalibrationStart(displayId);
            
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