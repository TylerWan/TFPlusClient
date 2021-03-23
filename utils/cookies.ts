const Cookies = require('cookies');

export function getCookieDough(req: any, res: any) {
    return new Cookies(req, res);
}

export function getCookie(req: any, res: any, name: string) {
    const dough = getCookieDough(req, res);
    return dough.get(name);
}

export function setCookie(req: any, res: any, name: string, data: any) {
    const dough = getCookieDough(req, res);
    return dough.set(name, data);
}
