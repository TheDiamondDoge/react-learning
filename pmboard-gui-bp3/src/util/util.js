export function formikFieldHandleChange(form) {
    return function (name) {
        return function (value) {
            form.setFieldValue(name, value);
        }
    }
}

export function getPropFromStringPath(obj, path) {
    let edittedPath = path.replace(/]/g, "");
    let arr = edittedPath.split(/[\.\[]/);
    try {
        let tmpVal = obj;
        for (let i = 0; i < arr.length; i++) {
            tmpVal = tmpVal[arr[i]];
        }
        return tmpVal;
    } catch (e) {
        return undefined;
    }
}