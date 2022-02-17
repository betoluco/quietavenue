/**
 * @jest-environment jsdom
 */
 
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router';

import HamburgerMenu from './HamburgerMenu';


test("HamburgerMenu closes on click close button", () =>{
    render(
        <MemoryRouter>
            <HamburgerMenu />
        </MemoryRouter>
    );
    expect(screen.queryByRole("list", {name: ""})).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", {name: "menu button"}));
    expect(screen.queryByRole("list", {name: ""})).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", {name:"close menu"}));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    
});

test("HamburgerMenu closes on click Home list items", () =>{
    render(
        <MemoryRouter>
            <HamburgerMenu />
        </MemoryRouter>
    );
    expect(screen.queryByRole("list", {name: ""})).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", {name: "menu button"}));
    expect(screen.queryByRole("list", {name: ""})).toBeInTheDocument();
    userEvent.click(screen.getByRole("link", {name: "Home"}));
    expect(screen.queryByRole("list", {name: ""})).not.toBeInTheDocument();
});

test("HamburgerMenu closes on click For Agents list items", () =>{
    render(
        <MemoryRouter>
            <HamburgerMenu />
        </MemoryRouter>
    );
    expect(screen.queryByRole("list", {name: ""})).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", {name: "menu button"}));
    expect(screen.queryByRole("list", {name: ""})).toBeInTheDocument();
    userEvent.click(screen.getByRole("link", {name: "For Agents"}));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("HamburgerMenu closes on click For Prospective Buyers list items", () =>{
    render(
        <MemoryRouter>
            <HamburgerMenu />
        </MemoryRouter>
    );
    expect(screen.queryByRole("list", {name: ""})).not.toBeInTheDocument();
    userEvent.click(screen.getByRole("button", {name: "menu button"}));
    expect(screen.queryByRole("list", {name: ""})).toBeInTheDocument();
    userEvent.click(screen.getByRole("link", {name: "For Prospective Buyers"}));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
});