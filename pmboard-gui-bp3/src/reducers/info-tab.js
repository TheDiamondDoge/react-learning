import {LOAD_INFO, LOAD_INFO_FAIL, LOAD_INFO_SUCCESS, RESET_STATE, SAVE_INFO_DATA} from '../actions/info-tab';

const initState = {
    loading: true,
    payload: {}
};

export default (state, action) => {
    if (state === undefined){
        return initState;
    }

    switch (action.type) {
        case LOAD_INFO:
            return {
                ...state,
                loading: true,
            };
        case LOAD_INFO_SUCCESS:
            return {
                ...state,
                payload: dataComposer(action.data),
                loading: false,
            };
        case LOAD_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SAVE_INFO_DATA:
            return {
                ...state
            };
       case RESET_STATE:
            return initState;
        default:
            return state;
    }
}

let dataComposer = (data) => ({
    general: {
        projectDescription: data.projectDescription,
        oemPartner: data.oemPartner,
        productRelease: data.productRelease,
        projectType: data.projectType,
        projectRigor: data.projectRigor,
        projectState: data.projectState,
        businessDivision: data.businessDivision,
        businessUnit: data.businessUnit,
        productLine: data.productLine,
        productName: data.productName,
        sponsor: data.sponsor,
        businessLineManager: data.businessLineManager,
        productLineManager: data.productLineManager,
        projectManager: data.projectManager,
        charter: data.charter,
        orBusinessPlan: data.orBusinessPlan,
        updatedBusinessPlan: data.updatedBusinessPlan,
        drChecklist: data.drChecklist,
        lessonsLearned: data.lessonsLearned,
        metricsScope: data.metricsScope,
        rqRelease: data.rqRelease,
        ecmaBacklogTarget: data.ecmaBacklogTarget,
        composite: data.composite,
    },
    milestones: data.milestones,
    urls: {
        projectCollabUrl: data.projectCollabUrl,
        projectPWASiteUrl: data.projectPWASiteUrl,
        docRepositoryUrl: data.projectPWASiteUrl,
        defectsUrl: data.defectsUrl,
        requirementsUrl: data.requirementsUrl,
        cisUrl: data.cisUrl,
    },
    validationParams: {
        projectType: data.projectType,
    }
});