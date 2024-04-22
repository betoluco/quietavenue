import {it, expect } from 'vitest';
import {render, screen} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';

import HamburgerMenu from '../HamburgerMenu';


it('HamburegerMenu links are diplayed and have the correct href property', async () =>{
    render(<HamburgerMenu/>, {wrapper:BrowserRouter});    
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('link', {name:'pointer Home'}).href).toMatch(new RegExp('http://localhost:3000/'));
    expect(screen.getByRole('link', {name:'pointer Schedule your free trial'}).href).toMatch(new RegExp('http://localhost:3000/workFlow'));
    expect(screen.getByRole('link', {name:'pointer How it works?'}).href).toMatch(new RegExp('http://localhost:3000/mission'));
    expect(screen.getByRole('link', {name:'pointer FAQ'}).href).toMatch(new RegExp('http://localhost:3000/FAQ'));
    expect(screen.getByRole('link', {name:'pointer Contact us'}).href).toMatch(new RegExp('http://localhost:3000/'));
});

it('HamburgerMenu button toggles to clossing button', async() =>{
    render(<HamburgerMenu/>, {wrapper:BrowserRouter});
    expect(screen.queryByRole('button', {name: 'close menu'})).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'open menu'}));
    expect(screen.queryByRole('button', {name: 'close menu'})).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'close menu'}));
    expect(screen.queryByRole('button', {name: 'close menu'})).not.toBeInTheDocument();
});
