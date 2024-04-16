import {it, expect } from 'vitest';
import {render, screen} from "@testing-library/react";
import {BrowserRouter} from 'react-router-dom';

import Footer from '../Footer';

it('Footer links have the correct href property', () =>{
    render(<Footer/>, {wrapper:BrowserRouter});
    expect(screen.getByRole('link', {name:'Home'}).href).toMatch('http://localhost:3000/');
    expect(screen.getByRole('link', {name:'Schedule your free trial'}).href).toMatch('http://localhost:3000/workFlow');
    expect(screen.getByRole('link', {name:'How it works?'}).href).toMatch('http://localhost:3000/mission');
    expect(screen.getByRole('link', {name:'FAQ'}).href).toMatch('http://localhost:3000/FAQ');
    expect(screen.getByRole('link', {name:'Contact us'}).href).toMatch('http://localhost:3000/');
});
