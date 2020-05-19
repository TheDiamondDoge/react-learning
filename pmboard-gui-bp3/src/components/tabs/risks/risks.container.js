import {connect} from "react-redux";
import {
    downloadRisks, getLastUploadedRisks,
    loadRisks,
    resetRisks,
    saveRisk,
    setErrorsShowedTrue,
    uploadRisks
} from "../../../actions/pws/risks/risks-tab";
import Risks from "./risks";
import {withPwsOnMountCall, withPwsTabNameUrlChanger} from "../../../util/HOCs";

function mapStateToProps(state) {
    return {
        defaults: state.pws.defaults,
        risks: state.pws.risks.tab,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: (projectId) => dispatch(loadRisks(projectId)),
        resetData: () => dispatch(resetRisks()),
        saveRisk: (projectId, data) => dispatch(saveRisk(projectId, data)),
        uploadRisksFile: (projectId, data) => dispatch(uploadRisks(projectId, data)),
        downloadRisks: (projectId, projectName) => dispatch(downloadRisks(projectId, projectName)),
        getLastUploadedFile: (projectId, projectName) => dispatch(getLastUploadedRisks(projectId, projectName)),
        setErrorsShowedTrue: () => dispatch(setErrorsShowedTrue())
    }
}

const executeMethodsConfig = {
    onMount: "loadData",
    onUnmount: "resetData",
};

const ConnectedComponent = withPwsOnMountCall(withPwsTabNameUrlChanger(Risks), executeMethodsConfig);

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedComponent);