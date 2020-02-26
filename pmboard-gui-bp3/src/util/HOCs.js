import React from 'react';

export function withOnMountCall(Component, config) {
    return class extends React.Component {
        componentDidMount() {
            this.props[config.onMount]();
        }

        componentWillUnmount() {
            this.props[config.onUnmount]();
        }

        render() {
            return <Component {...this.props}/>
        }
    }
}

export function withPwsTabNameUrlChanger(Component) {
    return class extends React.Component {
        componentDidMount() {
            const tabId = this.props.tabId;
            if (tabId) {
                const urlParams = new URLSearchParams(window.location.search);
                const urlBase = window.location.pathname;
                urlParams.set("tab", tabId);

                const url = `${urlBase}?${urlParams.toString()}`;
                window.history.pushState("Tabs", `${tabId} tab`, url);
            }
        }

        render() {
            const {tabId, ...others} = this.props;
            return <Component {...others}/>;
        }
    }
}