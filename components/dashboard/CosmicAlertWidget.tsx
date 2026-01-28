"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Moon, Zap, Orbit, ChevronRight } from 'lucide-react';
import { COSMIC_EVENTS, CosmicEvent } from '@/lib/cosmic-data';
import { useUser } from '@/lib/UserContext';

const EventIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'retrograde': return <Zap className="w-5 h-5 text-red-400" />;
        case 'moon': return <Moon className="w-5 h-5 text-purple-400" />;
        case 'eclipse': return <AlertCircle className="w-5 h-5 text-orange-400" />;
        default: return <Orbit className="w-5 h-5 text-cyan-400" />;
    }
};

export default function CosmicAlertWidget() {
    const { user } = useUser();
    const [events, setEvents] = useState<CosmicEvent[]>([]);
    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Filter events tailored to user (Mock Logic)
        // In real app, we check user.sign against event.affectedSigns
        const relevantEvents = COSMIC_EVENTS.filter(e => {
            if (e.affectedSigns.includes('All')) return true;
            if (user?.sign && e.affectedSigns.includes(user.sign)) return true;
            return true; // Show all for demo if needed
        });
        setEvents(relevantEvents);
    }, [user]);

    if (events.length === 0) return null;

    const currentEvent = events[currentEventIndex];

    const nextEvent = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentEventIndex((prev) => (prev + 1) % events.length);
    };

    return (
        <div className="w-full">
            <motion.div
                className={`relative overflow-hidden rounded-xl border ${currentEvent.severity === 'high' ? 'border-red-500/30 bg-red-950/20' :
                    currentEvent.severity === 'medium' ? 'border-purple-500/30 bg-purple-950/20' :
                        'border-cyan-500/30 bg-cyan-950/20'
                    } backdrop-blur-md transition-all duration-300`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Header / Condensed View */}
                <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${currentEvent.severity === 'high' ? 'bg-red-500/20' : 'bg-purple-500/20'
                            }`}>
                            <EventIcon type={currentEvent.type} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white tracking-wide">{currentEvent.title}</h4>
                            <p className="text-[10px] text-white/50 uppercase tracking-wider">Kozmik Uyarı</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {events.length > 1 && (
                            <div className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] text-white/60">
                                {currentEventIndex + 1}/{events.length}
                            </div>
                        )}
                        <ChevronRight className={`w-5 h-5 text-white/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4"
                        >
                            <p className="text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3">
                                {currentEvent.description}
                            </p>

                            {events.length > 1 && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                                        onClick={nextEvent}
                                    >
                                        Diğer Uyarı <ChevronRight className="w-3 h-3" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Background Glow */}
                <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none ${currentEvent.severity === 'high' ? 'bg-red-500' :
                    currentEvent.severity === 'medium' ? 'bg-purple-500' : 'bg-cyan-500'
                    }`} />
            </motion.div>
        </div>
    );
}
