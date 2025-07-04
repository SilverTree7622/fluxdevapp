const UtilBackground = {
    setBackground: (bgUrl, excludeElementId = 'phaser-example', bgEleId = 'background-img') => {
        let bgEle = document.getElementById(bgEleId);
        if (!bgEle) {
            const excludeElement = document.getElementById(excludeElementId);
            bgEle = document.createElement('div');
            bgEle.id = bgEleId;
            document.body.insertBefore(bgEle, excludeElement);
        }
        bgEle.style.backgroundImage = `url(${bgUrl})`;
        bgEle.style.backgroundSize = 'cover';
        bgEle.style.backgroundPosition = 'center';
        bgEle.style.backgroundRepeat = 'no-repeat';
        bgEle.style.backgroundAttachment = 'fixed';
        bgEle.style.backgroundBlendMode = 'overlay';
        bgEle.style.width = '100vw';
        bgEle.style.height = '100vh';
    },
    setDarkLayer: (alpha = 0, color = [0, 0, 0], darkLayerId = 'background-dark-layer') => {
        const darkLayer = document.getElementById(darkLayerId);
        if (!darkLayer)
            return;
        darkLayer.style.position = 'fixed';
        darkLayer.style.top = '0';
        darkLayer.style.left = '0';
        darkLayer.style.width = '100vw';
        darkLayer.style.height = '100vh';
        UtilBackground.setDarkLayerProps(alpha, color, darkLayerId);
    },
    setDarkLayerWithExclusion: (alpha = 0.5, color = [0, 0, 0], excludeElementId = 'phaser-example', darkLayerId = 'background-dark-layer', bgEleId = 'background-img') => {
        const bgEle = document.getElementById(bgEleId);
        if (!bgEle)
            return;
        const excludeElement = document.getElementById(excludeElementId);
        if (!excludeElement)
            return;
        const rect = excludeElement.getBoundingClientRect();
        const excludeStartX = rect.left;
        const excludeStartY = rect.top;
        const excludeWidth = rect.width;
        const excludeHeight = rect.height;
        if (excludeStartX > 0) {
            let leftLayer = document.getElementById(`${darkLayerId}-left`);
            if (!leftLayer) {
                leftLayer = document.createElement('div');
                leftLayer.id = `${darkLayerId}-left`;
                document.body.insertBefore(leftLayer, excludeElement);
            }
            leftLayer.style.position = 'fixed';
            leftLayer.style.top = `${excludeStartY}px`;
            leftLayer.style.left = '0';
            leftLayer.style.width = `${excludeStartX}px`;
            leftLayer.style.height = `${excludeHeight}px`;
            leftLayer.style.border = 'none';
            leftLayer.style.margin = '0';
            leftLayer.style.padding = '0';
            leftLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
            leftLayer.style.opacity = `${alpha}`;
        }
        const rightSpace = window.innerWidth - (excludeStartX + excludeWidth);
        if (rightSpace > 0) {
            let rightLayer = document.getElementById(`${darkLayerId}-right`);
            if (!rightLayer) {
                rightLayer = document.createElement('div');
                rightLayer.id = `${darkLayerId}-right`;
                document.body.insertBefore(rightLayer, excludeElement);
            }
            rightLayer.style.position = 'fixed';
            rightLayer.style.top = `${excludeStartY}px`;
            rightLayer.style.left = `${excludeStartX + excludeWidth}px`;
            rightLayer.style.width = `${rightSpace}px`;
            rightLayer.style.height = `${excludeHeight}px`;
            rightLayer.style.border = 'none';
            rightLayer.style.margin = '0';
            rightLayer.style.padding = '0';
            rightLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
            rightLayer.style.opacity = `${alpha}`;
        }
        let topLayer = document.getElementById(`${darkLayerId}-top`);
        if (!topLayer) {
            topLayer = document.createElement('div');
            topLayer.id = `${darkLayerId}-top`;
            document.body.insertBefore(topLayer, excludeElement);
        }
        topLayer.style.position = 'fixed';
        topLayer.style.top = '0';
        topLayer.style.left = '0';
        topLayer.style.width = '100vw';
        topLayer.style.height = `${excludeStartY}px`;
        topLayer.style.border = 'none';
        topLayer.style.margin = '0';
        topLayer.style.padding = '0';
        topLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
        topLayer.style.opacity = `${alpha}`;
        let bottomLayer = document.getElementById(`${darkLayerId}-bottom`);
        if (!bottomLayer) {
            bottomLayer = document.createElement('div');
            bottomLayer.id = `${darkLayerId}-bottom`;
            document.body.insertBefore(bottomLayer, excludeElement);
        }
        bottomLayer.style.position = 'fixed';
        bottomLayer.style.top = `${excludeStartY + excludeHeight}px`;
        bottomLayer.style.left = '0';
        bottomLayer.style.width = '100vw';
        bottomLayer.style.height = `calc(100vh - ${excludeStartY + excludeHeight}px)`;
        bottomLayer.style.border = 'none';
        bottomLayer.style.margin = '0';
        bottomLayer.style.padding = '0';
        bottomLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
        bottomLayer.style.opacity = `${alpha}`;
    },
    setDarkLayerProps: (alpha = 0, color = [0, 0, 0], darkLayerId = 'background-dark-layer') => {
        const darkLayer = document.getElementById(darkLayerId);
        if (darkLayer) {
            darkLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const topLayer = document.getElementById(`${darkLayerId}-top`);
        if (topLayer) {
            topLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const bottomLayer = document.getElementById(`${darkLayerId}-bottom`);
        if (bottomLayer) {
            bottomLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const leftLayer = document.getElementById(`${darkLayerId}-left`);
        if (leftLayer) {
            leftLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const rightLayer = document.getElementById(`${darkLayerId}-right`);
        if (rightLayer) {
            rightLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
    },
    setDarkLayerPropsOnlyPartial: (alpha = 0, color = [0, 0, 0], darkLayerId = 'background-dark-layer') => {
        const topLayer = document.getElementById(`${darkLayerId}-top`);
        if (topLayer) {
            topLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const bottomLayer = document.getElementById(`${darkLayerId}-bottom`);
        if (bottomLayer) {
            bottomLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const leftLayer = document.getElementById(`${darkLayerId}-left`);
        if (leftLayer) {
            leftLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
        const rightLayer = document.getElementById(`${darkLayerId}-right`);
        if (rightLayer) {
            rightLayer.style.backgroundColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        }
    },
    setDarkLayerAlphaOnlyPartial: (alpha = 0, darkLayerId = 'background-dark-layer') => {
        const darkLayer = document.getElementById(darkLayerId);
        if (darkLayer) {
            darkLayer.style.opacity = `${alpha}`;
        }
        const topLayer = document.getElementById(`${darkLayerId}-top`);
        if (topLayer) {
            topLayer.style.opacity = `${alpha}`;
        }
        const bottomLayer = document.getElementById(`${darkLayerId}-bottom`);
        if (bottomLayer) {
            bottomLayer.style.opacity = `${alpha}`;
        }
        const leftLayer = document.getElementById(`${darkLayerId}-left`);
        if (leftLayer) {
            leftLayer.style.opacity = `${alpha}`;
        }
        const rightLayer = document.getElementById(`${darkLayerId}-right`);
        if (rightLayer) {
            rightLayer.style.opacity = `${alpha}`;
        }
    },
};
window['UtilBackground'] = UtilBackground;
