
'use client';

import { useEffect, useState } from 'react';
import {
  Bot,
  Database,
  FileText,
  Activity,
  Send,
  ShieldCheck,
} from 'lucide-react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/health`,
        );

        if (!response.ok) {
          throw new Error('API unavailable');
        }

        setApiStatus('Connected');
      } catch {
        setApiStatus('Disconnected');
      }
    };

    checkApi();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">
              Enterprise AI Copilot
            </h1>
            <p className="text-xs text-slate-400">
              Operations Intelligence Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={`h-2 w-2 rounded-full ${
              apiStatus === 'Connected'
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          />
          Backend: {apiStatus}
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="text-3xl font-bold">
          Welcome to AI Operations Copilot
        </h2>

        <p className="mt-3 text-slate-400">
          Your intelligent enterprise knowledge and operations
          assistant.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: 'Knowledge Assistant',
              description: 'Ask questions about business documents.',
              icon: Bot,
            },
            {
              title: 'Document Management',
              description: 'Upload and manage knowledge documents.',
              icon: FileText,
            },
            {
              title: 'AI Analytics',
              description: 'Monitor AI activity and operations.',
              icon: Activity,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-800 bg-slate-900 p-6"
              >
                <Icon className="h-8 w-8 text-blue-400" />

                <h3 className="mt-5 text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-400" />
            <h3 className="font-semibold">
              System Health
            </h3>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-slate-400">
              NestJS Backend
            </span>

            <span className="text-sm font-medium">
              {apiStatus}
            </span>
          </div>

          <div className="mt-4 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-slate-400">
                Database integration: Coming soon
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h3 className="font-semibold">
            AI Assistant
          </h3>

          <div className="mt-4 flex gap-3">
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask your enterprise AI assistant..."
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <button
              disabled={!message.trim()}
              onClick={() => {
                alert('AI integration will be implemented in Phase 2.');
                setMessage('');
              }}
              className="rounded-lg bg-blue-600 px-5 py-3 disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
