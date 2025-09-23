
import React, { useState, useCallback, useMemo } from 'react';
import { 
  AppStep,
  DesignParameters,
  WorkflowType,
  RoomFeel,
  RoomStyle,
  RoomType,
  RoomUsage 
} from './types';
import {
  WORKFLOW_TYPE_OPTIONS,
  ROOM_TYPE_OPTIONS,
  ROOM_USAGE_OPTIONS,
  ROOM_FEEL_OPTIONS,
  ROOM_STYLE_OPTIONS
} from './constants';
import { generateRoomMakeover } from './services/geminiService';
import { UploadIcon, SparklesIcon, DownloadIcon } from './components/icons';
import { CardSelector } from './components/CardSelector';

// --- Helper to convert file to base64 ---
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve((reader.result as string).split(',')[1]);
  reader.onerror = error => reject(error);
});

// --- UI Components ---

const Header: React.FC = () => (
  <header className="text-center py-8">
    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">AI Interior Designer</h1>
    <p className="text-lg text-slate-600 mt-2">Reimagine your space with the power of Gemini.</p>
  </header>
);

const ImageUploader: React.FC<{ onImageUpload: (file: File) => void, title: string, subtitle: string }> = ({ onImageUpload, title, subtitle }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="text-slate-500 mt-1 mb-4">{subtitle}</p>
      <label
        htmlFor="dropzone-file"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`mt-4 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white transition-colors duration-300 ${dragActive ? 'border-blue-500' : 'border-slate-300 hover:border-blue-400'}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadIcon className="w-10 h-10 mb-4 text-slate-500"/>
            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-500">PNG, JPG, or WEBP</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleChange} />
      </label>
    </div>
  );
};

const GeneratingView: React.FC = () => (
    <div className="text-center">
        <div className="flex justify-center items-center">
            <SparklesIcon className="w-16 h-16 text-blue-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mt-6">Generating your new room...</h2>
        <p className="text-slate-500 mt-2">The AI is working its magic. This may take a moment.</p>
    </div>
);


const ResultView: React.FC<{
  original: string;
  generated: string;
  description: string;
  prompt: string;
  onStartOver: () => void;
  refinementPrompt: string;
  onRefinementChange: (value: string) => void;
  onRefine: () => void;
}> = ({ original, generated, description, prompt, onStartOver, refinementPrompt, onRefinementChange, onRefine }) => {
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generated;
        const fileExtension = generated.split(';')[0].split('/')[1] || 'png';
        link.download = `ai-room-makeover.${fileExtension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
    <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-2xl font-bold text-center text-slate-700 mb-4">Before</h3>
                <img src={original} alt="Original room" className="rounded-lg shadow-xl w-full" />
            </div>
            <div>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-slate-700">After</h3>
                    <button 
                        onClick={handleDownload} 
                        className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors"
                        aria-label="Download generated image"
                    >
                        <DownloadIcon className="w-5 h-5 mr-2"/>
                        Download
                    </button>
                </div>
                <img src={generated} alt="AI generated room" className="rounded-lg shadow-xl w-full" />
            </div>
        </div>
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-slate-800">AI Design Notes</h4>
            <p className="text-slate-600 mt-2">{description}</p>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold text-slate-800">Make a Change</h4>
            <p className="text-slate-600 mt-1 mb-4">Not quite right? Tell the AI what to adjust.</p>
            <textarea
              value={refinementPrompt}
              onChange={(e) => onRefinementChange(e.target.value)}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              rows={2}
              placeholder="e.g., 'Make the sofa blue' or 'Add a bigger rug'"
            />
            <button 
                onClick={onRefine}
                disabled={!refinementPrompt.trim()}
                className="mt-4 w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <SparklesIcon className="w-5 h-5 mr-2" />
                Refine Design
            </button>
        </div>

        <div className="mt-8 bg-slate-50 p-6 rounded-lg shadow-md">
          <details>
            <summary className="text-xl font-semibold text-slate-800 cursor-pointer hover:text-slate-900 transition-colors">
              View Full AI Prompt
            </summary>
            <pre className="mt-4 p-4 bg-slate-100 rounded-lg text-sm text-slate-700 whitespace-pre-wrap font-mono overflow-x-auto border border-slate-200">
              <code>{prompt}</code>
            </pre>
          </details>
        </div>

        <div className="text-center mt-8">
            <button onClick={onStartOver} className="px-8 py-3 bg-slate-600 text-white font-bold rounded-lg hover:bg-slate-700 transition-colors">Start a New Design</button>
        </div>
    </div>
    );
};

const INITIAL_DESIGN_PARAMS: DesignParameters = {
  workflowType: 'partial',
  roomType: 'Living Room',
  roomUsage: [],
  roomFeel: 'Cozy',
  roomStyle: 'Modern',
  specialRequests: ''
};

// --- Main App Component ---

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.Upload);
  const [originalImage, setOriginalImage] = useState<{ data: string; file: File | null }>({ data: '', file: null });
  const [inspirationImage, setInspirationImage] = useState<{ data: string; file: File | null }>({ data: '', file: null });
  const [designParams, setDesignParams] = useState<DesignParameters>(INITIAL_DESIGN_PARAMS);
  const [generatedResult, setGeneratedResult] = useState({ imageUrl: '', text: '', prompt: '' });
  const [error, setError] = useState<string | null>(null);
  const [refinementPrompt, setRefinementPrompt] = useState('');


  const currentUsageOptions = useMemo(() => {
    return ROOM_USAGE_OPTIONS[designParams.roomType] || [];
  }, [designParams.roomType]);

  const handleImageUpload = async (file: File) => {
    try {
        const base64 = await toBase64(file);
        setOriginalImage({ data: `data:${file.type};base64,${base64}`, file });
        setStep(AppStep.Customize);
    } catch(err) {
        setError('Failed to read image file.');
    }
  };
  
  const handleInspirationImageUpload = async (file: File) => {
    try {
        const base64 = await toBase64(file);
        setInspirationImage({ data: `data:${file.type};base64,${base64}`, file });
    } catch(err) {
        setError('Failed to read inspiration image file.');
    }
  };

  const handleParamChange = <K extends keyof DesignParameters>(key: K, value: DesignParameters[K]) => {
    setDesignParams(prev => {
      const newState = { ...prev, [key]: value };
      if (key === 'roomType') {
        newState.roomUsage = [];
      }
      if (key === 'workflowType' && value !== 'match') {
          setInspirationImage({ data: '', file: null });
      }
      return newState;
    });
  };
  
  const handleUsageChange = (usage: RoomUsage) => {
      setDesignParams(prev => {
          const newUsage = prev.roomUsage.includes(usage) 
              ? prev.roomUsage.filter(u => u !== usage)
              : [...prev.roomUsage, usage];
          return { ...prev, roomUsage: newUsage };
      });
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage.file) {
      setError("No image selected.");
      return;
    }
    
    if ((designParams.workflowType === 'partial' || designParams.workflowType === 'full') && (designParams.roomUsage.length < 3 || designParams.roomUsage.length > 5)) {
        setError("Please select 3 to 5 room usages.");
        return;
    }
    
    if (designParams.workflowType === 'match' && !inspirationImage.file) {
        setError("Please upload an inspiration photo for the 'Match a Photo' workflow.");
        return;
    }

    setError(null);
    setStep(AppStep.Generating);

    try {
      const base64Data = originalImage.data.split(',')[1];
      const inspiration = designParams.workflowType === 'match' && inspirationImage.file
        ? { base64: inspirationImage.data.split(',')[1], mimeType: inspirationImage.file.type }
        : undefined;
      const result = await generateRoomMakeover(base64Data, originalImage.file.type, designParams, inspiration);
      setGeneratedResult(result);
      setStep(AppStep.Result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Generation failed: ${errorMessage}`);
      setStep(AppStep.Customize);
    }
  }, [originalImage, designParams, inspirationImage]);
  
  const handleRefine = useCallback(async () => {
    if (!originalImage.file || !refinementPrompt.trim()) {
        setError("Please enter a refinement request.");
        return;
    }
    setError(null);
    setStep(AppStep.Generating);
    
    const refinedParams = {
        ...designParams,
        specialRequests: `${designParams.specialRequests}\n\n--- PREVIOUSLY GENERATED, NOW REFINE ---\nRefinement Request: ${refinementPrompt}`.trim()
    };

    try {
        const base64Data = originalImage.data.split(',')[1];
        const inspiration = designParams.workflowType === 'match' && inspirationImage.file
            ? { base64: inspirationImage.data.split(',')[1], mimeType: inspirationImage.file.type }
            : undefined;
        const result = await generateRoomMakeover(base64Data, originalImage.file.type, refinedParams, inspiration);
        
        setGeneratedResult(result);
        setDesignParams(refinedParams); 
        setRefinementPrompt('');
        setStep(AppStep.Result);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(`Refinement failed: ${errorMessage}`);
        setStep(AppStep.Result);
    }
  }, [originalImage, designParams, refinementPrompt, inspirationImage]);

  const handleStartOver = () => {
    setStep(AppStep.Upload);
    setOriginalImage({ data: '', file: null });
    setInspirationImage({ data: '', file: null });
    setGeneratedResult({ imageUrl: '', text: '', prompt: '' });
    setError(null);
    setDesignParams(INITIAL_DESIGN_PARAMS);
    setRefinementPrompt('');
  };

  const isGenerationDisabled = (designParams.workflowType === 'partial' || designParams.workflowType === 'full') && (designParams.roomUsage.length < 3 || designParams.roomUsage.length > 5) || (designParams.workflowType === 'match' && !inspirationImage.file);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        {step === AppStep.Upload && <ImageUploader onImageUpload={handleImageUpload} title="1. Upload a Photo of Your Room" subtitle="Start by showing us your current space."/>}

        {step === AppStep.Customize && (
          <div className="w-full max-w-5xl">
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
            
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Your Room</h2>
                    <img src={originalImage.data} alt="Your room" className="rounded-lg shadow-lg w-full max-w-sm mx-auto mt-4" />
                </div>
                <CardSelector
                  title="2. Choose Your Workflow"
                  subtitle="How do you want to redesign your space?"
                  options={WORKFLOW_TYPE_OPTIONS}
                  selectedValue={designParams.workflowType}
                  onChange={(val) => handleParamChange('workflowType', val as WorkflowType)}
                  type="radio"
                />
            </div>
            
            {designParams.workflowType === 'match' && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <ImageUploader onImageUpload={handleInspirationImageUpload} title="3. Upload Inspiration Photo" subtitle="Upload an image you want to match."/>
                    {inspirationImage.data && (
                         <div className="text-center mt-6">
                            <h3 className="text-xl font-bold text-slate-800">Inspiration</h3>
                            <img src={inspirationImage.data} alt="Inspiration" className="rounded-lg shadow-lg w-full max-w-sm mx-auto mt-4" />
                        </div>
                    )}
                </div>
            )}
            
            {(designParams.workflowType === 'partial' || designParams.workflowType === 'full') && (
                 <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-slate-800 mb-4 text-center">3. Customize Your Design</h2>
                    <CardSelector
                      title="Room Type"
                      subtitle="What type of room is this?"
                      options={ROOM_TYPE_OPTIONS}
                      selectedValue={designParams.roomType}
                      onChange={(val) => handleParamChange('roomType', val as RoomType)}
                      type="radio"
                    />
                    <CardSelector
                      title="Room Usage"
                      subtitle="How will you use this room? (Select 3-5)"
                      options={currentUsageOptions}
                      selectedValue={designParams.roomUsage}
                      onChange={handleUsageChange}
                      type="checkbox"
                    />
                    {designParams.roomUsage.length > 5 && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative -mt-4 mb-4" role="alert">
                        <strong className="font-bold">Too many selections!</strong>
                        <span className="block sm:inline"> Please select a maximum of 5 room usages.</span>
                      </div>
                    )}
                    <CardSelector
                      title="Room Feel"
                      subtitle="How should this room feel?"
                      options={ROOM_FEEL_OPTIONS}
                      selectedValue={designParams.roomFeel}
                      onChange={(val) => handleParamChange('roomFeel', val as RoomFeel)}
                      type="radio"
                    />
                    <CardSelector
                      title="Design Style"
                      subtitle="Choose the aesthetic for your room."
                      options={ROOM_STYLE_OPTIONS}
                      selectedValue={designParams.roomStyle}
                      onChange={(val) => handleParamChange('roomStyle', val as RoomStyle)}
                      type="radio"
                    />
                </div>
            )}
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-slate-800">
                  {designParams.workflowType === 'custom' ? '3. Your Custom Request' : 'Special Requests (Optional)'}
                </h2>
                <p className="text-slate-500 mt-1 mb-4">
                  {designParams.workflowType === 'custom' 
                    ? 'Describe exactly what you want the AI to do. Be as specific as possible.'
                    : 'Any specific details? e.g., "I\'d like a blue sofa" or "No leather furniture".'
                  }
                </p>
                <textarea
                    value={designParams.specialRequests}
                    onChange={(e) => handleParamChange('specialRequests', e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    rows={designParams.workflowType === 'custom' ? 6 : 3}
                    placeholder="Enter your request here..."
                />
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={handleGenerate}
                disabled={isGenerationDisabled}
                className="px-10 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                Generate My Design
              </button>
            </div>
          </div>
        )}

        {step === AppStep.Generating && <GeneratingView />}
        
        {step === AppStep.Result && (
            <ResultView 
                original={originalImage.data}
                generated={generatedResult.imageUrl}
                description={generatedResult.text}
                prompt={generatedResult.prompt}
                onStartOver={handleStartOver}
                refinementPrompt={refinementPrompt}
                onRefinementChange={setRefinementPrompt}
                onRefine={handleRefine}
            />
        )}
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. Designs are AI-generated.</p>
      </footer>
    </div>
  );
}
