import React from 'react';
import {HTMLTable} from "@blueprintjs/core";
import {FieldName} from "../field-name/field-name";
import FieldValue from "../field-value/field-value";
import styles from './milestone-table.module.css';
import PropTypes from "prop-types";
import {FieldArray} from "formik";
import FormikInput, {RenderControls} from "../mini-input-renderers/mini-input-renderers";
import {dateFormatToString} from "../../util/transformFuncs";

//TODO: Validation at least for dates
//TODO: Block OR edition and DR0-DR1 baseline
//TODO: if user will add new milestone with label of mandatory -> it will be blocked in UI (need to fix)
export default class MilestoneTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mandatoryMilesLabels: ["OR", "DR0", "DR1", "DR2", "DR3", "DR4", "OBR", "CI"],
        };
    }

    render() {
        return (
            <div>
                <HTMLTable striped={true} className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.label}>
                            <FieldName name={"Project Milestone Label"}/>
                        </th>
                        <th className={styles.actual}>
                            <FieldName name={"Actual/Forecast Date"}/>
                        </th>
                        <th className={styles.baseline}>
                            <FieldName name={"Baseline Date"}/>
                        </th>
                        <th className={styles.completion}>
                            <FieldName name={"Milestone Completion (%)"}/>
                        </th>
                        <th className={styles.timeline}>
                            <FieldName name={"Shown in Timeline"}/>
                        </th>
                        <th className={styles.minutes}>
                            <FieldName name={"Milestone meeting minutes"}/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.renderBody()
                    }
                    </tbody>
                </HTMLTable>
            </div>
        )
    }

    renderBody = () => {
        const {milestonesData, onDateChangeFactory, editMode} = this.props;
        return (
            <FieldArray
                name="milestones"
                render={(arrayHelpers) => {
                    return (
                        <>
                            {
                                milestonesData.map((milestone, key) => {
                                    const shownString = this.isChecked(milestone.shown);
                                    return (
                                        <tr key={key}>
                                            <td className={styles.label}>
                                                {
                                                    editMode
                                                        ? this.isMandatory(milestone.label)
                                                        ? <FieldValue value={milestone.label}/>
                                                        : <>
                                                            <FormikInput
                                                                type="text"
                                                                name={`milestones[${key}].label`}
                                                            />
                                                            {
                                                                this.rowRemoveControls(() => arrayHelpers.remove(key))
                                                            }
                                                        </>
                                                        : <FieldValue value={milestone.label}/>
                                                }
                                            </td>
                                            <td className={styles.actual}>
                                                {
                                                    editMode
                                                        ? <FormikInput
                                                            type="date"
                                                            name={`milestones[${key}].actualDate`}
                                                            onChange={onDateChangeFactory(`milestones[${key}].actualDate`)}
                                                        />
                                                        : <FieldValue
                                                            value={dateFormatToString(new Date(milestone.actualDate))}/>
                                                }
                                            </td>
                                            <td className={styles.baseline}>
                                                {
                                                    editMode
                                                        ? <FormikInput
                                                            type="date"
                                                            name={`milestones[${key}].baselineDate`}
                                                            onChange={onDateChangeFactory(`milestones[${key}].baselineDate`)}
                                                        />
                                                        : <FieldValue
                                                            value={dateFormatToString(new Date(milestone.baselineDate))}/>
                                                }
                                            </td>
                                            <td className={styles.completion}>
                                                {
                                                    editMode
                                                        ? <FormikInput
                                                            type="numeric"
                                                            name={`milestones[${key}].completion`}
                                                            onValueChange={onDateChangeFactory(`milestones[${key}].completion`)}
                                                        />
                                                        : <FieldValue value={milestone.completion}/>
                                                }
                                            </td>
                                            <td className={styles.timeline}>
                                                {
                                                    editMode
                                                        ? <FormikInput
                                                            type="checkbox"
                                                            name={`milestones[${key}].shown`}
                                                            value={milestone.shown}
                                                        />
                                                        : <FieldValue value={shownString}/>
                                                }
                                            </td>
                                            <td className={styles.minutes}>
                                                {
                                                    editMode
                                                        ? <FormikInput
                                                            type="text"
                                                            name={`milestones[${key}].meetingMinutes`}
                                                        />
                                                        : <FieldValue value={milestone.meetingMinutes}/>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {
                                editMode &&
                                <tr>
                                    <td colSpan={6} className={styles.align_center}>
                                        {this.rowAddControls(arrayHelpers.push)}
                                    </td>
                                </tr>
                            }
                        </>
                    )
                }}
            />
        )
    };

    isMandatory = (label) => (
        this.state.mandatoryMilesLabels.includes(label.toUpperCase())
    );

    rowRemoveControls = (remove) => (
        <RenderControls type={"delete"} onClick={remove}/>
    );

    rowAddControls = (push) => (
        <RenderControls type={"add"} onClick={() => push(this.getEmptyMilestone())}/>
    );

    getEmptyMilestone = () => ({
        label: "",
        actualDate: "",
        baselineDate: "",
        completion: "",
        shown: false,
        meetingMinutes: ""
    });

    isChecked = (checked) => (
        checked ? "Yes" : "No"
    );
}

MilestoneTable.propTypes = {
    editMode: PropTypes.bool,
    milestonesData: PropTypes.array,
    onChange: PropTypes.func,
};