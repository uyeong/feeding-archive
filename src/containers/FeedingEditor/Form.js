import React, { useState, useCallback } from 'react';
import { Button, DatePicker, InputItem, List, Picker } from "antd-mobile";
import moment from 'moment';
import css from "./Form.module.scss";

const Form = ({ current, feeding = {}, loading, onCancel, onSubmit }) => {
  const [ date, setDate ] = useState(feeding.date);
  const [ kind, setKind ] = useState(feeding.kind);
  const [ volume, setVolume ] = useState(feeding.volume);
  const fnOnChangeDate = useCallback((date) => {
    const base = moment(current);
    base.hour(moment(date).hour());
    base.minutes(moment(date).minutes());
    setDate(base.valueOf());
  }, []);
  const fnOnChangeKind = useCallback(([ kind ]) => setKind(kind), []);
  const fnOnChangeVolume = useCallback((v) => setVolume(v), []);
  const fnOnClickSubmit = useCallback(() => {
    if (date && kind && onSubmit) {
      onSubmit({ date, kind, volume: parseInt(volume, 10) });
    }
  }, [ date, kind, volume ]);
  if (date === undefined && Object.keys(feeding).length > 0) {
    setDate(feeding.date);
    setKind(feeding.kind);
    setVolume(feeding.volume);
  }
  return (
    <div className={css.wrapper}>
      <List className={css['form-list']}>
        <DatePicker
          title="시간"
          mode="time"
          format={d => moment(d).format('HH:mm')}
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
          onChange={fnOnChangeDate}
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
          onChange={fnOnChangeKind}
        >
          <List.Item>종류</List.Item>
        </Picker>
        <InputItem
          type="money"
          value={volume || undefined}
          placeholder="먹은량을 입력하세요."
          clear
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={{ onTouchStart: e => e.preventDefault() }}
          locale={{ confirmLabel : '저장' }}
          disabled={loading}
          onChange={fnOnChangeVolume}
        >
          먹은량(ml)
        </InputItem>
      </List>
      <div className={css['button-group']}>
        <Button
          className={css.submit}
          size="large"
          disabled={loading}
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          className={css.submit}
          type="primary"
          size="large"
          disabled={loading}
          loading={loading}
          onClick={fnOnClickSubmit}
        >
          저장
        </Button>
      </div>
    </div>
  );
};

export default Form;
