import {it, expect, vi} from 'vitest';
import {screen, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import  '@testing-library/jest-dom/vitest';
import React from 'react';

import renderWithProviders from '../../../__test__/renderWithProviders';
import AudioPlayer from '../AudioPlayer';
import audioData from './audioData.json';

it('Audio player displays initial information', () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "duration", {
        writable: true,
        value: 75,
    });
    fireEvent.loadedMetadata(audio);
    
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "0:00 / 1:15"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-06.mp3');
});


it('Audio Player handles changing track when the track list is out of range', async () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-06.mp3');
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Fri, Mar 18"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sat, Mar 19"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-19.mp3');
});


it('Audio Player plays and pause with the button', async () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    const spyPlay = vi.spyOn(audio, "play");
    const spyPause = vi.spyOn(audio, "pause");
    await userEvent.click(screen.getByRole('button', {name: 'Play'}))
    expect(spyPlay).toHaveBeenCalled();
    fireEvent.play(audio);
    expect(screen.getByRole('button', {name: 'Pause'})).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', {name: 'Pause'}));
    expect(spyPause).toHaveBeenCalled();
    fireEvent.pause(audio);
    expect(screen.getByRole('button', {name: 'Play'})).toBeInTheDocument();
});

it('Progress bar can change track current time', async () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "duration", {
        writable: true,
        value: 300,
    });
    fireEvent.loadedMetadata(audio);
    await fireEvent.change(screen.getByRole('slider'), {target: {value: 70}});
    expect(audio.currentTime).toBe(70);
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "1:10 / 5:00"})).toBeInTheDocument();
});

it('Audio Player only updates time when the second change', () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "duration", {
        writable: true,
        value: 25,
    });
    fireEvent.loadedMetadata(audio);
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 0.5,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "0:00 / 0:25"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('value', '0');
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 0.99,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "0:00 / 0:25"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('value', '0');
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 1,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "0:01 / 0:25"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('value', '1');
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 2,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "0:02 / 0:25"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('value', '2');
});

it("Audio player keeps playing when the track is changed", async () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    const spyPlay = vi.spyOn(audio, "play");
    fireEvent.play(audio);
    fireEvent.canPlay(audio);
    expect(spyPlay).toHaveBeenCalled(1);
});

it("Audio changes track when an erro is throw", async () =>{
    renderWithProviders(<AudioPlayer audioData={audioData} />);
    const audio = screen.getByTestId("html-audio");
    fireEvent.error(audio);
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
});