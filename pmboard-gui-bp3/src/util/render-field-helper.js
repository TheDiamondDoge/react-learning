export default class RenderFieldHelper {
    constructor(fieldsObjects) {
        this._fieldsToRender = fieldsObjects;
    }
    
    _allowedIf = "allowedIf";
    _notAllowedIf = "notAllowedIf";

    displayOrNot(id, options) {
        if (!this.isLabelExists(id)) return false;

        if (this._fieldsToRender[id].hasOwnProperty(this._allowedIf)) {
            return this._shouldRender(this._allowedIf, options, id);
        } else if (this._fieldsToRender[id].hasOwnProperty(this._notAllowedIf)) {
            return this._shouldRender(this._notAllowedIf, options, id);
        }

        return true;
    };

    isEditable(field) {
        const editable = this._fieldsToRender[field].editable;
        if (!(editable === undefined)) {
            return this._fieldsToRender[field].editable;
        } else {
            return true;
        }
    }

    isLabelExists(id) {
        return (id in this._fieldsToRender);
    };

    getFieldProps(field, value) {
        const fieldType = this._fieldsToRender[field].type ? this._fieldsToRender[field].type : "text";
        if (field === "composite") {
            return {
                type: fieldType,
                value
            }
        } else {
            return {
                type: fieldType
            }
        }
    }

    _shouldRender(fieldOptions, options, id) {
        if (this._fieldsToRender[id].hasOwnProperty(fieldOptions)) {
            let fieldProps = this._fieldsToRender[id][fieldOptions];
            let props = Object.keys(fieldProps);
            for (let i = 0; i < props.length; i++) {
                const prop = props[i];
                if (options[prop] !== undefined) {
                    for (let i = 0; i < fieldProps[prop].length; i++) {
                        if (fieldOptions === "allowedIf") {
                            if (fieldProps[prop][i] === options[prop]) {
                                return true;
                            }
                        }

                        if (fieldOptions === "notAllowedIf") {
                            if (fieldProps[prop][i] !== options[prop]) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    getLabelById = (id) => {
        if (this.isLabelExists(id)) {
            return this._fieldsToRender[id].label;
        }
    };
}