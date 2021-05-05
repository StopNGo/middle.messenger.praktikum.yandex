/**
 * https://gist.github.com/jed/982883
 * */
export default function uuidator(): string {
    return (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
}

export function isValidUUID(uuid: string): boolean {
    const re = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return re.test(uuid);
}

export type TUUID = string;
