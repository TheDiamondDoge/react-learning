import React from 'react';
import {HTMLTable} from "@blueprintjs/core";
import EditSaveControls from "../edit-save-contols/edit-save-controls";
import styles from "./requirements.module.css";
import classNames from "classnames";
import {FieldName} from "../field-name/field-name";
import FieldValue from "../field-value/field-value";
import PropTypes from 'prop-types';
import {dateFormatToString} from "../../util/transformFuncs";

export default class Requirements extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        };
    }

    onClickEdit = () => {
        this.setState(
            (prevState) => ({ editMode: !prevState.editMode })
        )
    };

    render() {
        let valueColumnClasses = classNames(styles.value_col, styles.column_align_center);
        const { addedAfterDr1, committedAtDr1, dr1Actual, modifiedAfterDr1, removedAfterDr1, sum } = this.props.requirements;
        return (
            <>
                <HTMLTable
                    className={styles.req_table}
                    striped={true}
                >
                    <colgroup>
                        <col className={styles.title_col} />
                        <col className={valueColumnClasses} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className={styles.table_header} colSpan={2}>
                                <EditSaveControls onClick={this.onClickEdit} editMode={this.state.editMode} smallSize={true} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><FieldName name={"DR1 date (actual)"}/></td>
                            <td><FieldValue value={ dateFormatToString(new Date(dr1Actual)) }/></td>
                        </tr>
                        <tr>
                            <td><FieldName name={"# Requirements committed (baseline) at DR1"}/></td>
                            <td><FieldValue value={ committedAtDr1 } onInput={this.onInput} editMode={this.state.editMode}/></td>
                        </tr>
                        <tr>
                            <td><FieldName name={"Current # of requirements added after DR1"}/></td>
                            <td><FieldValue value={ addedAfterDr1 } editMode={this.state.editMode}/></td>
                        </tr>
                        <tr>
                            <td><FieldName name={"Current # of baselined requirements removed after DR1"}/></td>
                            <td><FieldValue value={ removedAfterDr1 } editMode={this.state.editMode}/></td>
                        </tr>
                        <tr>
                            <td><FieldName name={"Current # of baselined requirements modified after DR1"}/></td>
                            <td><FieldValue value={ modifiedAfterDr1 } editMode={this.state.editMode}/></td>
                        </tr>
                        <tr>
                            <td><FieldName name={"Current # of scoped requirements"}/></td>
                            <td><FieldValue value={ sum }/></td>
                        </tr>
                    </tbody>
                </HTMLTable>
            </>
        )
    }

    onInput = (event) => {
        let str = "" + event.target.value;
        event.target.value = str.replace(/[^0-9]/gm, "");
    }
}

Requirements.propTypes = {
    requirements: PropTypes.object.isRequired,
};