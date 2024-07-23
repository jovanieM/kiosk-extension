// handle message sent from PWA
chrome.runtime.onMessageExternal.addListener(
    async function (request, sender, sendResponse){

        if (request.methodName == 'getDisplayInfoMsg'){

            let displayUnitInfos = await chrome.system.display.getInfo();

            let id = displayUnitInfos[0].id;

            chrome.system.display.overscanCalibrationStart(id);
        }
    }
);
