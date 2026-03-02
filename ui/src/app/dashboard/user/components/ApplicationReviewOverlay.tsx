"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, MapPin } from "lucide-react";

interface ApplicationReviewOverlayProps {
    selectedApp: any;
    onClose: () => void;
}

export default function ApplicationReviewOverlay({ selectedApp, onClose }: ApplicationReviewOverlayProps) {
    if (!selectedApp) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-0 rounded-[2rem] border-none shadow-2xl flex flex-col">
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b px-8 py-5 flex justify-between items-center z-10">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Application Review</h2>
                        <p className="text-sm text-zinc-500 font-medium">#{selectedApp.application_code} • {new Date(selectedApp.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* EDIT INFO BUTTON REMOVED FOR USER AS PER REQUEST */}
                        <Button variant="ghost" className="rounded-full w-10 h-10 p-0" onClick={onClose}>
                            <span className="text-2xl font-bold">&times;</span>
                        </Button>
                    </div>
                </div>

                <div className="p-8 space-y-8 bg-zinc-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {['groom', 'bride'].map((type) => {
                            const person = selectedApp.applicants?.find((a: any) => a.type === type);
                            if (!person) return null;

                            return (
                                <div key={type} className="space-y-6">
                                    <div className={`p-4 rounded-2xl border ${type === 'groom' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
                                        <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                                            {type === 'groom' ? <div className="w-2 h-2 rounded-full bg-blue-500" /> : <div className="w-2 h-2 rounded-full bg-rose-500" />}
                                            {type === 'groom' ? "Groom's" : "Bride's"} Information
                                        </h3>
                                    </div>

                                    <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
                                        {/* Personal Info */}
                                        <section className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b pb-1">Personal Details</h4>
                                            <div className="grid grid-cols-1 gap-3">
                                                <DetailItem label="Full Name" value={`${person.first_name} ${person.middle_name || ''} ${person.last_name} ${person.suffix || ''}`} />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <DetailItem label="Birthday" value={new Date(person.birth_date).toLocaleDateString()} />
                                                    <DetailItem label="Age" value={person.age?.toString()} />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    <DetailItem label="Citizenship" value={person.citizenship} />
                                                    <DetailItem label="Religion" value={person.religion} />
                                                </div>
                                                {person.valid_id_number && (
                                                    <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl space-y-1">
                                                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tight">Valid ID Information</p>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs font-bold text-zinc-600">{person.valid_id_type}</span>
                                                            <span className="text-xs font-mono font-black text-indigo-600">{person.valid_id_number}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {person.giver_name && person.age >= 18 && person.age <= 24 && (
                                            <section className="space-y-3">
                                                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b pb-1">Legal {person.age <= 20 ? 'Consent' : 'Advice'} Provided By</h4>
                                                <div className="space-y-3">
                                                    <DetailItem label="Full Name" value={person.giver_name} />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <DetailItem label="Relationship" value={person.giver_relationship} />
                                                        {person.giver_id_number && (
                                                            <DetailItem label="ID Number" value={person.giver_id_number} />
                                                        )}
                                                    </div>
                                                </div>
                                            </section>
                                        )}

                                        {/* Residence */}
                                        <section className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b pb-1">Current Residence</h4>
                                            <DetailItem
                                                label="Address"
                                                value={person.addresses ? `${person.addresses.barangay}, ${person.addresses.municipality}, ${person.addresses.province}` : 'No address provided'}
                                            />
                                        </section>

                                        {/* Parents info */}
                                        <section className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border-b pb-1">Parental Information</h4>
                                            <div className="space-y-3">
                                                <DetailItem label="Father's Name" value={person.father_name} />
                                                <DetailItem label="Mother's Name" value={person.mother_name} />
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="border-t pt-6 text-center">
                        <p className="text-xs text-zinc-400 italic">This application record is encrypted and legally binding under RA 10173.</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

function DetailItem({ label, value }: { label: string, value?: string | null }) {
    return (
        <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">{label}</p>
            <p className="text-sm font-semibold text-zinc-900 truncate">{value || 'N/A'}</p>
        </div>
    );
}
