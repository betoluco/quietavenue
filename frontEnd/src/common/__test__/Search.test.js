import {it, expect, vi } from 'vitest';
import {render, screen, fireEvent} from "@testing-library/react";
import  '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

import Search from '../Search';

it('Can write on form input element', async () =>{
    render(<Search/>, {wrapper:BrowserRouter});
    const input = screen.getByRole('textbox', {name: /search-input/i});
    expect(input).toHaveClass('focus:ring', 'focus:ring-green-600', 'focus:outline-none');
    await userEvent.type(input, 'ts');
    expect(input).toHaveProperty('value', 'ts');
    expect(input).toHaveFocus();
});

it('On form blur results disapear', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [],
                cities: [],
                zip_codes: []
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), 'on blur');
    expect(screen.queryByRole('listitem')).toBeInTheDocument();
    expect(screen.getByRole('listitem')).toHaveTextContent('No results');
    await fireEvent.blur(screen.getByRole('textbox', {name: /search-input/i}));
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /search-input/i})).toHaveProperty('value', 'on blur');
});

it('Results are fetch and shown after typing three chars', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [],
                cities: [],
                zip_codes: []
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), '1');
    expect(spy).not.toHaveBeenCalled();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), '2');
    expect(spy).not.toHaveBeenCalled();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), '3');
    expect(spy).toHaveBeenCalled();
    expect(screen.queryByRole('listitem')).toHaveTextContent('No results');
});

it('Renders addresses results', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [
                    {
                        'name': '1020 Helm Ln Foster City CA 94044',
                        'url': '/estate/1/CA/Foster-City/1020-Helm-Ln'
                    },
                    {
                        'name': '432 Lemon st Dallas TX 890304',
                        'url': '/estate/2/TX/Dallas/432-Lemon-st'
                    }
                ],
                cities: [],
                zip_codes: []
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), 'address');
    expect(screen.queryAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryAllByRole('listitem')[0]).toHaveTextContent('Estates');
    expect(screen.getByRole('link', {name:'1020 Helm Ln Foster City CA 94044'})).toHaveProperty('href', 'http://localhost:3000/estate/1/CA/Foster-City/1020-Helm-Ln');
    expect(screen.getByRole('link', {name:'432 Lemon st Dallas TX 890304'})).toHaveProperty('href', 'http://localhost:3000/estate/2/TX/Dallas/432-Lemon-st');
});

it('Renders cities results', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [],
                cities: [
                    {
                        'name': 'Foster City',
                        'url': '/city/1/CA/Foster-City'
                    },
                    {
                        'name': 'Dallas',
                        'url': '/city/2/TX/Dallas'
                    },
                    {
                        'name': 'Mexico',
                        'url': '/city/6/Mexico/Mexico'
                    }
                ],
                zip_codes: []
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), 'city');
    expect(screen.queryAllByRole('listitem')).toHaveLength(4);
    expect(screen.queryAllByRole('listitem')[0]).toHaveTextContent('City');
    expect(screen.getByRole('link', {name:'Foster City'})).toHaveProperty('href', 'http://localhost:3000/city/1/CA/Foster-City');
    expect(screen.getByRole('link', {name:'Dallas'})).toHaveProperty('href', 'http://localhost:3000/city/2/TX/Dallas');
    expect(screen.getByRole('link', {name:'Mexico'})).toHaveProperty('href', 'http://localhost:3000/city/6/Mexico/Mexico');
});

it('Renders zip codes results', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [],
                cities: [],
                zip_codes: [
                    {
                        'name': '94044',
                        'url': '/zipCode/1/94044'
                    },
                    {
                        'name': '94356',
                        'url': '/zipCode/2/94356'
                    },
                    {
                        'name': '38740',
                        'url': '/zipCode/4/38740'
                    }
                ]
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), 'zip code');
    expect(screen.queryAllByRole('listitem')).toHaveLength(4);
    expect(screen.queryAllByRole('listitem')[0]).toHaveTextContent('Zip code');
    expect(screen.getByRole('link', {name:'94044'})).toHaveProperty('href', 'http://localhost:3000/zipCode/1/94044');
    expect(screen.getByRole('link', {name:'94356'})).toHaveProperty('href', 'http://localhost:3000/zipCode/2/94356');
    expect(screen.getByRole('link', {name:'38740'})).toHaveProperty('href', 'http://localhost:3000/zipCode/4/38740');
});

it('Renders estate, city, and zip code results', async() =>{
    const spy = vi.spyOn(axios, "get").mockImplementation(() =>{
        return Promise.resolve({
            data: {
                addresses: [
                    {
                        'name': '1020 Helm Ln Foster City CA 94044',
                        'url': '/estate/1/CA/Foster-City/1020-Helm-Ln'
                    },
                    {
                        'name': '432 Lemon st Dallas TX 890304',
                        'url': '/estate/2/TX/Dallas/432-Lemon-st'
                    }
                ],
                cities: [
                    {
                        'name': 'Foster City',
                        'url': '/city/1/CA/Foster-City'
                    },
                    {
                        'name': 'Dallas',
                        'url': '/city/2/TX/Dallas'
                    }
                ],
                zip_codes: [
                    {
                        'name': '94044',
                        'url': '/zipCode/1/94044'
                    },
                    {
                        'name': '94356',
                        'url': '/zipCode/2/94356'
                    }
                ]
            }
        });
    });
    render(<Search/>, {wrapper:BrowserRouter});
    await userEvent.type(screen.getByRole('textbox', {name: /search-input/i}), 'multiple results');
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(9);
    expect(listItems[0]).toHaveTextContent('Estates');
    expect(listItems[3]).toHaveTextContent('City');
    expect(listItems[6]).toHaveTextContent('Zip code');
    expect(screen.getByRole('link', {name:'1020 Helm Ln Foster City CA 94044'})).toHaveProperty('href', 'http://localhost:3000/estate/1/CA/Foster-City/1020-Helm-Ln');
    expect(screen.getByRole('link', {name:'432 Lemon st Dallas TX 890304'})).toHaveProperty('href', 'http://localhost:3000/estate/2/TX/Dallas/432-Lemon-st');
    expect(screen.getByRole('link', {name:'Foster City'})).toHaveProperty('href', 'http://localhost:3000/city/1/CA/Foster-City');
    expect(screen.getByRole('link', {name:'Dallas'})).toHaveProperty('href', 'http://localhost:3000/city/2/TX/Dallas');
    expect(screen.getByRole('link', {name:'94044'})).toHaveProperty('href', 'http://localhost:3000/zipCode/1/94044');
    expect(screen.getByRole('link', {name:'94356'})).toHaveProperty('href', 'http://localhost:3000/zipCode/2/94356');
});