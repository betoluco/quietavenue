import {it, expect} from 'vitest';
import {render, screen} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import {BrowserRouter} from 'react-router-dom';

import Card from '../Card';

const estate = {
    "url": "/estate/2/CA/-Foster-City/2141-Mills-Ave",
    "profilePicture": "/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg" ,
    "address1": "2141 Mills Ave",
    "address2": "Foster City CA 94044"
};

it('Card render all correnctly', () =>{
    render(<Card estate={estate} />, {wrapper:BrowserRouter});
    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost:3000/estate/2/CA/-Foster-City/2141-Mills-Ave');
    expect(screen.getByRole('heading', {name: "2141 Mills Ave"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "Foster City CA 94044"})).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg');
});