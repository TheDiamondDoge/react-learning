import {connect} from 'react-redux';
import {loadReport, resetReport} from "../../../actions/pws/report-tab";
import ReportTab from "./report-tab";
import {resetRequirements} from "../../../actions/pws/requirements-tab";
import {resetUserReports, saveUserReport} from "../../../actions/pws/user-reports";
import {withOnMountCall, withPwsTabNameUrlChanger} from "../../../util/HOCs";

function mapStateToProps(state) {
    return {
        report: state.pws.reportTab,
        rqs: state.pws.requirementsTab,
        userReports: state.pws.userReports
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => dispatch(loadReport()),
        resetData: () => {
            dispatch(resetReport());
            dispatch(resetRequirements());
            dispatch(resetUserReports())
        },
        saveData: (data) => dispatch(saveUserReport(data))
    }
}

const executeMethodsConfig = {
    onMount: "loadData",
    onUnmount: "resetData",
};

const ConnectedComponent = withOnMountCall(withPwsTabNameUrlChanger(ReportTab), executeMethodsConfig);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);