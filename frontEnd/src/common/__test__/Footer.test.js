import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';

import Footer from '../Footer';

it('Footer home links have href property', () =>{
    render(<Footer/>, {wrapper:BrowserRouter});
    expect(screen.getByRole('link', {name:'Home'}).href).toMatch(new RegExp('http://[^\/]*/'));
    expect(screen.getByRole('link', {name:'Schedule your free trial'}).href).toMatch(new RegExp('http://[^\/]*/workFlow'));
    expect(screen.getByRole('link', {name:'How it works?'}).href).toMatch(new RegExp('http://[^\/]*/mission'));
    expect(screen.getByRole('link', {name:'FAQ'}).href).toMatch(new RegExp('http://[^\/]*/FAQ'));
    expect(screen.getByRole('link', {name:'Contact us'}).href).toMatch(new RegExp('http://[^\/]*/'));
});
