const UtilInternet = {
    _online: navigator.onLine,
    onOnlineCallback: () => { },
    onOfflineCallback: () => { },
    onMounted: (onOnlineCallback, onOfflineCallback) => {
        onOnlineCallback && UtilInternet.setOnOnlineCallback(onOnlineCallback);
        onOfflineCallback && UtilInternet.setOnOfflineCallback(onOfflineCallback);
        window.addEventListener('online', () => {
            UtilInternet._online = true;
            UtilInternet.onOnlineCallback();
        });
        window.addEventListener('offline', () => {
            UtilInternet._online = false;
            UtilInternet.onOfflineCallback();
        });
    },
    onBeforeUnmount: () => {
        window.removeEventListener('online', () => {
            UtilInternet._online = true;
            UtilInternet.onOnlineCallback();
        });
        window.removeEventListener('offline', () => {
            UtilInternet._online = false;
            UtilInternet.onOfflineCallback();
        });
    },
    setOnOnlineCallback: (callback) => {
        UtilInternet.onOnlineCallback = callback;
    },
    setOnOfflineCallback: (callback) => {
        UtilInternet.onOfflineCallback = callback;
    },
    isOnline: () => {
        return UtilInternet._online;
    },
};
window['UtilInternet'] = UtilInternet;
