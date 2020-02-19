import React from 'react';
import {HTMLTable} from "@blueprintjs/core";
import {FieldName} from "../components/field-name/field-name";
import styles from "./legend.module.css";

export default class Legend extends React.PureComponent {
    render() {
        return (
            <div>
                <HTMLTable>
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <FieldName name="Legend"/>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={styles.bkground_grey}>
                            DR Committed
                        </td>
                        <td>Milestone date has passed and is 100% complete</td>
                    </tr>
                    <tr>
                        <td className={styles.bkground_red}>
                            DR Past Due
                        </td>
                        <td>Milestone date has passed but is not 100% complete</td>
                    </tr>
                    </tbody>
                </HTMLTable>
            </div>
        );
    }
}