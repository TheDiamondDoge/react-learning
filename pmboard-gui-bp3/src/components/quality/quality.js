import React from 'react';
import {HTMLTable, Icon, Button, Position, Tooltip} from "@blueprintjs/core";
import EditSaveControls from "../controls/edit-save-controls/edit-save-controls";
import styles from "./quality.module.css";
import FieldName from "../field-name/field-name";
import PropTypes from "prop-types";
import {FieldArray, Formik} from "formik";
import FormikInput, {RenderControls} from "../controls/util-renderers";
import HelpIcon from "../help-icon/help-icon";
import {getDateFromStringWithTime} from "../../util/transform-funcs";
import {FieldsToRenderShape, QualityIndicatorsShape} from "../../util/custom-types";
import FieldValue from "../field-value/field-value";
import {formikFieldHandleChange, getSpecialNumericRegexp} from "../../util/util";
import getValidationSchema from "./validation-schema";
import Comment from "../comment/comment";

export default class Quality extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
        };
    }

    onSubmitForm = null;
    updateNumericHandler = null;

    bindFormSubmission = (formikSubmit) => {
        this.onSubmitForm = formikSubmit;
    };

    onClickEdit = () => {
        this.setState(
            (prevState) => ({editMode: !prevState.editMode})
        )
    };

    render() {
        const {qualityKpi, onSubmit} = this.props;
        let {quality, defects, backlog, testExecution, testRate} = qualityKpi;

        quality = this.fillArrayIfEmpty(quality);
        defects = this.fillArrayIfEmpty(defects);
        backlog = this.fillArrayIfEmpty(backlog);
        testExecution = this.fillArrayIfEmpty(testExecution);
        testRate = this.fillArrayIfEmpty(testRate);

        return (
            <Formik
                initialValues={
                    {
                        quality,
                        defects,
                        backlog,
                        testExecution,
                        testRate
                    }
                }
                onSubmit={
                    values => {
                        onSubmit(values);
                        this.onClickEdit();
                    }
                }
                validationSchema={
                    getValidationSchema()
                }
                render={
                    (formikProps) => {
                        this.bindFormSubmission(formikProps.submitForm);
                        this.updateNumericHandler = formikFieldHandleChange(formikProps);
                        return this.renderQualityForm(formikProps.values);
                    }
                }
            />

        );
    }

    fillArrayIfEmpty(object) {
        if (object.length === 0) {
            object.push(this.getEmptyRowObject(""));
        }
        return object;
    };

    renderQualityForm = (values) => {
        const {syncDate} = this.props.qualityKpi;
        const {fieldsToRender, onCancel} = this.props;

        return (
            <>
                <div>
                    <div className={styles.float_left}>
                        <Button
                            minimal
                            intent={"primary"}
                        >
                            <Icon icon={"refresh"}/>
                        </Button>
                        Last synchro:
                        <span className={styles.sync_date}>{getDateFromStringWithTime(syncDate)}</span>
                    </div>
                    <EditSaveControls
                        className={styles.float_right}
                        onClick={this.onClickEdit}
                        onSubmit={this.onSubmitForm}
                        editMode={this.state.editMode}
                        onCancel={onCancel}
                    />
                </div>
                <HTMLTable
                    striped
                    className={styles.quality_table}
                >
                    <colgroup>
                        <col className={styles.descr_col}/>
                        <col className={styles.controls_col}/>
                        <col className={styles.controls_col}/>
                        <col className={styles.obj_col}/>
                        <col className={styles.actual_col}/>
                        <col/>
                    </colgroup>
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                        <th/>
                        <th className={styles.column_align_center}>Objective</th>
                        <th className={styles.column_align_center}>Actual value</th>
                        <th className={styles.column_align_center}>Comment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        //TODO: render-helper-class
                        Object.keys(fieldsToRender).map(field => {
                                if (field === "testExecution" || field === "testRate") {
                                    return this.renderComplexRows(values, field, true);
                                } else {
                                    return this.renderComplexRows(values, field, false);
                                }
                            }
                        )
                    }
                    </tbody>
                </HTMLTable>
            </>
        )
    };

    renderComplexRows = (values, field, isControlled) => {
        const rowsNum = values[field].length;
        const rowSpan = rowsNum < 2 ? 1 : rowsNum;
        let indicators = values[field];
        return (
            <FieldArray
                key={field}
                name={field}
                render={(arrayHelpers) => {
                    const rowTitle = this.props.fieldsToRender[field].label;
                    const help = this.props.fieldsToRender[field].help;
                    if (indicators && indicators.length === 0) {
                        indicators = [this.getEmptyRowObject("")];
                    }
                    const comment = indicators[0].comment;
                    const isActualEditable = this.isEditable(field);
                    return indicators.map((row, i) => {
                        const inputAttrs = {};
                        if (isControlled) {
                            const regexp = getSpecialNumericRegexp();
                            inputAttrs.onChange = this.updateNumericHandler(`${field}[${i}].objective`, regexp);
                            inputAttrs.type = "text";
                        } else {
                            inputAttrs.onValueChange = this.updateNumericHandler(`${field}[${i}].objective`);
                            inputAttrs.type = "numeric";
                        }
                        return (
                            <tr key={`${field}_${i}`}>
                                {
                                    (i === 0) &&
                                    <>
                                        <td rowSpan={rowSpan}>
                                            <div className={styles.title_container}>
                                                <div className={styles.row_name_container}>
                                                    <FieldName name={rowTitle}/>
                                                </div>
                                                <div className={styles.help_container}>
                                                    <Tooltip content={help} position={Position.TOP}>
                                                        <HelpIcon className={styles.help_icon}/>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                        <td rowSpan={rowSpan}>
                                            {
                                                this.state.editMode && isControlled &&
                                                <RenderControls
                                                    type="add"
                                                    onClick={() => arrayHelpers.push(this.getEmptyRowObject(comment))}
                                                    className={styles.controls}
                                                />
                                            }
                                        </td>
                                    </>
                                }
                                <td>
                                    {
                                        this.state.editMode && isControlled &&
                                        <RenderControls
                                            type="delete"
                                            onClick={() => this.removeRow(values[field], arrayHelpers, i)}
                                            className={styles.controls}
                                        />
                                    }
                                </td>
                                <td className={styles.column_align_center}>
                                    {
                                        this.state.editMode
                                            ? <FormikInput
                                                name={`${field}[${i}].objective`}
                                                {...inputAttrs}
                                            />
                                            : <FieldValue value={this.emptyToZero(row.objective)}/>
                                    }
                                </td>
                                <td className={styles.column_align_center}>
                                    {
                                        isActualEditable
                                            ? <FormikInput
                                                type="text"
                                                name={`${field}[${i}].actual`}
                                            />
                                            : <FieldValue value={this.emptyToZero(row.actual)}/>
                                    }
                                </td>
                                {
                                    (i === 0) &&
                                    <td rowSpan={rowSpan} className={styles.column_align_center}>
                                        {
                                            this.state.editMode
                                                ? <FormikInput
                                                    type="textarea"
                                                    name={`${field}[${i}].comment`}
                                                />
                                                : <Comment value={comment}/>
                                        }
                                    </td>
                                }
                            </tr>
                        )
                    })
                }
                }/>
        )
    }

    isEditable = (field) => {
        if (field === "quality" || field === "defects" || field === "backlog") {
            return false;
        } else {
            return this.state.editMode;
        }
    };

    emptyToZero = (value) => {
        return value === "" ? 0 : value;
    }

    getEmptyRowObject = (comment) => ({
        rowNumber: 0,
        objective: 0,
        actual: 0,
        comment: comment
    });

    removeRow = (values, arrayHelpers, i) => {
        if (values.length === 1) {
            arrayHelpers.unshift(this.getEmptyRowObject());
            arrayHelpers.pop();
        } else {
            arrayHelpers.remove(i);
        }
    };
}

Quality.propTypes = {
    fieldsToRender: FieldsToRenderShape,
    qualityKpi: QualityIndicatorsShape,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
};