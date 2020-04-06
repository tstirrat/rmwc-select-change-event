import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Select } from '@rmwc/select';

export function actOnNextFrame(callback) {
  return act(
    async () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          callback();
          resolve();
        });
      })
  );
}

test('fires onChange', async () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <Select
      onChange={(e) => {
        console.log('onChange', e);
        onChange(e.currentTarget.value);
      }}
      label="My select"
      value={'true'}
      options={['true', 'false']}
    />
  );

  const label = getByText('My select');
  const wrapper = label.closest('.mdc-select');
  const select = wrapper.querySelector('select');

  await actOnNextFrame(() => {
    fireEvent.change(select, {
      currentTarget: { selectedIndex: 1, value: 'false' },
      target: { selectedIndex: 1, value: 'false' },
    });
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('false');
});
