import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Clock3, Plus, Trash2 } from "lucide-react";

interface StudySession {
  id: string;
  title: string;
  date: string;
  time: string;
}

interface CalendarSectionProps {
  onSendToast?: (message: string, type?: "success" | "info" | "error") => void;
}

const STORAGE_KEY = "nexuscraft-study-calendar";

function localDateValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

function readSessions(): StudySession[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  const parsed: unknown = JSON.parse(saved);
  if (!Array.isArray(parsed)) {
    throw new Error("Saved learning calendar data is not a list.");
  }

  return parsed.filter((item): item is StudySession =>
    typeof item === "object" &&
    item !== null &&
    "id" in item &&
    typeof item.id === "string" &&
    "title" in item &&
    typeof item.title === "string" &&
    "date" in item &&
    typeof item.date === "string" &&
    "time" in item &&
    typeof item.time === "string"
  );
}

export function CalendarSection({ onSendToast }: CalendarSectionProps) {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => localDateValue(new Date()));
  const [time, setTime] = useState("09:00");
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    try {
      setSessions(readSessions());
    } catch (error) {
      console.error("Could not load saved learning calendar sessions.", error);
      setLoadError(true);
    }
  }, []);

  function saveSessions(nextSessions: StudySession[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSessions));
      setSessions(nextSessions);
      return true;
    } catch (error) {
      console.error("Could not save learning calendar sessions.", error);
      onSendToast?.("The session could not be saved in this browser.", "error");
      return false;
    }
  }

  function addSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    const nextSessions = [...sessions, {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: cleanTitle,
      date,
      time
    }].sort((left, right) => `${left.date}T${left.time}`.localeCompare(`${right.date}T${right.time}`));

    if (saveSessions(nextSessions)) {
      setTitle("");
      onSendToast?.("Study session added to your calendar.", "success");
    }
  }

  function removeSession(id: string) {
    saveSessions(sessions.filter((session) => session.id !== id));
  }

  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-400">Plan your next study block</p>
        <h2 className="mt-2 text-2xl font-extrabold text-white">Learning calendar</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
          Schedule and manage study sessions. Your calendar stays saved in this browser.
        </p>
      </header>

      <form onSubmit={addSession} className="grid gap-4 rounded-2xl border border-gray-800 bg-[#0d1424] p-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_140px_auto]">
        <label className="text-xs font-semibold text-gray-300">
          Session
          <input
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-400"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
            placeholder="What will you work on?"
            required
          />
        </label>
        <label className="text-xs font-semibold text-gray-300">
          Date
          <input
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-400"
            type="date"
            value={date}
            min={localDateValue(new Date())}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </label>
        <label className="text-xs font-semibold text-gray-300">
          Start time
          <input
            className="mt-2 w-full rounded-lg border border-gray-700 bg-[#080d1a] px-3 py-2.5 text-sm text-white outline-none focus:border-blue-400"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
            required
          />
        </label>
        <button className="mt-auto inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-blue-400 px-4 text-sm font-bold text-[#081321] hover:bg-blue-300 sm:col-span-2 lg:col-span-1">
          <Plus size={17} />
          Add session
        </button>
      </form>

      <section aria-live="polite" className="space-y-3">
        <h3 className="text-sm font-bold text-white">Scheduled sessions</h3>
        {loadError && (
          <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 p-3 text-sm text-rose-200">
            Saved calendar sessions could not be loaded. You can still create new sessions.
          </p>
        )}
        {sessions.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-700 p-8 text-center text-sm text-gray-400">
            No sessions scheduled yet. Add a study block above to get started.
          </p>
        ) : sessions.map((session) => (
          <article key={session.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-800 bg-[#0d1424] p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="rounded-lg bg-blue-400/10 p-2 text-blue-300"><CalendarDays size={19} /></span>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-white">{session.title}</h4>
                <p className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                  <span>{new Date(`${session.date}T00:00:00`).toLocaleDateString()}</span>
                  <span aria-hidden="true">·</span>
                  <Clock3 size={13} />
                  <span>{session.time}</span>
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeSession(session.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-xs font-semibold text-gray-300 hover:border-rose-400/50 hover:text-rose-200"
              aria-label={`Remove ${session.title}`}
            >
              <Trash2 size={14} />
              Remove
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}
