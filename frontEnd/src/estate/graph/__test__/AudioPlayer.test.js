import {it, expect, vi} from 'vitest';
import {screen, fireEvent} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import  '@testing-library/jest-dom/vitest';

import renderWithProviders from '../../../__test__/renderWithProviders';
import AudioPlayer from '../AudioPlayer';
import estate from './audioData.json';

it('Audio player displays initial information', () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
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

it('Audio Player changes songs with the buttons', async () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
    const audio = screen.getByTestId("html-audio");
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-07.mp3');
    await userEvent.click(screen.getByRole('button', {name: 'Play Next'}));
    expect(screen.getByRole("heading", {name: "Wed, Mar 9"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-08.mp3');
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    expect(screen.getByRole("heading", {name: "Tue, Mar 8"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-07.mp3');
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-06.mp3');
});

it('Audio Player handles changing track when the track list is out of range', async () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
    const audio = screen.getByTestId("html-audio");
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    await userEvent.click(screen.getByRole('button', {name: 'Play Previous'}));
    expect(screen.getByRole("heading", {name: "Mon, Mar 7"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sun, Mar 6"})).toBeInTheDocument();
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
    expect(screen.getByRole("heading", {name: ""})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Fri, Mar 18"})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: "Sat, Mar 19"})).toBeInTheDocument();
    expect(audio).toHaveProperty('src', 'http://localhost:3000/assets/2141-Mills-Ave-Foster-City-CA-94404/audioFiles/2022-03-19.mp3');
});


it('Audio Player changes icon when pausing / playing', async () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
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

it('Audio Player on time update changes input range and numeric indicator', () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "duration", {
        writable: true,
        value: 100,
    });
    fireEvent.loadedMetadata(audio);
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 75,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "1:15 / 1:40"})).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveProperty('min', '0');
    expect(screen.getByRole('slider')).toHaveProperty('max', '100');
    expect(screen.getByRole('slider')).toHaveProperty('value', '75');
});

it('Progress bar can change track current time', async () =>{
    renderWithProviders(<AudioPlayer audioData={estate} />);
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "duration", {
        writable: true,
        value: 100,
    });
    fireEvent.loadedMetadata(audio);
    await fireEvent.change(screen.getByRole('slider'), {target: {value: 70}});
    expect(audio.currentTime).toBe(70);
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "1:10 / 1:40"})).toBeInTheDocument();
});

it('Audio Player only updates time when the second change', () =>{
    const playerState = {  currentTrack: 0, elapsedTime: 70, isPlaying: true};
    
    renderWithProviders(
        <AudioPlayer audioData={estate} />, 
        {preloadedState: {player: playerState}
    });
    
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 70.8,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "1:10 / 0:00"})).toBeInTheDocument();
     Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 71.2,
    });
    fireEvent.timeUpdate(audio);
    expect(screen.getByRole("heading", {name: "1:11 / 0:00"})).toBeInTheDocument();
});

it("Audio player keeps playing when the track is changed", async () =>{
    const playerState = {  currentTrack: 0, elapsedTime: 70, isPlaying: true};
    renderWithProviders(
        <AudioPlayer audioData={estate} />, 
        {preloadedState: {player: playerState}}
    );
    
    const audio = screen.getByTestId("html-audio");
    Object.defineProperty(audio, "currentTime", {
        writable: true,
        value: 71,
    });
    Object.defineProperty(audio, "networkState", {
        writable: true,
        value: 3,
    });
    
    const spyPlay = vi.spyOn(audio, "play");
    
    fireEvent.timeUpdate(audio);
    expect(spyPlay).toHaveBeenCalled();
});