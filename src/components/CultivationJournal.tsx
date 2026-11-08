import React, { useState } from 'react';
import { GrowLogEntry, MushroomSpecies } from '../types/mycology';
import { SPECIES_CATALOG } from '../data/speciesData';
import { BookOpen, Plus, Trash2, Download, Upload, BookmarkCheck, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface CultivationJournalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedIds: string[];
  onRemoveBookmark: (id: string) => void;
  logs: GrowLogEntry[];
  onAddLog: (entry: Omit<GrowLogEntry, 'id'>) => void;
  onDeleteLog: (id: string) => void;
  onImportLogs: (logs: GrowLogEntry[]) => void;
}

export const CultivationJournal: React.FC<CultivationJournalProps> = ({
  isOpen,
  onClose,
  bookmarkedIds,
  onRemoveBookmark,
  logs,
  onAddLog,
  onDeleteLog,
  onImportLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'bookmarks'>('logs');
  const [isAddingLog, setIsAddingLog] = useState(false);

  // New log form state
  const [speciesName, setSpeciesName] = useState('Pearl Oyster (Pleurotus ostreatus)');
  const [substrateType, setSubstrateType] = useState('Pasteurized Paddy Straw');
  const [temperatureC, setTemperatureC] = useState<number>(23);
  const [humidityPercent, setHumidityPercent] = useState<number>(90);
  const [yieldGrams, setYieldGrams] = useState<number>(0);
  const [status, setStatus] = useState<GrowLogEntry['status']>('colonizing');
  const [notes, setNotes] = useState('');

  const bookmarkedSpecies = SPECIES_CATALOG.filter((s) => bookmarkedIds.includes(s.id));

  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog({
      speciesName,
      substrateType,
      inoculationDate: new Date().toISOString().split('T')[0],
      temperatureC,
      humidityPercent,
      yieldGrams,
      status,
      notes,
    });
    setIsAddingLog(false);
    setNotes('');
    setYieldGrams(0);
  };

  const exportJournalData = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      logs,
      bookmarkedSpeciesIds: bookmarkedIds,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Fungipedia_Cultivation_Backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed.logs)) {
          onImportLogs(parsed.logs);
        }
      } catch (err) {
        alert('Invalid JSON backup file');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#F7F4EC] dark:bg-[#151A16] border border-[#2C221E]/15 dark:border-[#EDE6DE]/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-white dark:bg-[#191F1A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4A7C59] flex items-center justify-center text-white">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#2C221E] dark:text-[#EDE6DE]">
                Personal Cultivation Journal & Field Notebook
              </h3>
              <p className="text-[11px] text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                Offline Local Storage Persistence · Batch Logs & Saved Species
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportJournalData}
              title="Backup Data to JSON"
              className="p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <label
              title="Import JSON Backup"
              className="p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
            </label>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#2C221E]/60 dark:text-[#EDE6DE]/60 hover:text-[#2C221E] dark:hover:text-white hover:bg-[#EAE6DC] dark:hover:bg-[#212822] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#2C221E]/10 dark:border-[#EDE6DE]/10 bg-[#FAF7F0] dark:bg-[#151A16]">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'logs'
                ? 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613]'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]'
            }`}
          >
            Active Grow Batches ({logs.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'bookmarks'
                ? 'bg-[#2C221E] text-white dark:bg-[#EDE6DE] dark:text-[#121613]'
                : 'text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]'
            }`}
          >
            Saved Species Bookmarks ({bookmarkedSpecies.length})
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'logs' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-[#2C221E]/70 dark:text-[#EDE6DE]/70">
                  Track humidity, temperature, and flushes for your home or commercial bags.
                </span>
                <button
                  onClick={() => setIsAddingLog(!isAddingLog)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#D96B43] text-white hover:bg-[#c25a34] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAddingLog ? 'Cancel' : 'Log New Batch'}</span>
                </button>
              </div>

              {/* Add Log Form */}
              {isAddingLog && (
                <form
                  onSubmit={handleSaveLog}
                  className="p-5 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 mb-6 space-y-4"
                >
                  <h4 className="font-semibold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
                    Record Cultivation Batch
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Species
                      </label>
                      <input
                        type="text"
                        value={speciesName}
                        onChange={(e) => setSpeciesName(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Substrate Type
                      </label>
                      <input
                        type="text"
                        value={substrateType}
                        onChange={(e) => setSubstrateType(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                        required
                      />
                    </div>

                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Incubation / Fruiting Temp (°C)
                      </label>
                      <input
                        type="number"
                        value={temperatureC}
                        onChange={(e) => setTemperatureC(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Humidity Level (%)
                      </label>
                      <input
                        type="number"
                        value={humidityPercent}
                        onChange={(e) => setHumidityPercent(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Current Lifecycle Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                      >
                        <option value="colonizing">Spawn Run / Colonizing</option>
                        <option value="pinning">Pinhead Formation</option>
                        <option value="fruiting">Active Fruiting Body</option>
                        <option value="harvested">Harvested (Flushing)</option>
                        <option value="contaminated">Contaminated (Quarantined)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-medium text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                        Harvested Yield (Grams)
                      </label>
                      <input
                        type="number"
                        value={yieldGrams}
                        onChange={(e) => setYieldGrams(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-medium text-xs text-[#2C221E] dark:text-[#EDE6DE] block mb-1">
                      Grower Observations & Flush Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Squeeze test verified 68% moisture; first pins emerged on day 18..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border bg-[#FAF7F0] dark:bg-[#151A16] border-[#2C221E]/15 text-[#2C221E] dark:text-[#EDE6DE]"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingLog(false)}
                      className="px-3 py-1.5 text-xs rounded-lg text-[#2C221E]/70 dark:text-[#EDE6DE]/70 hover:bg-[#EAE6DC]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#4A7C59] text-white hover:bg-[#3d6849]"
                    >
                      Save to Local Journal
                    </button>
                  </div>
                </form>
              )}

              {/* Log Entries */}
              {logs.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                  <p className="text-sm font-semibold text-[#2C221E] dark:text-[#EDE6DE]">
                    No Cultivation Batches Recorded Yet
                  </p>
                  <p className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                    Click "Log New Batch" above to start tracking your pasteurized straw bags or mushroom grow kits.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className="p-4 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
                            {log.speciesName}
                          </h5>
                          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#FAF7F0] dark:bg-[#151A16] text-[#D96B43] dark:text-[#E09F3E]">
                            {log.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                          <span>Substrate: {log.substrateType}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{log.temperatureC}°C / {log.humidityPercent}% RH</span>
                          {log.yieldGrams > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono font-semibold text-[#4A7C59]">Yield: {log.yieldGrams}g</span>
                            </>
                          )}
                        </div>
                        {log.notes && (
                          <p className="text-[#2C221E]/80 dark:text-[#EDE6DE]/80 pt-1 italic">
                            "{log.notes}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => onDeleteLog(log.id)}
                        className="p-1.5 rounded text-[#A23B2A] hover:bg-[#A23B2A]/10 transition-colors self-end sm:self-center"
                        title="Delete log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div>
              {bookmarkedSpecies.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-white dark:bg-[#191F1A] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 space-y-2">
                  <p className="text-sm font-semibold text-[#2C221E] dark:text-[#EDE6DE]">
                    No Bookmarked Species Yet
                  </p>
                  <p className="text-xs text-[#2C221E]/60 dark:text-[#EDE6DE]/60">
                    Bookmark your favorite species in Chapter 03 (Species Encyclopedia) for quick reference.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {bookmarkedSpecies.map((s) => (
                    <div
                      key={s.id}
                      className="p-4 rounded-xl bg-white dark:bg-[#1E2520] border border-[#2C221E]/10 dark:border-[#EDE6DE]/10 flex justify-between items-start text-xs"
                    >
                      <div className="space-y-1">
                        <h5 className="font-bold text-sm text-[#2C221E] dark:text-[#EDE6DE]">
                          {s.commonName}
                        </h5>
                        <p className="italic font-serif text-[#D96B43] dark:text-[#E09F3E]">
                          {s.scientificName}
                        </p>
                        <p className="text-[#2C221E]/70 dark:text-[#EDE6DE]/70 line-clamp-2">
                          {s.flavorProfile}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveBookmark(s.id)}
                        className="text-[#A23B2A] hover:underline shrink-0 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
