/**
 * @jest-environment jsdom
 */
import React from 'react';
import {render} from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import NotFound from "./NotFound";
 
test('NotFound component renders all elements', () => {
    const component = render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );
    component.getByRole("link", {name: "logo QuietAvenue"});
    component.getByRole("img", {name: "logo"});
    component.getByRole("heading", {name: "QuietAvenue"});
    component.getByRole("button", {name:"Menu"});
    component.getByRole("heading", {name: "Ooops!, not found"});
    component.getByRole("heading", {name: "To go home click here"});
    component.getByRole("link", {name: "here"});
});

test("logo and name links to home", () =>{
    const component = render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );
    expect(component.getByRole("link", {name: "logo QuietAvenue"})).toHaveProperty("href", "http://localhost/");
});

test("To go home click here link to home", () =>{
    const component = render(
        <MemoryRouter>
            <NotFound />
        </MemoryRouter>
    );
    expect(component.getByRole("link", {name: "here"})).toHaveProperty("href", "http://localhost/");
});