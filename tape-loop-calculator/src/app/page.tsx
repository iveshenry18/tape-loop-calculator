"use client";
import { useEffect, useState } from "react";

function ValueInput({
  label,
  unitLabel = undefined,
  step = 1,
  disabled = false,
  value,
  onChange = () => {},
}: {
  label: string;
  unitLabel?: string;
  step?: number;
  value: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 w-full">
      <h3 className="text-xl">{label}</h3>
      <input
        className={`w-48 px-3 text-2xl text-center text-gray-700 border rounded-lg focus:outline-none focus:shadow-outline${
          disabled ? " bg-gray-400 text-white" : ""
        }}`}
        type="number"
        placeholder={label}
        id={label}
        name={label}
        min="0"
        max="999"
        step={step}
        required
        disabled={disabled}
        value={value}
        onChange={(e) => {
          onChange(parseFloat(e.target.value));
        }}
      />
      {unitLabel && <p>{unitLabel}</p>}
    </div>
  );
}

/**
 * A tape loop calculator that calculates the length of a tape loop based on the
 * tempo and the number of bars.
 *
 * Any number can be entered into any values, and all the rest update
 *
 * It has a modern, sleek, minimal, functional design using Tailwind
 */
export default function Home() {
  const [bars, setBars] = useState(2);
  const [beats, setBeats] = useState(4);
  const totalBeats = bars * beats;
  const [beatsPerMinute, setBeatsPerMinute] = useState(120);
  const secondsPerBeat = 60 / beatsPerMinute;
  const totalSeconds = totalBeats * secondsPerBeat;
  const [tapeSpeed, setTapeSpeed] = useState(7.5);
  const tapeLength = totalSeconds * tapeSpeed;

  const [showIntermediateCalculations, setShowIntermediateCalculations] =
    useState(false);

  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <title>Tape Loop Calculator</title>
      <h1 className="text-6xl font-bold pt-8">Tape Loop Calculator</h1>
      <div className="flex flex-col gap-4 items-center justify-around max-w-4xl mt-12 sm:w-full">
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          <h3 className="text-xl">Intermediate Calculations</h3>
          <button
            className="text-xl p-3 bg-gray-50 text-slate-700 rounded-lg focus:outline-none focus:shadow-outline w-24"
            onClick={() =>
              setShowIntermediateCalculations(!showIntermediateCalculations)
            }
          >
            {showIntermediateCalculations ? "Hide" : "Show"}{" "}
          </button>
        </div>
        <ValueInput label="Bars" value={bars} onChange={setBars} />
        <ValueInput label="Beats" value={beats} onChange={setBeats} />
        {showIntermediateCalculations && (
          <ValueInput label="Total Beats" value={totalBeats} disabled />
        )}
        <ValueInput
          label="Tempo"
          unitLabel="beats per minute"
          value={beatsPerMinute}
          onChange={setBeatsPerMinute}
        />
        {showIntermediateCalculations && (
          <ValueInput
            label="Tempo"
            unitLabel="seconds per beat"
            step={0.1}
            disabled
            value={secondsPerBeat}
            onChange={(value) => setBeatsPerMinute(60 / value)}
          />
        )}
        {showIntermediateCalculations && (
          <ValueInput label="Total Seconds" value={totalSeconds} disabled />
        )}
        <ValueInput
          label="Tape Speed"
          unitLabel="inches per second"
          value={tapeSpeed}
          step={0.1}
          onChange={setTapeSpeed}
        />
        <ValueInput
          label="Tape Length"
          unitLabel="inches"
          step={0.1}
          disabled
          value={tapeLength}
        />
      </div>
    </main>
  );
}
