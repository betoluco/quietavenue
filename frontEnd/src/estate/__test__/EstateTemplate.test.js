import {it, expect, vi} from 'vitest';
import {render, screen} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';

import EstateTemplate from '../EstateTemplate'

it('Renders minimum elements', () =>{
    const estate = {
        "profilePicture": "/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg" ,
        "address1": "2141 Mills Ave",
        "address2": "Foster City CA 94044"
    };
    render(<EstateTemplate estate={estate} />);
    expect(screen.getByRole('heading', {name: "2141 Mills Ave Foster City CA 94044"})).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg');
});

it('Renders all elements', () =>{
    const estate = {
        "profilePicture": "/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg" ,
        "address1": "2141 Mills Ave",
        "address2": "Foster City CA 94044",
        "bathroom": 2.5,
        "bedroom": 3,
        "lotArea": 1346,
        "videoLink": "https://player.vimeo.com/video/826411325?h=3b090b7149&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
        "audioScore": 8,
        "audioDescription": "Some exaple text"
    };
    
    render(<EstateTemplate estate={estate} price={"$1,235,857"} graph={<h5>Graph</h5>}/>);
    expect(screen.getByRole('heading', {name: "2141 Mills Ave Foster City CA 94044"})).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-9440/2141-Mills-Ave-Foster-City-CA-94404-main-pic.jpg');
    expect(screen.getByRole('heading', {name: "2.5 bath"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "3 bed"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "1346 sq.ft. lot"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "$1,235,857"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "8 /10"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "Some exaple text"})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: "Graph"})).toBeInTheDocument();
});