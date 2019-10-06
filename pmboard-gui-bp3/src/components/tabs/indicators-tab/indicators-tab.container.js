import {connect} from 'react-redux';
import IndicatorsTab from "./indicators-tab";
import {loadIndicators} from "../../../actions/indicators-tab";

function mapStateToProps(state){
    return {
        milestones: state.indicatorsTab.milestones,
        healthIndicators: state.indicatorsTab.healthIndicators,
        requirements: state.indicatorsTab.requirements,
        loaded: state.indicatorsTab.loaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadData: () => dispatch(loadIndicators())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsTab);