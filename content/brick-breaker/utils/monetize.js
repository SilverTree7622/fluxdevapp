var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UtilMonetize = {
    admob: {
        bannerCache: {},
        init: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (isDev = true) {
            try {
                if (!window['admob']) {
                    return false;
                }
                if (isDev) {
                    window['admob'].configure({
                        testDeviceIds: ['33BE2250B43518CCDA7DE426D04EE231'],
                    });
                }
                yield window['admob'].start();
                return true;
            }
            catch (error) {
                console.error('AdMob 초기화 실패:', error);
                return false;
            }
        }),
        getFromJson: (type, appJson) => {
            if (type !== 'and' && type !== 'ios') {
                console.error('type is not valid: ', type);
                return {};
            }
            return appJson.app.admob[type];
        },
        appOpenAd: (adId = '') => {
            if (!window['admob']) {
                return;
            }
            document.addEventListener('admob.ready', (evt) => {
                console.log('evt from admob.ready: ', evt);
            });
            document.addEventListener('admob.ad.show', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                if (evt['ad'] instanceof window['admob'].AppOpenAd) {
                    console.log('appOpenAd show');
                }
            }));
            const ad = new window['admob'].AppOpenAd({
                adUnitId: adId || 'ca-app-pub-3940256099942544/9257395921',
            });
            ad.on('load', (evt) => {
                console.log('appOpenAd load evt: ', evt);
                ad.show();
            });
            ad.load();
        },
        showBanner: (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (adId = '', opt) {
            var _a, _b, _c, _d;
            try {
                if (!window['admob']) {
                    return { banner: null };
                }
                const actualAdId = adId || 'ca-app-pub-3940256099942544/6300978111';
                if (UtilMonetize.admob.bannerCache[actualAdId]) {
                    console.log('기존 배너 재사용:', actualAdId);
                    const cachedBanner = UtilMonetize.admob.bannerCache[actualAdId];
                    try {
                        if (!cachedBanner.isShowing) {
                            yield cachedBanner.show();
                            cachedBanner.isShowing = true;
                            if (!window['admob'].BannerAd['list'].includes(cachedBanner)) {
                                window['admob'].BannerAd['list'].push(cachedBanner);
                                if (window.parent && window.parent['admob']) {
                                    window.parent['admob'].BannerAd['list'].push(cachedBanner);
                                }
                            }
                        }
                        return { banner: cachedBanner };
                    }
                    catch (e) {
                        console.error('캐시된 배너 재사용 실패:', e);
                        delete UtilMonetize.admob.bannerCache[actualAdId];
                    }
                }
                const config = {
                    adUnitId: actualAdId,
                    position: (_a = opt === null || opt === void 0 ? void 0 : opt.position) !== null && _a !== void 0 ? _a : 'bottom',
                    size: (_c = window['admob'].BannerAd[(_b = opt === null || opt === void 0 ? void 0 : opt.size) !== null && _b !== void 0 ? _b : 'BANNER']) !== null && _c !== void 0 ? _c : 'BANNER',
                    offset: (_d = opt === null || opt === void 0 ? void 0 : opt.offset) !== null && _d !== void 0 ? _d : 0,
                };
                console.log('create new banner:', config);
                const banner = new window['admob'].BannerAd(config);
                banner.on('impression', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from banner impression: ', evt);
                }));
                banner.on('load', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from banner load: ', evt);
                }));
                banner.on('error', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from banner error: ', evt);
                    delete UtilMonetize.admob.bannerCache[actualAdId];
                }));
                try {
                    yield banner.show();
                    banner.isShowing = true;
                    UtilMonetize.admob.bannerCache[actualAdId] = banner;
                    window['admob'].BannerAd['list'] = window['admob'].BannerAd['list'] || [];
                    window['admob'].BannerAd['list'].push(banner);
                    if (window.parent && window.parent['admob']) {
                        window.parent['admob'].BannerAd['list'] = window.parent['admob'].BannerAd['list'] || [];
                        window.parent['admob'].BannerAd['list'].push(banner);
                    }
                }
                catch (e) {
                    console.error('배너 표시 실패:', e);
                    return { banner: null };
                }
                return { banner };
            }
            catch (error) {
                console.error('배너 광고 표시 실패:', error);
                return { banner: null };
            }
        }),
        hideBanner: () => {
            if (!window['admob'])
                return;
            try {
                window['admob'].BannerAd['list'] = window['admob'].BannerAd['list'] || [];
                window['admob'].BannerAd['list'].forEach((banner) => {
                    if (banner) {
                        banner.hide();
                        banner.isShowing = false;
                    }
                });
                window['admob'].BannerAd['list'] = [];
                if (window.parent && window.parent['admob']) {
                    window.parent['admob'].BannerAd['list'] = window.parent['admob'].BannerAd['list'] || [];
                    window.parent['admob'].BannerAd['list'].forEach((banner) => {
                        if (banner) {
                            banner.hide();
                            banner.isShowing = false;
                        }
                    });
                    window.parent['admob'].BannerAd['list'] = [];
                }
            }
            catch (e) {
                console.error('배너 숨기기 실패:', e);
            }
        },
        showInterstitial: (adId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!window['admob'])
                    return false;
                const interstitial = new window['admob'].InterstitialAd({
                    adUnitId: adId,
                });
                yield interstitial.load();
                yield interstitial.show();
                return true;
            }
            catch (error) {
                console.error('전면 광고 표시 실패:', error);
                return false;
            }
        }),
        showRewardVideo: (adId, onReward, onDismiss, onError) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!window['admob'])
                    return false;
                const rewarded = new window['admob'].RewardedAd({
                    adUnitId: adId,
                });
                rewarded.on('load', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from rewarded load v2: ', evt);
                    console.log('window[\'AndroidFullScreen\']: ', window['AndroidFullScreen']);
                    setTimeout(() => {
                        console.log(`hide navigation bar`);
                    }, 3000);
                }));
                rewarded.on('reward', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from rewarded reward: ', evt);
                    onReward && onReward();
                    UtilMonetize.admob.reward.isRewarded = true;
                }));
                rewarded.on('dismiss', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from rewarded dismiss: ', evt);
                    onDismiss && onDismiss(UtilMonetize.admob.reward.isRewarded);
                    UtilMonetize.admob.reward.reset();
                }));
                rewarded.on('error', (evt) => __awaiter(void 0, void 0, void 0, function* () {
                    console.log('evt from rewarded error: ', evt);
                    onError && onError();
                }));
                yield rewarded.load();
                yield rewarded.show();
                return true;
            }
            catch (error) {
                console.error('리워드 광고 표시 실패:', error);
                return false;
            }
        }),
        reward: {
            isPending: false,
            isRewarded: false,
            reset: () => {
                UtilMonetize.admob.reward.isPending = false;
                UtilMonetize.admob.reward.isRewarded = false;
            },
            showVideo: (adId, reward, dismiss, error) => __awaiter(void 0, void 0, void 0, function* () {
                UtilMonetize.admob.reward.isPending = true;
                const isSuccess = yield UtilMonetize.admob.showRewardVideo(adId, reward, dismiss, error);
                UtilMonetize.admob.reward.isPending = false;
                return isSuccess;
            }),
        },
    },
    inapp: {
        init: (products) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!window['store'])
                    throw new Error('Store plugin not found');
                return new Promise((resolve, reject) => {
                    window['store'].ready(() => {
                        try {
                            products.forEach(product => {
                                window['store'].register({
                                    id: product.id,
                                    type: product.type
                                });
                            });
                            window['store'].refresh();
                            resolve();
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                });
            }
            catch (error) {
                console.error('스토어 초기화 실패:', error);
                throw error;
            }
        }),
        purchase: (productId) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!window['store'])
                    return false;
                return new Promise((resolve) => {
                    const purchaseSuccess = (p) => {
                        p.finish();
                        resolve(true);
                    };
                    const purchaseFail = () => {
                        resolve(false);
                    };
                    window['store'].when(productId).approved(purchaseSuccess);
                    window['store'].when(productId).rejected(purchaseFail);
                    window['store'].when(productId).cancelled(purchaseFail);
                    window['store'].order(productId);
                });
            }
            catch (error) {
                console.error('상품 구매 실패:', error);
                return false;
            }
        }),
        restore: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!window['store'])
                    return false;
                return new Promise((resolve) => {
                    const handleProduct = (product) => {
                        if (product && product.state === 'approved') {
                            product.finish();
                        }
                    };
                    window['store'].when('*').approved(handleProduct);
                    window['store'].when('*').owned(handleProduct);
                    window['store'].refresh();
                    setTimeout(() => resolve(true), 3000);
                });
            }
            catch (error) {
                console.error('구매 복원 실패:', error);
                return false;
            }
        }),
        getProduct: (productId) => {
            try {
                if (!window['store'])
                    return null;
                return window['store'].get(productId);
            }
            catch (error) {
                console.error('상품 정보 가져오기 실패:', error);
                return null;
            }
        },
    },
    PRODUCT_TYPES: {
        get CONSUMABLE() { var _a; return ((_a = window['store']) === null || _a === void 0 ? void 0 : _a.CONSUMABLE) || 'consumable'; },
        get NON_CONSUMABLE() { var _a; return ((_a = window['store']) === null || _a === void 0 ? void 0 : _a.NON_CONSUMABLE) || 'non-consumable'; },
        get SUBSCRIPTION() { var _a; return ((_a = window['store']) === null || _a === void 0 ? void 0 : _a.PAID_SUBSCRIPTION) || 'paid subscription'; },
    },
};
window['UtilMonetize'] = UtilMonetize;
