import React from 'react';
import CustomCard from "../../card/custom-card";
import EnchantedTable from "../../enchanted-table/enchanted-table";
import PropTypes from 'prop-types';
import tableConfig from './table-config';
import LoadingSpinner from "../../loading-spinner/loading-spinner";
import {RqsTabRq} from "../../../util/custom-types";

export default class RequirementsTab extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    componentWillUnmount() {
        this.props.resetData();
    }

    render() {
        const {loading} = this.props.rqs;
        if (loading) {
            return <CustomCard><LoadingSpinner/></CustomCard>
        } else {
            const {payload} = this.props.rqs;
            return (
                <CustomCard autosize>
                    <EnchantedTable
                        striped
                        interactive
                        bordered
                        data={payload}
                        columns={tableConfig}
                    />
                </CustomCard>
            );
        }
    }
}

RequirementsTab.propTypes = {
    loadData: PropTypes.func.isRequired,
    resetData: PropTypes.func.isRequired,
    rqs: PropTypes.shape({
        loading: PropTypes.bool,
        payload: RqsTabRq
    }),
};