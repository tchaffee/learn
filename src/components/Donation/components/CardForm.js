import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

import StripCardForm from './StripeCardForm';

const propTypes = {
  amount: PropTypes.number.isRequired,
  coupon: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

class CardForm extends PureComponent {
  constructor(...props) {
    super(...props);

    this.state = {
      isFormValid: false
    };

    this.getValidationState = this.getValidationState.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.isFormValid);
  }

  getValidationState(isFormValid) {
    this.setState(state => ({
      ...state,
      isFormValid
    }));
  }

  render() {
    const { amount, coupon } = this.props;
    const { isFormValid } = this.state;
    let stripeCardForm;

    let isFormEnabled = (coupon && coupon.length > 0) || isFormValid;

    if (coupon && (coupon.length > 0)) {
      stripeCardForm = null;
    } else {
      stripeCardForm = (<StripCardForm
        coupon={this.props.coupon}
        getValidationState={this.getValidationState}
      />);
    }

    return (
      <form className='donation-form' onSubmit={this.submit}>
        { stripeCardForm }
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          disabled={!isFormEnabled}
          type='submit'
          >
          {`Confirm Monthly Subscription of $${amount}`}
        </Button>
      </form>
    );
  }
}
CardForm.displayName = 'CardForm';
CardForm.propTypes = propTypes;

export default CardForm;
