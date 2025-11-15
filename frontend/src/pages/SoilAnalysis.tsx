import React, { useState, useCallback } from 'react';
import { fileToBase64, analyzeSoilImage, validateImage } from '../services/geminiService';
import ImageUploader from '../components/ImageUploader';
import Loader from '../components/Loader';
import { SoilReport } from '../types';
import DashboardCard from '../components/DashboardCard';
import BeakerIcon from '../components/icons/BeakerIcon';

const SoilAnalysis: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [report, setReport] = useState<SoilReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback((file: File) => {
        setImageFile(file);
        setReport(null);
        setError(null);
    }, []);
    
    const handleAnalyzeClick = async () => {
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setReport(null);

        try {
            const { base64, mimeType } = await fileToBase64(imageFile);

            // Step 1: Validate the image
            const validationResultJson = await validateImage(base64, mimeType, 'soil');
            const validationResult = JSON.parse(validationResultJson);

            if (validationResult.error) {
                setError(validationResult.error);
                setIsLoading(false);
                return;
            }

            if (!validationResult.isValid) {
                setError(validationResult.feedback);
                setIsLoading(false);
                return;
            }

            // Step 2: Proceed with analysis if validation passes
            const result = await analyzeSoilImage(base64, mimeType);
            const parsedResult = JSON.parse(result);
            if (parsedResult.error) {
                setError(parsedResult.error);
                setReport(null);
            } else {
                setReport(parsedResult);
            }
        } catch (e) {
            console.error(e);
            setError("An unexpected error occurred while parsing the analysis result.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">AI Soil Health Analyzer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <ImageUploader onImageUpload={handleImageUpload} promptText="PNG, JPG, WEBP up to 10MB" />
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={!imageFile || isLoading}
                        className="mt-4 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
                    >
                        {isLoading ? 'Analyzing Soil...' : 'Analyze Soil Image'}
                    </button>
                </div>

                <div>
                    <DashboardCard title="Analysis Report" icon={<BeakerIcon className="w-6 h-6"/>}>
                        {isLoading && <Loader text="Generating soil report..." />}
                        {error && <p className="text-red-500 mt-2 text-center p-4">{error}</p>}
                        {!isLoading && !report && !error && <p className="text-center">Upload an image and click analyze to see the report here.</p>}
                        {report && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                                    <div className="bg-background p-3 rounded-lg">
                                        <p className="text-sm">pH Level</p>
                                        <p className="font-bold text-lg text-text-primary">{report.ph.toFixed(1)}</p>
                                    </div>
                                     <div className="bg-background p-3 rounded-lg">
                                        <p className="text-sm">Nitrogen (N)</p>
                                        <p className="font-bold text-lg text-text-primary">{report.nitrogen} kg/ha</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-lg">
                                        <p className="text-sm">Phosphorus (P)</p>
                                        <p className="font-bold text-lg text-text-primary">{report.phosphorus} kg/ha</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-lg">
                                        <p className="text-sm">Potassium (K)</p>
                                        <p className="font-bold text-lg text-text-primary">{report.potassium} kg/ha</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-lg">
                                        <p className="text-sm">Moisture</p>
                                        <p className="font-bold text-lg text-text-primary">{report.moisture}%</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-text-primary mb-2">AI Recommendations:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {report.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default SoilAnalysis;