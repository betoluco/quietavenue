import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';

import Card from '../Card';

const estate = {
    "url": "/estate/2/CA/-Foster-City/2141-Mills-Ave",
    "profilePicture": "/assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg" ,
    "address1": "2141 Mills Ave",
    "address2": "Foster City CA 94044"
};

it('link should have href', () =>{
    render(<Card estate={estate} />, {wrapper:BrowserRouter});
    expect(screen.getByRole('link').href).toMatch(new RegExp('http://[^\/]*/estate/2/CA/-Foster-City/2141-Mills-Ave'));
});

it('Image should have src', () =>{
    render(<Card estate={estate} />, {wrapper:BrowserRouter});
    expect(screen.getByRole('img').src).toMatch(new RegExp('http://[^\/]*/assets/2141-Mills-Ave-Foster-City-CA-94404/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg'));
});

it('Card componet renders all required information', () =>{
    render(<Card estate={estate} />, {wrapper:BrowserRouter});
    expect(screen.getByRole('heading', {name: "2141 Mills Ave"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "Foster City CA 94044"})).toBeInTheDocument();
});