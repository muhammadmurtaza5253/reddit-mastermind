"use client";

import { useState } from "react";
import supabase from "@/app/db";
import { FormData } from "./types";
import FieldLabel from "./components/FieldLabel";

const initialFormData: FormData = {
  companyInfo: "",
  personas: [{ id: "1", value: "" }, { id: "2", value: "" }],
  subreddits: [{ id: "1", value: "" }],
  queries: [{ id: "1", value: "" }],
  postsPerWeek: 0,
};

const ContentEntry = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const addPersona = () => {
    setFormData({
      ...formData,
      personas: [...formData.personas, { id: Date.now().toString(), value: "" }],
    });
  };

  const removePersona = (id: string) => {
    if (formData.personas.length > 2) {
      setFormData({
        ...formData,
        personas: formData.personas.filter((p) => p.id !== id),
      });
    }
  };

  const updatePersona = (id: string, value: string) => {
    setFormData({
      ...formData,
      personas: formData.personas.map((p) => (p.id === id ? { ...p, value } : p)),
    });
  };

  const addSubreddit = () => {
    setFormData({
      ...formData,
      subreddits: [...formData.subreddits, { id: Date.now().toString(), value: "" }],
    });
  };

  const removeSubreddit = (id: string) => {
    if (formData.subreddits.length > 1) {
      setFormData({
        ...formData,
        subreddits: formData.subreddits.filter((s) => s.id !== id),
      });
    }
  };

  const updateSubreddit = (id: string, value: string) => {
    setFormData({
      ...formData,
      subreddits: formData.subreddits.map((s) => (s.id === id ? { ...s, value } : s)),
    });
  };

  const addQuery = () => {
    setFormData({
      ...formData,
      queries: [...formData.queries, { id: Date.now().toString(), value: "" }],
    });
  };

  const removeQuery = (id: string) => {
    if (formData.queries.length > 1) {
      setFormData({
        ...formData,
        queries: formData.queries.filter((q) => q.id !== id),
      });
    }
  };

  const updateQuery = (id: string, value: string) => {
    setFormData({
      ...formData,
      queries: formData.queries.map((q) => (q.id === id ? { ...q, value } : q)),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform data to match desired shape
    const userInput = {
      companyInfo: formData.companyInfo,
      personas: formData.personas.map((p) => p.value).filter((v) => v.trim() !== ""),
      subreddits: formData.subreddits.map((s) => s.value).filter((v) => v.trim() !== ""),
      chatGPTQueries: formData.queries.map((q) => q.value).filter((v) => v.trim() !== ""),
      postsPerWeek: formData.postsPerWeek,
    };

    try {
      const { data, error } = await supabase
        .from("user_inputs")
        .insert([
            {
              company_info: userInput.companyInfo,
              personas: userInput.personas,
              subreddits: userInput.subreddits,
              chatgpt_queries: userInput.chatGPTQueries,
              posts_per_week: userInput.postsPerWeek,
            },
          ])
        .select().single();

      if (error) {
        alert("Failed to submit form. Please try again.");
      } else {
        alert("Form submitted successfully!");
        setFormData(initialFormData);
      }
    } catch (err) {
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Content Entry
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Configure your content strategy parameters
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Info */}
            <div>
             <FieldLabel label="Company Info" />
              <textarea
                id="companyInfo"
                value={formData.companyInfo}
                onChange={(e) =>
                  setFormData({ ...formData, companyInfo: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your company information..."
              />
            </div>

            {/* Personas */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Personas (Minimum 2)
                </label>
                <button
                  type="button"
                  onClick={addPersona}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  + Add Persona
                </button>
              </div>
              <div className="space-y-3">
                {formData.personas.map((persona, index) => (
                  <div key={persona.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={persona.value}
                      onChange={(e) => updatePersona(persona.id, e.target.value)}
                      placeholder={`Persona ${index + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {formData.personas.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePersona(persona.id)}
                        className="px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Subreddits */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Subreddits
                </label>
                <button
                  type="button"
                  onClick={addSubreddit}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  + Add Subreddit
                </button>
              </div>
              <div className="space-y-3">
                {formData.subreddits.map((subreddit, index) => (
                  <div key={subreddit.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={subreddit.value}
                      onChange={(e) => updateSubreddit(subreddit.id, e.target.value)}
                      placeholder={`r/${index === 0 ? "subreddit" : "subreddit"}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {formData.subreddits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSubreddit(subreddit.id)}
                        className="px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ChatGPT Queries */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  ChatGPT Queries to Target
                </label>
                <button
                  type="button"
                  onClick={addQuery}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  + Add Query
                </button>
              </div>
              <div className="space-y-3">
                {formData.queries.map((query, index) => (
                  <div key={query.id} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={query.value}
                      onChange={(e) => updateQuery(query.id, e.target.value)}
                      placeholder={`Query ${index + 1}`}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {formData.queries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuery(query.id)}
                        className="px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Posts Per Week */}
            <div>
              <label
                htmlFor="postsPerWeek"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
              >
                Number of Posts Per Week
              </label>
              <input
                id="postsPerWeek"
                type="number"
                min="0"
                value={formData.postsPerWeek}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    postsPerWeek: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="0"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="group relative w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Submit</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentEntry;

