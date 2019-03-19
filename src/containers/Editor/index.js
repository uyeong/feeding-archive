import React from 'react';
import { Picker, InputItem, DatePicker, List, Button } from 'antd-mobile';
import css from './Editor.module.scss';

const Editor = () => (
  <section className={css.wrapper}>
    <div className={css['input-wrap']}>
      <List>
        <DatePicker
          mode="time"
          format="HH:mm"
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
          title="시간"
          extra="시간을 선택하세요."
        >
          <List.Item>시간</List.Item>
        </DatePicker>
        <Picker
          data={[[
            { label: '모유', value: 0 },
            { label: '분유', value: 1 },
            { label: '수유', value: 2 },
          ]]}
          locale={{
            okText: '확인',
            dismissText: '취소',
          }}
          title="종류"
          cascade={false}
          extra="종류를 선택하세요."
        >
          <List.Item>종류</List.Item>
        </Picker>
        <InputItem
          type="money"
          placeholder="먹은량을 입력하세요."
          clear
          moneyKeyboardAlign="left"
          moneyKeyboardWrapProps={{
            onTouchStart: e => e.preventDefault()
          }}
          locale={{ confirmLabel : '저장' }}
        >먹은량(ml)</InputItem>
      </List>
    </div>
    <Button
      className={css.submit}
      type="primary"
      size="large"
    >
      저장
    </Button>
  </section>
);

export default Editor;
