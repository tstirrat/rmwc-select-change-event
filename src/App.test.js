import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Select } from '@rmwc/select';

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

  await act(() => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        fireEvent.change(select, {
          currentTarget: { value: 'false' },
        });
        resolve();
      });
    });
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith('false');
});
