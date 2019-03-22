import React, { Component } from 'react';
import { Button, DatePicker, InputItem, List, Picker } from "antd-mobile";
import moment from 'moment';
import css from "./Form.module.scss";

export default class Form extends Component {
  state = {
    date: undefined,
    kind: undefined,
    volume: undefined
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.date && nextProps.feeding) {
      return nextProps.feeding;
    }
    return null;
  }

  render() {
    const { loading } = this.props;
    const { date, kind, volume } = this.state;
    return (
      <div className={css.wrapper}>
        <List className={css['form-list']}>
          <DatePicker
            title="시간"
            mode="time"
            format={d => moment(d).format('H시 m분')}
            value={date && new Date(date)}
            locale={{
              okText: '확인',
              dismissText: '취소',
              DatePickerLocale: {
                year: '년',
                month: '월',
                day: '일',
                hour: '시',
                minute: '분',
                am: '오전',
                pm: '오후'
              }
            }}
            extra="시간을 선택하세요."
            disabled={loading}
            onChange={this.onChangeDate}
          >
            <List.Item>시간</List.Item>
          </DatePicker>
          <Picker
            title="종류"
            value={kind && [kind]}
            data={[[
              { label: '모유', value: '모유' },
              { label: '분유', value: '분유' },
              { label: '수유', value: '수유' },
            ]]}
            locale={{
              okText: '확인',
              dismissText: '취소',
            }}
            cascade={false}
            extra="종류를 선택하세요."
            disabled={loading}
            onChange={this.onChangeKind}
          >
            <List.Item>종류</List.Item>
          </Picker>
          <InputItem
            type="money"
            defaultValue={volume || undefined}
            placeholder="먹은량을 입력하세요."
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={{ onTouchStart: e => e.preventDefault() }}
            locale={{ confirmLabel : '저장' }}
            disabled={loading}
            onChange={this.onChangeVolume}
          >
            먹은량(ml)
          </InputItem>
        </List>
        <div className={css['button-group']}>
          <Button
            className={css.submit}
            size="large"
            disabled={loading}
            onClick={this.onClickCancel}
          >
            취소
          </Button>
          <Button
            className={css.submit}
            type="primary"
            size="large"
            disabled={loading}
            loading={loading}
            onClick={this.onClickSubmit}
          >
            저장
          </Button>
        </div>
      </div>
    );
  }

  onChangeDate = (date) => {
    const base = moment(this.props.date);
    base.hour(moment(date).hour());
    base.minutes(moment(date).minutes());
    this.setState({ date : base.valueOf() });
  };

  onChangeKind = ([ kind ]) => {
    this.setState({ kind });
  };

  onChangeVolume = (volume) => {
    this.setState({ volume });
  };

  onClickCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };

  onClickSubmit = () => {
    const { date, kind, volume = 0 } = this.state;
    if (date && kind && this.props.onSubmit) {
      this.props.onSubmit({ date, kind, volume });
    }
  };
}
