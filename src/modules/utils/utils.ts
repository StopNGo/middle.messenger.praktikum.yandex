export function isEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }

    if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }

        for (let prop in a) {
            if (Object.prototype.hasOwnProperty.call(b, prop)) {
                if (!isEqual(a[prop], b[prop])) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    return false;
}

/*
 * Санобрботка в 3 строки
 */
export function sanitize(a: string): string {
    const temp = document.createElement('div');
    temp.textContent = a;
    return temp.innerHTML;
}

/*
 * Такой себе способ немножко побороть DOS атаки
 */
export function sleep(ms: number) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(true);
        }, ms);
    });
}

/*
 * Избегаем падения при ошибке парсинга
 */
export function safelyParseJSON(a: string): any {
    let parsed;

    try {
        parsed = JSON.parse(a);
    } catch (e) {
        throw new Error(e.message);
    }

    return parsed;
}
