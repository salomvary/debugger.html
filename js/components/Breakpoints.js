/* globals URL gThreadClient */

const React = require("react");
const dom = React.DOM;
const { connect } = require("react-redux");
const { getSources } = require("../queries");

require("./Breakpoints.css");

const Breakpoints = React.createClass({

  render() {
    function onResumeClick() {
      console.log("click")
      gThreadClient.resume();
    }

    function getFilenameFromSources(sources, actor) {
      const source = sources[actor];
      const url = new URL(source.url);
      const filename = url.pathname.substring(
        url.pathname.lastIndexOf("/") + 1);
      return filename;
    }

    return dom.div(
      { className: "breakpoints" },
      dom.button({ onClick: onResumeClick }, "resume"),
      dom.ul(
        null,
        this.props.breakpoints.map(bp => dom.li(
          null,
          getFilenameFromSources(this.props.sources, bp.location.actor)
            + ", line " + bp.location.line)
        )
      )
    );
  }
});

module.exports = connect(
  (state, props) => ({ sources: getSources(state)})
)(Breakpoints);
