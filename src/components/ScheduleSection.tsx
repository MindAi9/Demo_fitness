import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SCHEDULE_ITEMS, type ScheduleEntry } from '../data/clubData';

interface ScheduleSectionProps {
  onBookClass: (classLabel: string) => void;
}

const DAY_FILTERS = [
  'All Days',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export function ScheduleSection({ onBookClass }: ScheduleSectionProps) {
  const [selectedDay, setSelectedDay] = useState<string>('All Days');

  const filteredItems: ScheduleEntry[] =
    selectedDay === 'All Days'
      ? SCHEDULE_ITEMS
      : SCHEDULE_ITEMS.filter((item) => item.day === selectedDay);

  return (
    <section
      id="schedule"
      className="relative border-t border-white/[0.06] bg-[#070708] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-red-500 uppercase">
              Class Schedule · Sample Demo Timetable
            </p>
            <h2 className="mt-2 font-display text-[clamp(2rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-tight text-white uppercase text-balance">
              Weekly Training Timetable
            </h2>
          </div>

          {/* Interactive Day Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter classes by day"
            className="flex flex-wrap items-center gap-1 rounded-sm border border-white/[0.08] bg-[#111114] p-1"
          >
            {DAY_FILTERS.map((day) => (
              <button
                key={day}
                type="button"
                role="tab"
                aria-selected={selectedDay === day}
                onClick={() => setSelectedDay(day)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedDay === day
                    ? 'bg-red-600 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {day === 'All Days' ? 'All Days' : day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Timetable */}
        <div className="mt-10 hidden md:block overflow-hidden rounded-sm border border-white/[0.08] bg-[#111114]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#0D0D10] text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                <th className="py-4 px-6">Class Name</th>
                <th className="py-4 px-6">Coach</th>
                <th className="py-4 px-6">Day</th>
                <th className="py-4 px-6">Time</th>
                <th className="py-4 px-6">Zone · Focus</th>
                <th className="py-4 px-6 text-right">Booking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {filteredItems.map((entry) => (
                <tr
                  key={entry.id}
                  className="transition-colors duration-150 hover:bg-white/[0.025]"
                >
                  <td className="py-5 px-6 font-display text-xl font-bold tracking-wide text-white uppercase">
                    {entry.className}
                  </td>
                  <td className="py-5 px-6 text-sm text-zinc-300">
                    {entry.trainer}
                  </td>
                  <td className="py-5 px-6 text-sm text-zinc-300">
                    {entry.day}
                  </td>
                  <td className="py-5 px-6 font-mono-tabular text-xs text-zinc-200">
                    {entry.time}
                  </td>
                  <td className="py-5 px-6 text-xs text-zinc-400">
                    <span>{entry.zone}</span>
                    <span className="mx-2 text-zinc-600" aria-hidden="true">
                      ·
                    </span>
                    <span>{entry.intensity}</span>
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        onBookClass(
                          `Class: ${entry.className} (${entry.day}, ${entry.time})`
                        )
                      }
                      className="inline-flex items-center gap-1.5 border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:border-red-500 hover:bg-red-600 transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Responsive Schedule Cards */}
        <div className="mt-8 space-y-4 md:hidden">
          {filteredItems.map((entry) => (
            <div
              key={entry.id}
              className="rounded-sm border border-white/[0.08] bg-[#111114] p-5"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-red-500 uppercase">
                  {entry.day}
                </span>
                <span className="font-mono-tabular text-zinc-200">
                  {entry.time}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold text-white uppercase">
                {entry.className}
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                {entry.trainer} <span aria-hidden="true">·</span> {entry.zone}{' '}
                <span aria-hidden="true">·</span> {entry.intensity}
              </p>
              <button
                type="button"
                onClick={() =>
                  onBookClass(
                    `Class: ${entry.className} (${entry.day}, ${entry.time})`
                  )
                }
                className="mt-4 flex w-full items-center justify-center gap-2 border border-white/15 bg-white/[0.04] py-3 text-xs font-semibold tracking-wider text-white uppercase rounded-sm hover:bg-red-600 hover:border-red-600 transition-colors cursor-pointer"
              >
                <span>Reserve / Enquire</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-zinc-500">
          Note: All class times and coaching assignments above represent a
          sample weekly schedule for demonstration purposes.
        </p>
      </div>
    </section>
  );
}
