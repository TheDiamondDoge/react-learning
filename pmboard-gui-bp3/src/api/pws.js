import axios from 'axios';

export const getSummaryInfo = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/summary`)
);

export const getHealthIndicators = (projectID) => (
    axios.get(`http://localhost:8080/api/health/${projectID}`)
);

export const saveHealthIndicatorsPost = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/health/${projectID}`, payload)
);

export const getMilestones = (projectID, isShown) => (
    axios.get(`http://localhost:8080/api/milestones/${projectID}?isShown=${isShown}`)
);

export const saveMilestones = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/milestones/${projectID}`, payload)
);

export const getIndicatorsRqs = (projectID) => (
    axios.get(`http://localhost:8080/api/indicators/requirements/${projectID}`)
);

export const saveIndicatorsRqs = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/indicators/requirements/${projectID}`, payload)
);

export const getMilestonesKpi = (projectID) => (
    axios.get(`http://localhost:8080/api/indicators/milestones/${projectID}`)
);

export const getDr4Kpi = (projectID) => (
    axios.get(`http://localhost:8080/api/indicators/dr4/${projectID}`)
);

export const getQualityKpi = (projectID) => (
    axios.get(`http://localhost:8080/api/indicators/quality/${projectID}`)
);

export const saveQualityKpi = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/indicators/quality/${projectID}`, payload)
);

export const getInformationTab = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/information`)
);

export const saveInformationTab = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/information`, payload)
);

export const getContributableProjects = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/contrib`)
);

export const getBlcTabData = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/blc`)
);

export const saveBlcComments = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/blc/comments`, payload)
);

export const saveBlcIndicators = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/blc/indicators`, payload)
);

export const getRisks = (projectID, mini) => {
    if (mini) {
        return axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/risks/mini`);
    } else {
        return axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/risks`);
    }
};

export const saveRisks = (projectID, risk) => (
    axios.put(`http://localhost:8080/api/projects/${projectID}/tabs/risks`, risk)
);

export const uploadRisksFile = (projectID, file) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/risks`, file)
);

export const downloadRisksFile = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/risksFile`, {responseType: "blob"})
);

export const getRelatedRisksIds = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/risks/id`)
);

export const getActions = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/actions`)
);

export const saveAction = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/actions`, payload)
);

export const deleteAction = (uid) => (
    axios.delete(`http://localhost:8080/api/actions/${uid}`)
);

export const exportActions = (projectID) => (
    axios.get(`http://localhost:8080/api/actions/${projectID}/getFile`, {responseType: "blob"})
);

export const getCost = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/cost`)
);

export const uploadCost = (projectID, file) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/cost`, file)
);

export const getRequirements = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/rqs`)
);

export const getBacklogChart = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/backlog/chart`)
);

export const getDefectsChart = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/defects/chart`)
);

export const getReportTab = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/report`)
);

export const getSnapshotsData = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/snapshots_info`)
);

export const getUserReports = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/user_reports`)
);

export const saveUserReports = (projectID, payload) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/user_reports`, payload)
);

export const getContribTable = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/contrib`)
);

export const exportContribTable = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/getContribFile`, {responseType: "blob"})
);

export const getRisksLastUploadedFile = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/risks/lastUploaded`, {responseType: "blob"})
);

export const getCostLastUploadedFile = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/cost/lastUploaded`, {responseType: "blob"})
);

export const getProjectDefaults = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/defaults`)
);

export const getPptCustomFile = (projectID, type, snapshotId) => {
    let param = "";
    if (snapshotId) {
        param = `?reportId=${snapshotId}`;
    }
    return axios.get(`http://localhost:8080/api/export/ppt/${type}/${projectID}${param}`, {responseType: "blob"})
};

export const loadReportImages = (projectID) => (
    axios.get(`http://localhost:8080/api/projects/${projectID}/tabs/report/images`)
);

export const uploadReportImages = (projectID, file) => (
    axios.post(`http://localhost:8080/api/projects/${projectID}/tabs/report/images`, file)
);

export const deleteReportImage = (projectID, filename) => (
    axios.delete(`http://localhost:8080/api/projects/${projectID}/tabs/report/images/${filename}`)
);

export const getProjectsList = (isEpm, status) => (
    axios.get(`http://localhost:8080/api/projects/tableview?isEPM=${!!isEpm}&status=${status}`)
);