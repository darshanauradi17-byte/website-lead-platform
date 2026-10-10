"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Lead, LeadMessage, LeadFile, ProjectStage } from "@/lib/types";
import { getStoredLeads, getStoredMessages, saveNewMessage, updateLeadDetails } from "@/lib/lead-store";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card } from "@/components/ui/Card";
import { CheckCircle2, Clock, FileText, Send, Upload, User, Building, Phone, Mail, MapPin, MessageSquare, AlertCircle, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function CustomerPortal() {
  const searchParams = useSearchParams();
  const refParam = searchParams.get("ref") || "";

  const [inputRef, setInputRef] = useState<string>(refParam);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [messages, setMessages] = useState<LeadMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState<string>("");
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [editNotesText, setEditNotesText] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    if (refParam) {
      handleLookup(refParam);
    }
  }, [refParam]);

  const handleLookup = (searchId?: string) => {
    const query = (searchId || inputRef).trim().toUpperCase();
    if (!query) {
      setLoginError("Please enter your Reference ID or WhatsApp number.");
      return;
    }

    setLoginError("");
    const leads = getStoredLeads();
    const found = leads.find(
      (l) => l.ref_id.toUpperCase() === query || l.whatsapp_number.replace(/\D/g, "").includes(query.replace(/\D/g, ""))
    );

    if (found) {
      setCurrentLead(found);
      setMessages(getStoredMessages(found.id));
      setEditNotesText(found.customer_message || "");
    } else {
      setLoginError(`No project request found for "${query}". Try APW-KIRANA, APW-SALON, or check your WhatsApp number.`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !currentLead) return;

    const saved = saveNewMessage({
      lead_id: currentLead.id,
      sender_role: "customer",
      sender_name: currentLead.full_name,
      message_text: newMessageText.trim(),
      is_read: true,
    });

    setMessages((prev) => [...prev, saved]);
    setNewMessageText("");
  };

  const handleSaveNotes = () => {
    if (!currentLead) return;
    updateLeadDetails(currentLead.id, { customer_message: editNotesText });
    setCurrentLead((prev) => (prev ? { ...prev, customer_message: editNotesText } : null));
    setIsEditingNotes(false);
  };

  const projectStages: { stage: ProjectStage; label: string; desc: string }[] = [
    { stage: "Received", label: "Request Received", desc: "Your 3-step form was submitted" },
    { stage: "Under Review", label: "Under Review", desc: "Web specialist is analyzing your category" },
    { stage: "Call Scheduled", label: "Call Scheduled", desc: "Demo & WhatsApp call arranged" },
    { stage: "Proposal Sent", label: "Proposal Sent", desc: "Quotation & design preview delivered" },
    { stage: "In Progress", label: "In Development", desc: "Website code, SEO & catalog setup" },
    { stage: "Delivered", label: "Website Live!", desc: "Google Maps verified & handed over" },
  ];

  const getStageIndex = (stage: ProjectStage) => {
    const map: Record<ProjectStage, number> = {
      Received: 0,
      "Under Review": 1,
      "Call Scheduled": 2,
      "Proposal Sent": 3,
      "In Progress": 4,
      Delivered: 5,
    };
    return map[stage] ?? 0;
  };

  const activeStageIdx = currentLead ? getStageIndex(currentLead.stage) : 0;

  if (!currentLead) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-warm-300 shadow-lifted space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto border border-brand-200">
            <User className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl text-warm-900">
            Customer Tracking Portal
          </h2>
          <p className="text-xs text-warm-600">
            Enter your Reference ID (e.g. <span className="font-mono font-bold">APW-KIRANA</span>) or WhatsApp number to track project progress.
          </p>
        </div>

        {loginError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLookup();
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-warm-800 block mb-1.5">
              Reference ID or WhatsApp Number
            </label>
            <input
              type="text"
              placeholder="e.g. APW-KIRANA or 9825012345"
              value={inputRef}
              onChange={(e) => setInputRef(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-warm-300 text-sm font-mono text-warm-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 uppercase"
            />
          </div>

          <Button type="submit" size="md" className="w-full justify-center font-bold">
            Lookup My Project →
          </Button>
        </form>

        <div className="pt-4 border-t border-warm-200 text-center text-xs text-warm-500 space-y-1">
          <p>Demo codes available to try immediately:</p>
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {["APW-KIRANA", "APW-SALON", "APW-PHARMA", "APW-CAFE", "APW-GYM"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  setInputRef(code);
                  handleLookup(code);
                }}
                className="gradient-button px-2.5 py-1 rounded-md text-[11px] font-mono text-white"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8">
      
      {/* Header Banner */}
      <div className="bg-warm-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lifted">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-brand-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full font-mono">
              {currentLead.ref_id}
            </span>
            <Badge variant="status" status={currentLead.status}>
              {currentLead.status}
            </Badge>
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            {currentLead.business_name}
          </h1>
          <p className="text-xs text-warm-300 flex items-center gap-2">
            <span>Owner: {currentLead.full_name}</span>
            <span>•</span>
            <span>{currentLead.city}</span>
            <span>•</span>
            <span>{currentLead.business_type}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/portfolio">
            <GradientButton className="px-5 py-2.5 text-xs rounded-xl min-w-0">
              View Portfolio →
            </GradientButton>
          </Link>
          <button
            onClick={() => setCurrentLead(null)}
            className="gradient-button px-4 py-2 rounded-xl text-xs font-semibold text-white"
          >
            Switch Reference ID
          </button>
          <a
            href={`https://wa.me/919825012345?text=Hello%20ApnaWeb,%20I%20am%20enquiring%20about%20ref%20${currentLead.ref_id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="sm">
              <MessageSquare className="w-4 h-4 mr-1" />
              WhatsApp Support
            </Button>
          </a>
        </div>
      </div>

      {/* 6-Stage Timeline Tracker */}
      <Card className="space-y-6">
        <div>
          <h3 className="font-display font-bold text-xl text-warm-900">Project Progress Timeline</h3>
          <p className="text-xs text-warm-500">Live 6-stage delivery pipeline</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {projectStages.map((st, idx) => {
            const isCompleted = idx <= activeStageIdx;
            const isCurrent = idx === activeStageIdx;
            return (
              <div
                key={st.stage}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 transition-all ${
                  isCurrent
                    ? "bg-brand-50 border-brand-500 shadow-sm ring-1 ring-brand-500"
                    : isCompleted
                    ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                    : "bg-warm-50/50 border-warm-200 text-warm-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-warm-400">0{idx + 1}</span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <div>
                  <div className={`text-xs font-bold ${isCurrent ? "text-brand-900" : "text-warm-900"}`}>
                    {st.label}
                  </div>
                  <div className="text-[10px] text-warm-500 leading-tight mt-1">{st.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Grid: Details + Agency Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Details & Requirements */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-warm-100">
              <h3 className="font-display font-bold text-lg text-warm-900">Project Requirements Summary</h3>
              <Badge>{currentLead.budget_range}</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-warm-500 uppercase tracking-wider font-bold block mb-0.5">WhatsApp Contact</span>
                <span className="font-semibold text-warm-900">{currentLead.whatsapp_number}</span>
              </div>
              <div>
                <span className="text-warm-500 uppercase tracking-wider font-bold block mb-0.5">Preferred Call Time</span>
                <span className="font-semibold text-warm-900">{currentLead.preferred_call_time}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-warm-500 uppercase tracking-wider font-bold block mb-2">Selected Website Features</span>
              <div className="flex flex-wrap gap-1.5">
                {(currentLead.needs || []).map((n) => (
                  <span key={n} className="px-2.5 py-1 rounded-lg bg-warm-100 text-warm-800 text-xs font-semibold border border-warm-200">
                    ✓ {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Editable Notes */}
            <div className="pt-3 border-t border-warm-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-warm-500 uppercase tracking-wider font-bold">Your Store Notes / Message</span>
                {!isEditingNotes && (
                  <button
                    onClick={() => setIsEditingNotes(true)}
                    className="gradient-button text-xs font-bold text-white px-3 py-1 rounded-lg"
                  >
                    Edit Message
                  </button>
                )}
              </div>

              {isEditingNotes ? (
                <div className="space-y-2">
                  <textarea
                    rows={3}
                    value={editNotesText}
                    onChange={(e) => setEditNotesText(e.target.value)}
                    className="w-full p-3 text-xs border border-warm-300 rounded-xl"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveNotes}>
                      Save Changes
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-warm-700 bg-warm-50 p-3 rounded-xl border border-warm-200 italic">
                  "{currentLead.customer_message || "No custom message provided yet."}"
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Direct Agency Messaging */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="flex flex-col h-[480px] justify-between space-y-4">
            <div className="pb-3 border-b border-warm-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-warm-900">Agency Direct Chat</h3>
                <p className="text-[11px] text-warm-500">Connected with ApnaWeb Specialist</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {messages.length === 0 ? (
                <div className="text-center text-warm-400 py-12">
                  No messages yet. Send a query to our team below.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender_role === "customer" ? "items-end" : "items-start"}`}
                  >
                    <div className="text-[10px] text-warm-400 mb-1">{m.sender_name}</div>
                    <div
                      className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                        m.sender_role === "customer"
                          ? "bg-brand-500 text-white rounded-tr-none"
                          : "bg-warm-100 text-warm-900 border border-warm-200 rounded-tl-none"
                      }`}
                    >
                      {m.message_text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input Form */}
            <form onSubmit={handleSendMessage} className="pt-2 flex gap-2 border-t border-warm-100">
              <input
                type="text"
                placeholder="Type message to agency..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-warm-300 text-xs"
              />
              <Button type="submit" size="sm" className="font-bold">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
