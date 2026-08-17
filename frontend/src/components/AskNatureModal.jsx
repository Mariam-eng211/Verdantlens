import React, { useState } from 'react';
import { HelpCircle, X, Send } from 'lucide-react';

export default function AskNatureModal({ contextFeature, onClose }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question) return;
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ask-nature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question, contextFeature })
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setAnswer('Failed to get answer from Ask Nature.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-eco-card border border-eco-border w-full sm:max-w-md rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-white flex items-center gap-2"><HelpCircle className="text-eco-accent"/> Ask Nature</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
        </div>
        <p className="text-xs text-gray-400 mb-3">Context: <span className="text-eco-lime">{contextFeature}</span></p>

        <form onSubmit={handleAsk} className="space-y-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this feature..."
            className="w-full bg-eco-dark border border-eco-border rounded-xl p-3 text-xs text-white focus:outline-none focus:border-eco-accent"
          />
          <button type="submit" disabled={loading} className="w-full bg-eco-accent text-eco-dark font-bold py-2.5 rounded-xl text-xs">
            {loading ? 'Thinking...' : 'Ask Field Guide'}
          </button>
        </form>

        {answer && (
          <div className="mt-4 bg-eco-dark/80 border border-eco-border p-3 rounded-xl text-xs text-emerald-100 leading-relaxed">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}