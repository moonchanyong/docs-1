import * as React from 'react';
import { render } from '@testing-library/react';
import { LEFT_NAV_LINKS, RIGHT_NAV_LINKS } from '@/utils/globalnav';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';

describe('GlobalNav', () => {
  const component = (
    <GlobalNav
      leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
      rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
      currentSite="Docs"
      isGen2={false}
      mainId="pageMain"
    ></GlobalNav>
  );

  it('should render the GlobalNav component', async () => {
    render(component);
  });
});