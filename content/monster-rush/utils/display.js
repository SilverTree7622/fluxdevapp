const UtilDisplay = {
    resizeToFit: (w, h, spriteW, spriteH, maxScale = 1) => {
        const screenRatio = w / h;
        const spriteRatio = spriteW / spriteH;
        let scale = 0;
        if (screenRatio > spriteRatio) {
            scale = (h / spriteH) * maxScale;
        }
        else {
            scale = (w / spriteW) * maxScale;
        }
        return scale;
    },
    resizeViaBanner: (width, height, gameContainerElement, bannerHeight = 50) => {
        const BANNER_HEIGHT = bannerHeight || 50;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        if (!gameContainerElement)
            return;
        gameContainerElement.style.position = 'absolute';
        gameContainerElement.style.width = '100%';
        gameContainerElement.style.height = '100%';
        gameContainerElement.style.left = '0';
        gameContainerElement.style.top = '0';
        const gameRatio = width / height;
        const availableHeight = windowHeight - BANNER_HEIGHT;
        const screenRatio = windowWidth / availableHeight;
        if (screenRatio > gameRatio) {
            const finalHeight = Math.min(availableHeight, windowWidth / gameRatio);
            const finalWidth = finalHeight * gameRatio;
            console.log('case 1: screen wider than game');
            if (windowHeight - finalHeight >= BANNER_HEIGHT) {
                console.log('case 1-1: enough space for banner');
                gameContainerElement.style.top = `${windowHeight - finalHeight - BANNER_HEIGHT}px`;
                gameContainerElement.style.height = `${finalHeight}px`;
                gameContainerElement.style.width = `${finalWidth}px`;
                gameContainerElement.style.left = `${(windowWidth - finalWidth) / 2}px`;
            }
            else {
                console.log('case 1-2: not enough space, need resize');
                const newHeight = windowHeight - BANNER_HEIGHT;
                const newWidth = newHeight * gameRatio;
                gameContainerElement.style.height = `${newHeight}px`;
                gameContainerElement.style.width = `${newWidth}px`;
                gameContainerElement.style.left = `${(windowWidth - newWidth) / 2}px`;
            }
        }
        else {
            const finalWidth = windowWidth;
            const finalHeight = finalWidth / gameRatio;
            console.log('case 2: screen narrower than game');
            if (windowHeight - finalHeight >= BANNER_HEIGHT) {
                console.log('case 2-1: enough space for banner');
                gameContainerElement.style.top = `${windowHeight - finalHeight - BANNER_HEIGHT}px`;
                gameContainerElement.style.height = `${finalHeight}px`;
                gameContainerElement.style.width = `${finalWidth}px`;
            }
            else {
                console.log('case 2-2: not enough space, need resize');
                const newHeight = windowHeight - BANNER_HEIGHT;
                const newWidth = newHeight * gameRatio;
                gameContainerElement.style.height = `${newHeight}px`;
                gameContainerElement.style.width = `${newWidth}px`;
                gameContainerElement.style.left = `${(windowWidth - newWidth) / 2}px`;
            }
        }
    },
};
window['UtilDisplay'] = UtilDisplay;
