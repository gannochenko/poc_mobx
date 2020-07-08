import React, { FunctionComponent, useState, useCallback } from 'react';

import {
    MenuRoot,
    Items,
    Item,
    Hamburger,
    Bar,
    Main,
    MobileItems,
    MobileItem,
} from './style';

import { Props } from './type';

export const Menu: FunctionComponent<Props> = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const onHamburgerClick = useCallback(() => {
        setMobileMenuOpen(!mobileMenuOpen);
    }, [mobileMenuOpen, setMobileMenuOpen]);
    const onMobileItemClick = useCallback(() => {
        setMobileMenuOpen(false);
    }, [setMobileMenuOpen]);

    return (
        <MenuRoot>
            <Main>
                <Items>
                    <Item to="/cookie-policy">Cookie policy</Item>
                </Items>
                <Hamburger onClick={onHamburgerClick}>
                    <Bar />
                    <Bar />
                    <Bar />
                </Hamburger>
            </Main>
            <MobileItems open={mobileMenuOpen}>
                <MobileItem to="/cookie-policy" onClick={onMobileItemClick}>
                    Cookie policy
                </MobileItem>
            </MobileItems>
        </MenuRoot>
    );
};
