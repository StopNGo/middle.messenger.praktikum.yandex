export default class Templator {
    private _template: string;
    constructor(template: string) {
        this._template = template;
    }

    match(templ: string, values: object, parent: string = ''): string {
        Object.entries(values).forEach(([key, value]) => {
            let search: RegExp = new RegExp('(\\{\\{)\\s*' + (parent === '' ? key : parent + '.' + key) + '\\s*(\\}\\})', 'gm');
            let replace: any = value;

            if (typeof value === 'function') {
                replace = value
                    .toString()
                    .replace(/^[^{]*{\s*/, '')
                    .replace(/\s*}[^}]*$/, '');
                replace = replace.replace(/"/g, '\'');
            }

            templ = templ.replace(search, replace);
        });

        return templ;
    }

    compile(ctx: Object, clean: boolean = true): string {
        let output: string = this._template;
        output = this.match(output, ctx);

        // Clean empty values, use 'false' for modifying template with other components
        if (clean === true) {
            output = output.replace(/(\{\{).*?(\}\})/gm, '');
        }

        return output;
    }
}
