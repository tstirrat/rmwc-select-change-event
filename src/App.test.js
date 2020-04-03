import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { Select } from '@rmwc/select';

test('renders learn react link', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <Select onChange={onChange} label="My select" options={['true', 'false']} />
  );

  act(() => {
    const label = getByText('My select');
    const wrapper = label.closest('.mdc-select');
    const select = wrapper.querySelector('select');
    fireEvent.change(select, {
      target: { value: 'false' }
    });
  });

  expect(onChange).toHaveBeenCalled();
});
