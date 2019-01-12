import React from "react";
import PropTypes from "prop-types";
import build from "../mapBuilder";
import defaults from "../libs/defaults";

class HMap extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = { builder: {} };
  }

  async componentDidMount() {
    const {
      appId,
      appCode,
      mapType,
      useEvents,
      interactive,
      includeUI,
      mapEvents,
      mapOptions
    } = this.props;
    const builder = await build({
      appId,
      appCode,
      mapType,
      useEvents,
      interactive,
      includeUI,
      mapEvents,
      mapOptions,
      container: this.container.current,
      build: true
    });

    this.setState({ builder });
  }
  createLoadingComponent() {
    return <div>Loading</div>;
  }
  displayChildren() {
    const { children } = this.props;
    const builder = this.state.builder;
    return React.Children.map(children, child =>
      React.cloneElement(child, { map: builder.map || {} })
    );
  }
  render() {
    const { style, loadingEl } = this.props;
    const loading = loadingEl || this.createLoadingComponent();

    return (
      <div
        id={defaults.containerId}
        className={defaults.defaultClassName}
        style={style}
        ref={this.container}
      >
        {typeof H === "undefined" && loading}
        {typeof H === "object" && this.displayChildren()}
      </div>
    );
  }
}

HMap.propTypes = {
  version: PropTypes.string,
  appId: PropTypes.string.isRequired,
  appCode: PropTypes.string.isRequired,
  mapType: PropTypes.string,
  useEvents: PropTypes.bool,
  interactive: PropTypes.bool,
  includeUI: PropTypes.bool,
  mapEvents: PropTypes.object,
  mapOptions: PropTypes.object
};

export default HMap;