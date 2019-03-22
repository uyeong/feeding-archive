import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Redirect } from "react-router-dom";
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import store from '../../flux/store';
import actions from '../../flux/actions';
import css from './Login.module.scss';

class Login extends Component {
  static getStores() {
    return [store];
  }

  static calculateState() {
    return store.getState();
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { user, processing } = this.state;
    let errors;
    return (
      <section className={css.wrapper}>
        {!user ? (
          <>
            <h1 className={css.title}>
              서비스 이용을 위해서<br/>
              로그인해주세요.
            </h1>
            <List renderHeader="이메일">
              <InputItem
                name="email"
                type="email"
                clear={true}
                disabled={processing.login}
                {...getFieldProps('email', {
                  rules: [
                    { required: true, message: '이메일을 입력해주세요.' },
                    { type: 'email', message: '유효한 이메일이 아닙니다.' },
                  ],
                })}
              />
              <p className={css.error}>{(errors = getFieldError('email')) ? errors.join(',') : null}</p>
            </List>
            <List renderHeader="비밀번호">
              <InputItem
                name="password"
                type="password"
                clear={true}
                disabled={processing.login}
                {...getFieldProps('password', {
                  rules: [
                    { required: true, message: '비밀번호를 입력해주세요.' },
                    { min: 8, message: '8자 이상 입력해주세요.' },
                  ],
                })}
              />
              <p className={css.error}>{(errors = getFieldError('password')) ? errors.join(',') : null}</p>
            </List>
            <Button
              className={css.submit}
              type="primary"
              size="large"
              disabled={processing.login}
              loading={processing.login}
              onClick={this.onClickSubmit}
            >
              로그인
            </Button>
          </>
        ) : (
          <Redirect to={from} />
        )}
      </section>
    )
  }

  onClickSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFields(async (error, { email, password }) => {
      if (!error) {
        try {
          await actions.login(email, password);
        } catch (error) {
          console.log(error);
          Toast.info('로그인에 실패했습니다.', 2);
        }
      }
    });
  };
}

export default createForm()(Container.create(Login));
