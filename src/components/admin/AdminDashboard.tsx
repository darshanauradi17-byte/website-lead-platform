"use client";

import React, { useState, useEffect } from "react";
import { Lead, LeadStatus, ProjectStage, SlaStatus } from "@/lib/types";
import { getStoredLeads, updateLeadStatus, updateLeadDetails, adminLogin, adminLogout, getAdminToken } from "@/lib/lead-store";
import { calculateSlaStatus, formatIndianPhone, getWhatsAppLink, formatDate, exportLeadsToCsv } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Search, Filter, Download, Phone, MessageSquare, Clock, UserCheck, FileSpreadsheet, Kanban, Table as TableIcon, ChevronRight, X, AlertTriangle, ShieldCheck, Plus, CheckCircle, RefreshCw, BarChart2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<string>("admin");
  const [adminPass, setAdminPass] = useState<string>("admin123");
  const [authError, setAuthError] = useState<string>("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Realtime notification toast simulator
  const [realtimeToast, setRealtimeToast] = useState<string | null>(null);

  useEffect(() => {
    // Check if logged in in session
    const auth = sessionStorage.getItem("apnaweb_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadLeads();
    }
  }, []);

  const loadLeads = () => {
    const data = getStoredLeads();
    setLeads(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin123") {
      sessionStorage.setItem("apnaweb_admin_auth", "true");
      setIsAuthenticated(true);
      setAuthError("");
      loadLeads();
    } else {
      setAuthError("Invalid username or password. (Default: admin / admin123)");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("apnaweb_admin_auth");
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    const updated = updateLeadStatus(id, newStatus);
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find((l) => l.id === id) || null);
    }

    // Trigger toast
    setRealtimeToast(`Updated ${selectedLead?.business_name || "Lead"} to ${newStatus}`);
    setTimeout(() => setRealtimeToast(null), 3000);
  };

  const handleAssignTeam = (id: string, person: string) => {
    const updated = updateLeadDetails(id, { assigned_to: person });
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find((l) => l.id === id) || null);
    }
  };

  const handleSaveNotes = (id: string, notes: string) => {
    const updated = updateLeadDetails(id, { internal_notes: notes });
    setLeads(updated);
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(updated.find((l) => l.id === id) || null);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      l.ref_id.toLowerCase().includes(q) ||
      l.full_name.toLowerCase().includes(q) ||
      l.business_name.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.whatsapp_number.includes(q);

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || l.business_type === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // KPI Stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const wonLeads = leads.filter((l) => l.status === "Won").length;
  const overdueSlaLeads = leads.filter((l) => calculateSlaStatus(l.created_at, l.status) === "overdue").length;

  // Chart data
  const chartData = [
    { name: "New", count: leads.filter((l) => l.status === "New").length },
    { name: "Review", count: leads.filter((l) => l.status === "Under Review").length },
    { name: "Call", count: leads.filter((l) => l.status === "Call Scheduled").length },
    { name: "Proposal", count: leads.filter((l) => l.status === "Proposal Sent").length },
    { name: "Won", count: leads.filter((l) => l.status === "Won").length },
    { name: "Lost", count: leads.filter((l) => l.status === "Lost").length },
  ];

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-warm-300 shadow-lifted space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-warm-900 text-white flex items-center justify-center mx-auto shadow-md font-display font-bold text-xl">
            A
          </div>
          <h2 className="font-display font-bold text-2xl text-warm-900">Admin Command Center</h2>
          <p className="text-xs text-warm-600">Sign in to manage lead pipeline & 2-day SLAs</p>
        </div>

        {authError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-warm-800 block mb-1">
              Admin Username
            </label>
            <input
              type="text"
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-warm-300 text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-warm-800 block mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-warm-300 text-sm font-medium"
            />
          </div>

          <Button type="submit" size="md" className="w-full justify-center font-bold">
            Sign In to Admin Portal →
          </Button>
        </form>

        <p className="text-[11px] text-center text-warm-400">
          Default Credentials: <code className="bg-warm-100 px-1 py-0.5 rounded text-warm-800">admin</code> / <code className="bg-warm-100 px-1 py-0.5 rounded text-warm-800">admin123</code>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-6">
      
      {/* Realtime Toast Notification */}
      {realtimeToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-warm-900 text-white px-4 py-3 rounded-2xl shadow-lifted border border-warm-700 text-xs font-semibold flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{realtimeToast}</span>
        </div>
      )}

      {/* Admin Top Banner */}
      <div className="bg-warm-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lifted">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Live Realtime Engine
            </span>
            {overdueSlaLeads > 0 && (
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                🚨 {overdueSlaLeads} SLA Overdue
              </span>
            )}
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Lead Management & SLA Console
          </h1>
          <p className="text-xs text-warm-300">
            Guaranteed 2-day callback SLA • Direct WhatsApp dispatch
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={loadLeads}>
            <RefreshCw className="w-3.5 h-3.5 mr-1" />
            <span>Refresh</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => exportLeadsToCsv(leads)}>
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
            <span>Export CSV</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Overview KPI Cards & Analytics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 4 Stat Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <Card className="space-y-2">
            <span className="text-xs text-warm-500 font-bold uppercase tracking-wider">Total Leads</span>
            <div className="font-display font-extrabold text-3xl text-warm-900">{totalLeads}</div>
            <span className="text-[11px] text-warm-500 font-medium">All enquiries received</span>
          </Card>

          <Card className="space-y-2 border-blue-200 bg-blue-50/20">
            <span className="text-xs text-blue-700 font-bold uppercase tracking-wider">New Enquiries</span>
            <div className="font-display font-extrabold text-3xl text-blue-700">{newLeads}</div>
            <span className="text-[11px] text-blue-600 font-medium">Awaiting initial call</span>
          </Card>

          <Card className="space-y-2 border-emerald-200 bg-emerald-50/20">
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider">Won / Live Sites</span>
            <div className="font-display font-extrabold text-3xl text-emerald-700">{wonLeads}</div>
            <span className="text-[11px] text-emerald-700 font-medium">Successful deliveries</span>
          </Card>

          <Card className={`space-y-2 ${overdueSlaLeads > 0 ? "border-red-300 bg-red-50/30" : ""}`}>
            <span className="text-xs text-red-700 font-bold uppercase tracking-wider">Overdue SLA (48h+)</span>
            <div className="font-display font-extrabold text-3xl text-red-700">{overdueSlaLeads}</div>
            <span className="text-[11px] text-red-600 font-medium">Requires immediate call</span>
          </Card>
        </div>

        {/* Mini Recharts Bar Chart */}
        <div className="lg:col-span-5">
          <Card className="h-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-warm-800 uppercase tracking-wider">Pipeline Stage Distribution</span>
              <BarChart2 className="w-4 h-4 text-warm-400" />
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#78725D" fontSize={10} />
                  <YAxis stroke="#78725D" fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#C84B31" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

      </div>

      {/* Toolbar Controls */}
      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-warm-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by owner name, store name, city, ref ID or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-warm-300 text-xs font-medium"
            />
          </div>

          {/* Filters & View Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 px-3 rounded-xl border border-warm-300 text-xs font-semibold text-warm-800"
            >
              <option value="all">All Statuses</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Call Scheduled">Call Scheduled</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            {/* View Switcher Toggle */}
            <div className="flex bg-warm-100 p-1 rounded-xl border border-warm-200">
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "table" ? "gradient-button text-white" : "text-warm-600"
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  viewMode === "kanban" ? "gradient-button text-white" : "text-warm-600"
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban</span>
              </button>
            </div>
          </div>

        </div>
      </Card>

      {/* VIEW MODE 1: Table View */}
      {viewMode === "table" && (
        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warm-100 border-b border-warm-200 font-bold uppercase tracking-wider text-warm-700">
                <tr>
                  <th className="p-4">Ref ID / Date</th>
                  <th className="p-4">Customer & City</th>
                  <th className="p-4">Store / Business</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">SLA Status</th>
                  <th className="p-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-100 font-medium text-warm-800">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-warm-400">
                      No lead records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const sla = calculateSlaStatus(lead.created_at, lead.status);
                    return (
                      <tr key={lead.id} className="hover:bg-warm-50/80 transition-colors">
                        <td className="p-4">
                          <div className="font-mono font-bold text-brand-600">{lead.ref_id}</div>
                          <div className="text-[10px] text-warm-400">{formatDate(lead.created_at)}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-warm-900">{lead.full_name}</div>
                          <div className="text-[11px] text-warm-500">{lead.city}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-warm-900">{lead.business_name}</div>
                          <div className="text-[11px] text-warm-500">{lead.budget_range}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-warm-100 text-warm-800 text-[11px] font-semibold border border-warm-200">
                            {lead.business_type}
                          </span>
                        </td>
                        <td className="p-4">
                          <Badge variant="status" status={lead.status}>
                            {lead.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="sla" sla={sla} />
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <a
                            href={getWhatsAppLink(lead.whatsapp_number, `Hello ${lead.full_name} ji! Calling regarding your ${lead.business_name} website enquiry on ApnaWeb (Ref: ${lead.ref_id}).`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[11px] border border-emerald-200"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="gradient-button inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold text-[11px]"
                          >
                            <span>Drawer</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* VIEW MODE 2: Kanban Board View */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {(["New", "Under Review", "Call Scheduled", "Proposal Sent", "Won"] as LeadStatus[]).map((colStatus) => {
            const colLeads = filteredLeads.filter((l) => l.status === colStatus);
            return (
              <div key={colStatus} className="bg-warm-100/70 p-3.5 rounded-2xl border border-warm-200 space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="font-display font-bold text-xs uppercase tracking-wider text-warm-800">
                    {colStatus}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white text-warm-700 text-[10px] font-bold flex items-center justify-center border border-warm-300">
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="bg-white p-4 rounded-xl border border-warm-200 shadow-xs hover:shadow-card cursor-pointer space-y-2 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] font-bold text-brand-600">{lead.ref_id}</span>
                        <span className="text-[10px] text-warm-500 font-semibold">{lead.city}</span>
                      </div>
                      <div className="font-bold text-xs text-warm-900 leading-tight">{lead.business_name}</div>
                      <div className="text-[11px] text-warm-600">{lead.full_name}</div>
                      <div className="pt-2 border-t border-warm-100 flex justify-between items-center text-[10px]">
                        <span className="text-warm-500 font-medium">{lead.budget_range}</span>
                        <span className="text-brand-600 font-bold">Open →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL DRAWER MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-warm-900/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-warm-200">
                <div>
                  <span className="font-mono font-bold text-xs text-brand-600">{selectedLead.ref_id}</span>
                  <h3 className="font-display font-bold text-xl text-warm-900">{selectedLead.business_name}</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="gradient-button p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick 1-Click WhatsApp / Call Action Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-900">{selectedLead.full_name}</div>
                  <div className="text-[11px] text-emerald-700">{selectedLead.whatsapp_number}</div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedLead.whatsapp_number}`}
                    className="p-2.5 rounded-xl bg-white text-warm-900 hover:bg-warm-100 border border-emerald-300 text-xs font-bold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Call</span>
                  </a>
                  <a
                    href={getWhatsAppLink(selectedLead.whatsapp_number, `Namaste ${selectedLead.full_name} ji! Calling regarding your ${selectedLead.business_name} website request.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Status Update Control */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider block">
                  Change Lead Pipeline Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["New", "Under Review", "Call Scheduled", "Proposal Sent", "Won", "Lost"] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedLead.id, st)}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedLead.status === st
                          ? "gradient-button border-transparent text-white"
                          : "bg-warm-50 text-warm-700 hover:bg-warm-100 border-warm-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Assignment */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider block">
                  Assigned Specialist
                </label>
                <select
                  value={selectedLead.assigned_to}
                  onChange={(e) => handleAssignTeam(selectedLead.id, e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-warm-300 text-xs font-bold text-warm-800 bg-white"
                >
                  <option value="Unassigned">Unassigned</option>
                  <option value="Darshan (Owner)">Darshan (Owner)</option>
                  <option value="Rahul (Dev)">Rahul (Dev)</option>
                  <option value="Pooja (Design)">Pooja (Design)</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-warm-800 uppercase tracking-wider block">
                  Internal Team Notes
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedLead.internal_notes || ""}
                  onBlur={(e) => handleSaveNotes(selectedLead.id, e.target.value)}
                  placeholder="Add private team call notes here..."
                  className="w-full p-3 rounded-xl border border-warm-300 text-xs font-medium"
                />
                <span className="text-[10px] text-warm-400">Notes auto-save on click outside.</span>
              </div>
            </div>

            {/* Close Drawer Button */}
            <div className="pt-4 border-t border-warm-200">
              <Button variant="secondary" className="w-full justify-center" onClick={() => setSelectedLead(null)}>
                Close Drawer
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
