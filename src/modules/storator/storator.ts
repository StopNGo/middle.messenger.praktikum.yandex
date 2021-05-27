import {safelyParseJSON} from '../../modules/utils/utils';
import {APIResponse} from '../../modules/api/base-api';

export default class Storator {
    static saveData(name: string, data: unknown) {
        if (data !== null && data !== undefined) {
            if (typeof data === 'object') {
                data = JSON.stringify(data);
            }

            localStorage.setItem(name, data as string);

            return data;
        }

        return false;
    }

    static getData(name: string) {
        const data = localStorage.getItem(name);
        if (data !== null) {
            try {
                if (data) {
                    const dataObject = safelyParseJSON(data);
                    return dataObject;
                }
            } catch (_) {
                return data;
            }
        }

        return null;
    }

    static saveDataFromAPI(name: string, request: () => Promise<APIResponse>, rewrite: boolean = false): Promise<any> {
        // Мемоизация
        if (rewrite === false) {
            const data = localStorage.getItem(name);
            if (data !== null) {
                return Promise.resolve();
            }
        }

        return request()
            .then(response => {
                const res: APIResponse = response;
                if (res.status === 'success') {
                    Storator.saveData(name, res.data);
                }
            })
            .catch(error => {
                console.warn(error);
            });
    }

    static rewriteDataFromAPI(name: string, request: () => Promise<APIResponse>) {
        return Storator.saveDataFromAPI(name, request, true);
    }

    static clearAllData() {
        localStorage.clear();
    }
}
