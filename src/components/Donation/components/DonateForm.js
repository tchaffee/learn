import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';

import CardForm from './CardForm';
import { injectStripe } from 'react-stripe-elements';
import { postJSON$ } from '../../../templates/Challenges/utils/ajax-stream';

const propTypes = {
  coupon: PropTypes.string,
  email: PropTypes.string,
  maybeButton: PropTypes.func.isRequired,
  renderCompletion: PropTypes.func.isRequired,
  stripe: PropTypes.shape({
    createToken: PropTypes.func.isRequired
  })
};
const initialSate = {
  donationAmount: 500,
  donationState: {
    processing: false,
    success: false,
    error: ''
  }
};

class DonateForm extends PureComponent {
  constructor(...args) {
    super(...args);
    const [props] = args;

    this.state = {
      ...initialSate,
      email: props.email,
      coupon: null
    };

    this.buttonAmounts = [500, 1000, 3500, 5000, 25000];

    this.handleAmountClick = this.handleAmountClick.bind(this);
    this.handleCouponChange = this.handleCouponChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isActive = this.isActive.bind(this);
    this.renderAmountButtons = this.renderAmountButtons.bind(this);
    this.postDonation = this.postDonation.bind(this);
    this.resetDonation = this.resetDonation.bind(this);
  }

  handleAmountClick(e) {
    e.preventDefault();
    const donationAmount = parseInt(e.target.id, 10);
    return this.setState(state => ({
      ...state,
      donationAmount
    }));
  }

  handleCouponChange(e) {
    const newValue = e.target.value;
    return this.setState(state => ({
      ...state,
      coupon: newValue
    }));
  }

  handleEmailChange(e) {
    const newValue = e.target.value;
    return this.setState(state => ({
      ...state,
      email: newValue
    }));
  }

  handleSubmit(isCardDataValid) {
    const { email, coupon } = this.state;
    if (!email || !isEmail(email)) {
      return this.setState(state => ({
        ...state,
        donationState: {
          ...state.donationState,
          error:
            'We need a valid email address to send your receipt'
        }
      }));
    }

    console.log(this.state.donationState);

    // No credit card data and we do have a coupon.
    if (!isCardDataValid && coupon && coupon.length > 0) {
      let token = {
        email,
        coupon
      };
      return this.postDonation(token);
    } else {

      return this.props.stripe.createToken({ email, coupon })
        .then(({ error, token }) => {
          if (error) {
            return this.setState(state => ({
              ...state,
              donationState: {
                ...state.donationState,
                error:
                  'Something went wrong processing your donation. Your card' +
                  ' has not been charged.'
              }
            }));
          }
          return this.postDonation(token);
        });
    }
  }

  isActive(amount) {
    return this.state.donationAmount === amount;
  }

  postDonation(token) {
    const { donationAmount: amount } = this.state;
    this.setState(state => ({
      ...state,
      donationState: {
        ...state.donationState,
        processing: true
      }
    }));
    return postJSON$('/external/donate/charge-stripe', {
      token,
      amount
    }).subscribe(
      res =>
        this.setState(state => ({
          ...state,
          donationState: {
            ...state.donationState,
            processing: false,
            success: true,
            error: res.error
          }
        })),
      err =>
        this.setState(state => ({
          ...state,
          donationState: {
            ...state.donationState,
            processing: false,
            success: false,
            error: err.error
          }
        }))
    );
  }

  renderAmountButtons() {
    return this.buttonAmounts.map(amount => (
      <li key={'amount-' + amount}>
        <a
          className={`amount-value ${this.isActive(amount) ? 'active' : ''}`}
          href=''
          id={amount}
          onClick={this.handleAmountClick}
          tabIndex='-1'
          >{`R$${amount / 100}`}</a>
      </li>
    ));
  }

  renderDonateForm() {
    return (
      <Fragment>
        <p>
          During our beta you can pay what you want for Spiraladder. Set up a
          monthly subscription (Brazilian Currency only) now to help us create
          more lessons for you.
        </p>
        <div id='donate-amount-panel'>
          <ul>{this.renderAmountButtons()}</ul>
        </div>
        {this.renderEmailInput()}
        {this.renderCouponInput()}
        <CardForm
          amount={this.state.donationAmount / 100}
          coupon={this.state.coupon}
          handleSubmit={this.handleSubmit}
        />
        {this.props.maybeButton()}
      </Fragment>
    );
  }

  renderCouponInput() {
    const { coupon } = this.state;
    return (
      <div className='donation-coupon-container'>
        <label>
          Get a coupon from our help chat so you don't have to pay:
          <input
            onChange={this.handleCouponChange}
            placeholder='coupon-code'
            required={false}
            type='text'
            value={coupon}
          />
        </label>
      </div>
    );
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <div className='donation-email-container'>
        <label>
          Email where we should send your receipt:
          <input
            onChange={this.handleEmailChange}
            placeholder='email@example.com'
            required={true}
            type='email'
            value={email}
          />
        </label>
      </div>
    );
  }

  resetDonation() {
    return this.setState(() => initialSate);
  }

  render() {
    const { donationState: { processing, success, error } } = this.state;
    const { renderCompletion } = this.props;
    if (processing || success || error) {
      return renderCompletion({
        processing,
        success,
        error,
        reset: this.resetDonation
      });
    }
    return this.renderDonateForm();
  }
}

DonateForm.displayName = 'DonateForm';
DonateForm.propTypes = propTypes;

export default injectStripe(DonateForm);
