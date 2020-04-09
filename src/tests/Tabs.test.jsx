import React from 'react';
import { render } from '@testing-library/react';
import Tab from './TabTest';

describe("<Tabs />", () => {
    it("스냅샷 테스트", () => {
        const utils = render(<Tab/>);
        expect(utils.container).toMatchSnapshot();
    });
    it('KRW , BTC , ETH 가 정상적으로 있는지 확인', () => {
        const utils = render(<Tab />);
        utils.getByText('KRW')
        utils.getByText('BTC');
        utils.getByText('ETH');
    });
})