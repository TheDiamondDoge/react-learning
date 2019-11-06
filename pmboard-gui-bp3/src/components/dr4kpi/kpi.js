import React from 'react';
import {HTMLTable, Position, Tooltip} from "@blueprintjs/core";
import styles from "./kpi.module.css";
import classNames from "classnames";
import {FieldName} from "../field-name/field-name";
import PropTypes from "prop-types";
import {nullToNA} from "../../util/transformFuncs";
import HelpIcon from "../help-icon/help-icon";
import {FieldsToRenderShape, MilestoneKpiShape} from "../../util/custom-types";

export default class Kpi extends React.Component {
    render() {
        let headerClasses = classNames(styles.column_align_center, styles.border_top);
        const {dr4Kpi, fieldsToRender} = this.props;
        return (
            <HTMLTable
                className={styles.kpi_table}
                striped={true}
            >
                <colgroup>
                    <col className={styles.name_col}/>
                    <col className={styles.help_col}/>
                    <col className={styles.value_col}/>
                </colgroup>
                <thead>
                <tr>
                    <td colSpan={2}>
                        <FieldName name={fieldsToRender.year.label}/>
                    </td>
                    <td>{dr4Kpi.year}</td>
                </tr>
                <tr>
                    <td colSpan={3} className={headerClasses}>COMMITTED vs ACTUAL</td>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(fieldsToRender).map((field) => {
                        if (field === "year") return true;

                        const label = fieldsToRender[field].label;
                        const value = dr4Kpi[field];
                        const help = fieldsToRender[field].help;
                        return (
                            <tr key={field}>
                                <td>
                                    <FieldName name={label}/>
                                </td>
                                <td>
                                    <Tooltip
                                        content={help}
                                        position={Position.TOP}
                                    >
                                        <HelpIcon />
                                    </Tooltip>
                                </td>
                                <td>{nullToNA(value)}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </HTMLTable>
        )
    }
}

Kpi.propTypes = {
    dr4Kpi: PropTypes.object.isRequired,
    fieldsToRender: PropTypes.object.isRequired,
};