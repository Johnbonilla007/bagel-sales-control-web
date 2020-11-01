import React from 'react';
import { shallow } from 'enzyme';

import TableControl from '../index';

const props = {
  items: [
    {
      test: 'z',
    },
  ],
  columns: [
    {
      name: 'test',
      fieldName: 'test',
      onRender: () => 'test',
      isFrozen: true,
      width: 100,
    },
    {
      name: 'test',
      fieldName: 'test',
      onRender: null,
      maxWidth: 150,
    },
  ],
};

describe('<TableControl />', () => {
  it('Expect to render ReactTableFixedColumns', () => {
    const wrapper = shallow(<TableControl {...props} />);
    expect(wrapper.find('.-striped').length).toEqual(1);
  });

  // it('Expect to onRender to be called', () => {

  //   shallow(<TableControl {...props} />);
  //   expect(onRender).toHaveBeenCalled();
  // });

  it('Expect not to reder nothing', () => {
    shallow(<TableControl {...props} items={null} />);
    expect(true).toEqual(true);
  });
});
