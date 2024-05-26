// message handler
chrome.runtime.onMessageExternal.addListener(
    async function (request, sender, sendResponse){

        if (request.methodName == 'callRestart') {
            console.log("restart called in background");

            handleTabSendMessage("restart", "restarting now");
                
            console.log(`jmolas ${sendResponse}`);

            //restart chrome device after 5 seconds
            chrome.runtime.restart();

        } else if (request.methodName == 'callRestartAfterDelay'){

            const platformInfo = await chrome.runtime.getPlatformInfo();

            handleTabSendMessage("restartAfterDelay", "restarting after 5 seconds");

            chrome.runtime.restartAfterDelay(5);

        } else if (request.methodName == 'getPlatformInfo'){

            const platformInfo = await chrome.runtime.getPlatformInfo();
            const {arch, nacl_arch, os} = platformInfo;

            handleTabSendMessage("platformInfo", platformInfo);

        } else if (request.methodName == 'getSystemStorageInfo'){

            const storageInfo  = await chrome.system.storage.getInfo();
            
            handleTabSendMessage("systemStorage", storageInfo);
            
        }
    }
);

async function handleTabSendMessage(action, message){
    //send message to content script to update 
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