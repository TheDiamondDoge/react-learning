import {WorkspaceStatus} from "../../util/constants";

let config = {
    controls: {
        label: "Sync Button",
        allowedIf: {
            workspaceStatus: [WorkspaceStatus.ENABLED]
        }
    },
    quality: {
        label: "Quality KPI",
        help: "Help for quality"
    },
    defects: {
        label: "New Open Defects",
        allowedIf: {
            maintenance: [false],
        },
        help: "Help for defects"
    },
    backlog: {
        label: "Backlog Reduction",
        help: "Help for backlog"
    },
    testExecution: {
        label: "Test execution (rate or number)",
        help: "Help for exec"
    },
    testRate: {
        label: "Test pass (rate or number)",
        help: "Help for pass"
    }
};

Object.defineProperty(config, "controls", {
    enumerable: false, configurable: true, writable: true
});

export default config;