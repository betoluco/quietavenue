import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import HamburgerMenu from '../HamburgerMenu';


it('HamburegerMenu links are diplayed and have the correct href property', async () =>{
    render(<HamburgerMenu/>, {wrapper:BrowserRouter});
    await userEvent.click(screen.getByRole('button', {name: 'menu button'}));
    expect(screen.getByRole('link', {name:'pointer Home'}).href).toMatch(new RegExp('http://[^\/]*/'));
    expect(screen.getByRole('link', {name:'pointer Schedule your free trial'}).href).toMatch(new RegExp('http://[^\/]*/workFlow'));
    expect(screen.getByRole('link', {name:'pointer How it works?'}).href).toMatch(new RegExp('http://[^\/]*/mission'));
    expect(screen.getByRole('link', {name:'pointer FAQ'}).href).toMatch(new RegExp('http://[^\/]*/FAQ'));
    expect(screen.getByRole('link', {name:'pointer Contact us'}).href).toMatch(new RegExp('http://[^\/]*/'));
});

it('HamburgerMenu button toggles to clossing button', async() =>{
    render(<HamburgerMenu/>, {wrapper:BrowserRouter});
    await userEvent.click(screen.getByRole('button', {name: 'menu button'}));
    expect(screen.queryByRole('button', {name: 'close menu'}))
    await userEvent.click(screen.getByRole('button', {name: 'close menu'}));
    expect(screen.queryByRole('button', {name: 'close menu'})).toBeNull();
});
