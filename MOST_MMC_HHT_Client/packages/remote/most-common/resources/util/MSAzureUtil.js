/**
 * MS Azure Util Utility
 */
 var MSAzureUtil = function(){}

MSAzureUtil.logIn = function(successCallback, failCallback) {
    try {
        let thenCallback = (loginResponse) => {
            if (successCallback != null && successCallback != undefined) {
                successCallback(loginResponse.account.username);
            }
        };

        let catchCallback = (error) => {
            sessionStorage.clear();

            if (failCallback != null && failCallback != undefined) {
                failCallback(error.errorMessage);
            }
        };

        let msalConfig = {
            auth: {
                clientId: CONSTANTS.SSO_MS_AZURE_CONFIG.CLIENT_ID,
                authority: CONSTANTS.SSO_MS_AZURE_CONFIG.AUTHORITY,
                redirectUri: window.location.origin
            }
        };

        let msalInstance = new msal.PublicClientApplication(msalConfig);

        let loginRequest = { scopes: ["User.Read"] };
        msalInstance.loginPopup(loginRequest).then(thenCallback).catch(catchCallback);
    }
    catch(e) {
        console.error(e);
    }
}

MSAzureUtil.logOut = function() {
    try {
        let msalConfig = {
            auth: {
                clientId: CONSTANTS.SSO_MS_AZURE_CONFIG.CLIENT_ID,
                authority: CONSTANTS.SSO_MS_AZURE_CONFIG.AUTHORITY,
                redirectUri: window.location.origin
            }
        };

        let msalInstance = new msal.PublicClientApplication(msalConfig);
        if (msalInstance.getAllAccounts() == null || msalInstance.getAllAccounts() == undefined) {
            return;
        }

        let logoutRequest = {
            account: msalInstance.getAllAccounts()[0],
            postLogoutRedirectUri: window.location.origin + CONSTANTS.SERVER_CONTEXT
        };
        msalInstance.logoutRedirect(logoutRequest);
 
        sessionStorage.clear();
    }
    catch(e) {
        console.error(e);
    }
}