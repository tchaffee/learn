import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch
  );

const propTypes = {
};

export class ToolPanel extends PureComponent {
  render() {
    return (
      <div className='tool-panel-group project-tool-panel'>
        <Button
          block={true}
          bsStyle='primary'
          className='btn-primary-invert'
          href='https://forum.spiraladder.com/'
          target='_blank'
          >
          Ask for help
        </Button>
      </div>
    );
  }
}

ToolPanel.displayName = 'ProjectToolPanel';
ToolPanel.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ToolPanel);

/**
 *
 * <Fragment>
        <ProjectForm isFrontEnd={isFrontEnd} openModal={openCompletionModal} />
        <ButtonSpacer />
        {guideUrl && (
          <Fragment>
            <Button
              block={true}
              bsStyle='primary'
              className='btn-primary-ghost btn-big'
              href={guideUrl}
              target='_blank'
              >
              Get a hint
            </Button>
            <ButtonSpacer />
          </Fragment>
        )}
        <Button
          block={true}
          bsStyle='primary'
          className='btn-primary-ghost btn-big'
          onClick={openHelpModal}
          >
          Ask for help on the forum
        </Button>
        <ButtonSpacer />
      </Fragment>
 */
