import React, { useState } from 'react';
import { options, buildSummaryUrl } from '../api';

const isLikelyUrl = (value) => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

const Card = () => {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSummarize = async () => {
        if (!isLikelyUrl(input)) {
            setStatus('error');
            setResult("That doesn't look like a valid link — double-check it starts with http(s)://");
            return;
        }

        setStatus('loading');
        try {
            const response = await fetch(buildSummaryUrl(input), options);
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            const text = await response.text();
            const cleaned = text.replace(/[^a-zA-Z0-9\-. ]/gm, '');

            if (!cleaned.trim()) {
                throw new Error('Empty summary returned');
            }

            setResult(cleaned);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setResult("Couldn't summarize that link. The article may be inaccessible, or the summarizer is temporarily down.");
            setStatus('error');
        }
    };

    const handleReset = () => {
        setInput('');
        setResult('');
        setStatus('idle');
        setCopied(false);
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const isLoading = status === 'loading';
    const showResult = status === 'success' || status === 'error';

    return (
        <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-2xl shadow-black/40 p-5 sm:p-8 transition-all">
            {!showResult && (
                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="article_url" className="block text-sm font-semibold text-slate-200 mb-2">
                            Enter a news article link
                        </label>
                        <input
                            id="article_url"
                            type="url"
                            inputMode="url"
                            autoComplete="url"
                            placeholder="https://www.news.com/article/"
                            className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm sm:text-base text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-indigo-400/60 transition"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading) handleSummarize();
                            }}
                            disabled={isLoading}
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSummarize}
                        disabled={isLoading || !input}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:from-indigo-400 hover:to-purple-400 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-purple-500"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                </svg>
                                Summarizing…
                            </>
                        ) : (
                            'Summarize'
                        )}
                    </button>
                </div>
            )}

            {showResult && (
                <div className="flex flex-col gap-4" aria-live="polite">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-100">
                            {status === 'error' ? 'Something went wrong' : 'Article Summary'}
                        </p>
                        {status === 'success' && (
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="text-xs font-medium text-indigo-300 hover:text-indigo-200 transition"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        )}
                    </div>

                    <p
                        className={
                            status === 'error'
                                ? 'text-sm text-rose-300 leading-relaxed'
                                : 'text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line'
                        }
                    >
                        {result}
                    </p>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="self-start rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                    >
                        ← Summarize another
                    </button>
                </div>
            )}
        </div>
    );
};

export default Card;
