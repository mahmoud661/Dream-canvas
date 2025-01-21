import React, { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { PromptInput } from './components/PromptInput';
import { StyleSelector } from './components/StyleSelector';
import { SizeSelector } from './components/SizeSelector';
import { GenerateButton } from './components/GenerateButton';
import { History } from './components/History';
import { ImageResult } from './components/ImageResult';
import { AdvancedSettings } from './components/AdvancedSettings';
import { AnimatedCard } from './components/AnimatedCard';
import { useImageGeneration } from './hooks/useImageGeneration';

function App() {
  const [prompt, setPrompt] = useState('');
  const [selectedSize, setSelectedSize] = useState('1024x1024');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [steps, setSteps] = useState(28);
  const [guidance, setGuidance] = useState(3.5);
  
  const {
    isGenerating,
    generatedImage,
    error,
    history,
    lastSeed,
    generateImage,
    regenerateWithSeed,
    clearHistory,
    clearError
  } = useImageGeneration();

  const handleGenerate = () => {
    generateImage({
      prompt,
      size: selectedSize,
      style: selectedStyle,
      steps,
      guidance
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Wand2 className="w-8 h-8 mr-2 text-cyan-400" />
              </motion.div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                Dream Canvas AI
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300"
            >
              Create stunning AI-generated artwork with advanced controls
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-7">
            <div className="lg:col-span-2">
              <AnimatedCard>
                <div className="bg-slate-800 bg-opacity-50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">
                  <div className="space-y-6">
                    <PromptInput
                      value={prompt}
                      onChange={setPrompt}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StyleSelector
                        value={selectedStyle}
                        onChange={setSelectedStyle}
                      />
                      <SizeSelector
                        value={selectedSize}
                        onChange={setSelectedSize}
                      />
                    </div>
                    <AdvancedSettings
                      steps={steps}
                      guidance={guidance}
                      seed={lastSeed}
                      onStepsChange={setSteps}
                      onGuidanceChange={setGuidance}
                      onRegenerate={regenerateWithSeed}
                    />
                    <GenerateButton
                      isGenerating={isGenerating}
                      disabled={!prompt.trim()}
                      onClick={handleGenerate}
                    />
                  </div>
                  <ImageResult
                    imageUrl={generatedImage}
                    isGenerating={isGenerating}
                    error={error}
                    onErrorDismiss={clearError}
                  />
                </div>
              </AnimatedCard>
            </div>

            <AnimatedCard delay={0.2}>
              <History
                items={history}
                onClear={clearHistory}
              />
            </AnimatedCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;