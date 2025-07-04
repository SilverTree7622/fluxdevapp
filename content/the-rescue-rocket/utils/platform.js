var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UtilPlatform = {
    init: (onLoadCallback) => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isAndroid = userAgent.includes('android');
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isElectron = userAgent.includes('electron');
        if (isAndroid || isIOS || isElectron) {
            const script = document.createElement('script');
            script.src = window.location.pathname.includes('/content/')
                ? '../../cordova.js'
                : '/cordova.js';
            script.async = true;
            script.onerror = () => {
                console.warn('cordova.js 로드 실패');
                onLoadCallback === null || onLoadCallback === void 0 ? void 0 : onLoadCallback();
            };
            script.onload = () => {
                console.log(`cordova.js 로드 성공 (${isAndroid ? 'Android' : isIOS ? 'iOS' : 'Electron'})`);
                console.log(`window, window['cordova']:`, window, window['cordova']);
                onLoadCallback === null || onLoadCallback === void 0 ? void 0 : onLoadCallback();
            };
            document.body.appendChild(script);
        }
        else {
            console.log('웹 환경에서는 cordova.js를 로드하지 않습니다.');
            onLoadCallback === null || onLoadCallback === void 0 ? void 0 : onLoadCallback();
        }
    },
    convertPlatformToStr: (platform) => {
        if (platform === 0)
            return 'web';
        if (platform === 1)
            return 'and';
        return 'ios';
    },
    convertStrToPlatform: (str) => {
        if (str === 'web')
            return 0;
        if (str === 'and')
            return 1;
        return 2;
    },
    chckIsApp: () => {
        return UtilPlatform.getType() !== 'web';
    },
    chckPlatform: (platform) => {
        return UtilPlatform.getType() === platform;
    },
    getType: () => {
        if (!window['cordova']) {
            return 'web';
        }
        if (window['cordova']['platformId'] === 'android') {
            return 'and';
        }
        if (window['cordova']['platformId'] === 'ios') {
            return 'ios';
        }
        return 'web';
    },
    evtLogic: (webCallback, appCallback, andCallback, iosCallback) => __awaiter(void 0, void 0, void 0, function* () {
        let res = undefined;
        if (!window['cordova']) {
            webCallback && (res = yield webCallback());
        }
        if (window['cordova'] &&
            (window['cordova']['platformId'] === 'android' ||
                window['cordova']['platformId'] === 'ios')) {
            appCallback && (res = yield appCallback());
            if (window['cordova']['platformId'] === 'android') {
                andCallback && (res = yield andCallback());
            }
            if (window['cordova']['platformId'] === 'ios') {
                iosCallback && (res = yield iosCallback());
            }
        }
        return res;
    }),
    evt: (webCallback, appCallback, andCallback, iosCallback, endCallback) => {
        return new Promise(() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield UtilPlatform.evtLogic(webCallback, appCallback, andCallback, iosCallback);
            }
            catch (e) {
                console.warn('e from cross platform:', e);
            }
        }));
    },
    ready: (callback) => {
        const handleCallback = () => {
            if (!window['cordova']) {
                callback && callback();
                return;
            }
            const isThisInIframe = window.location.href.includes('/content/');
            console.log('window.location from iframe utils: ', window.location);
            if (isThisInIframe) {
                callback && callback();
            }
            else {
                document.addEventListener("deviceready", () => __awaiter(void 0, void 0, void 0, function* () {
                    console.log(`device ready evt:`, window, window['device']);
                    callback && (yield callback());
                }));
            }
        };
        UtilPlatform.init(handleCallback);
    },
    showSplashScreen: () => {
        if (!window['cordova'])
            return;
        if (window['cordova']['platformId'] === 'android' || window['cordova']['platformId'] === 'ios') {
            try {
                navigator['splashscreen'].show();
            }
            catch (e) {
                console.warn('스플래시 스크린 표시 실패:', e);
            }
        }
    },
    hideSplashScreen: () => {
        if (!window['cordova'])
            return;
        if (window['cordova']['platformId'] === 'android' || window['cordova']['platformId'] === 'ios') {
            try {
                navigator['splashscreen'].hide();
            }
            catch (e) {
                console.warn('스플래시 스크린 숨기기 실패:', e);
            }
        }
    },
    setSwipeRefreshPlugin: (onSuccess, onError) => {
        if (!window['cordova'])
            return;
        window['cordova']['plugin']['swipe'].smooth.initialize().then((success) => {
            if (success) {
                onSuccess && onSuccess();
            }
            else {
                onError && onError();
            }
        });
        UtilPlatform.setSwipeRefreshPluginEnable(true);
    },
    setSwipeRefreshPluginEnable: (enable) => {
        if (!window['cordova'])
            return;
        window['cordova']['plugin']['swipe'].smooth.enableSwipe(enable);
    },
    chckThisAppIsForProd: (onDebugAction) => {
        if (!window['cordova'])
            return;
        window['cordova']['plugin'].isDebug.getIsDebug((isDebug) => {
            console.log('isDebug: ', isDebug);
            if (isDebug) {
                console.warn('이 앱은 프로덕션 버전이 아닙니다.');
                onDebugAction && onDebugAction();
                return;
            }
        }, (err) => {
            console.error(err);
        });
    },
    onMountedParent: (callback) => {
        UtilPlatform._sendMsg2ParentEvtCallback = callback;
        window.addEventListener("message", UtilPlatform._sendMsg2ParentEvt);
    },
    onBeforeUnmountParent: () => {
        window.removeEventListener('message', UtilPlatform._sendMsg2ParentEvt);
        UtilPlatform._sendMsg2ParentEvtCallback = (isShow) => { };
    },
    _sendMsg2ParentEvt: (event) => {
        const type = event.data.type;
        if (type === 'ShowNavFooterPlay') {
            UtilPlatform._sendMsg2ParentEvtCallback(true);
        }
        if (type === 'HideNavFooterPlay') {
            UtilPlatform._sendMsg2ParentEvtCallback(false);
        }
        if (type === '') {
        }
    },
    _sendMsg2ParentEvtCallback: (isShow) => { },
    sendMsg2Parent: (type, data) => {
        if (data) {
            window.parent[type] = data;
        }
        window.parent.postMessage({
            type: type,
        }, '*');
    },
};
window['UtilPlatform'] = UtilPlatform;
