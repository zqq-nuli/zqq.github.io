// 获取访问者ip
export function getUserIP(onNewIP) {
    console.log("进来了");
    let MyPeerConnection =
        window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    let pc = new MyPeerConnection({
        iceServers: [],
    });
    let noop = () => {};
    let localIPs = {};
    let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
    let iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    };
    console.log("执行到pc.createData");
    pc.createDataChannel("");
    pc.createOffer()
        .then(sdp => {
            console.log("then", sdp.sdp);
            sdp.sdp.split("\n").forEach(function (line) {
                console.log("循环前", line);
                if (line.indexOf("candidate") < 0) return;
                line.match(ipRegex).forEach(iterateIP);
                console.log("循环中获取到ip");
            });
            pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(reason => {
            console.log("catch", reason);
        });
    pc.onicecandidate = ice => {
        if (
            !ice ||
            !ice.candidate ||
            !ice.candidate.candidate ||
            !ice.candidate.candidate.match(ipRegex)
        ) {
            return;
        }
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        console.log("结尾ip");
    };
}

// 获取浏览器信息

export function userAgent() {
    let browserReg = {
        Chrome: /Chrome/,
        IE: /MSIE/,
        Firefox: /Firefox/,
        Opera: /Presto/,
        Safari: /Version\/([\d.]+).*Safari/,
        360: /360SE/,
        QQBrowswe: /QQ/,
        Edge: /Edg/,
    };
    let deviceReg = {
        iPhone: /iPhone/,
        iPad: /iPad/,
        Android: /Android/,
        Windows: /Windows/,
        Mac: /Macintosh/,
    };
    let userAgentStr = navigator.userAgent;
    const userAgentObj = {
        browserName: "", // 浏览器名称
        browserVersion: "", // 浏览器版本
        osName: "", // 操作系统名称
        osVersion: "", // 操作系统版本
        deviceName: "", // 设备名称
    };
    for (let key in browserReg) {
        if (browserReg[key].test(userAgentStr)) {
            userAgentObj.browserName = key;
            if (key === "Chrome") {
                userAgentObj.browserVersion = userAgentStr.split("Chrome/")[1].split(" ")[0];
            } else if (key === "IE") {
                userAgentObj.browserVersion = userAgentStr.split("MSIE ")[1].split(" ")[1];
            } else if (key === "Firefox") {
                userAgentObj.browserVersion = userAgentStr.split("Firefox/")[1];
            } else if (key === "Opera") {
                userAgentObj.browserVersion = userAgentStr.split("Version/")[1];
            } else if (key === "Safari") {
                userAgentObj.browserVersion = userAgentStr.split("Version/")[1].split(" ")[0];
            } else if (key === "360") {
                userAgentObj.browserVersion = "";
            } else if (key === "QQBrowswe") {
                userAgentObj.browserVersion = userAgentStr.split("Version/")[1].split(" ")[0];
            } else if (key === "Edge") {
                userAgentObj.browserVersion = userAgentStr.split("Edg/")[1].split(" ")[0];
            }
        }
    }

    for (let key in deviceReg) {
        if (deviceReg[key].test(userAgentStr)) {
            userAgentObj.osName = key;
            if (key === "Windows") {
                userAgentObj.osVersion = userAgentStr.split("Windows NT ")[1].split(";")[0];
            } else if (key === "Mac") {
                userAgentObj.osVersion = userAgentStr.split("Mac OS X ")[1].split(")")[0];
            } else if (key === "iPhone") {
                userAgentObj.osVersion = userAgentStr.split("iPhone OS ")[1].split(" ")[0];
            } else if (key === "iPad") {
                userAgentObj.osVersion = userAgentStr.split("iPad; CPU OS ")[1].split(" ")[0];
            } else if (key === "Android") {
                userAgentObj.osVersion = userAgentStr.split("Android ")[1].split(";")[0];
                userAgentObj.deviceName = userAgentStr
                    .split("(Linux; Android ")[1]
                    .split("; ")[1]
                    .split(" Build")[0];
            }
        }
    }
    return userAgentObj;
}
