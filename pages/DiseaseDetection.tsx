
import React, { useState, useCallback } from 'react';
import { fileToBase64, detectCropDisease, validateImage } from '../services/geminiService';
import ImageUploader from '../components/ImageUploader';
import Loader from '../components/Loader';
import { DiseaseReport } from '../types';
import DashboardCard from '../components/DashboardCard';
import LeafIcon from '../components/icons/LeafIcon';

const DiseaseDetection: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [report, setReport] = useState<DiseaseReport | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback((file: File) => {
        setImageFile(file);
        setReport(null);
        setError(null);
    }, []);

    const sendDiseaseNotification = (report: DiseaseReport) => {
        if (Notification.permission === 'granted') {
            new Notification('AgriSmart: Disease Alert!', {
                body: `High-confidence detection of ${report.diseaseName}. Open the app for treatment options.`,
                icon: '/vite.svg',
            });
        }
    };
    
    const handleAnalyzeClick = async () => {
        if (!imageFile) {
            setError("Please upload an image of the crop leaf.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setReport(null);

        try {
            const { base64, mimeType } = await fileToBase64(imageFile);

            // Step 1: Validate the image
            const validationResultJson = await validateImage(base64, mimeType, 'crop');
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
            const result = await detectCropDisease(base64, mimeType);
            const parsedResult = JSON.parse(result);
            if (parsedResult.error) {
                setError(parsedResult.error);
                setReport(null);
            } else {
                setReport(parsedResult);
                // Trigger notification for high-confidence detections
                if (parsedResult.confidence > 0.9 && parsedResult.diseaseName !== 'Healthy') {
                    sendDiseaseNotification(parsedResult);
                }
            }
        } catch (e) {
            console.error(e);
            setError("An unexpected error occurred while parsing the disease analysis.");
        } finally {
            setIsLoading(false);
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence > 0.85) return 'text-green-600';
        if (confidence > 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-text-primary mb-6">Computer Vision Disease Detection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <ImageUploader onImageUpload={handleImageUpload} promptText="Upload image of affected crop leaf" />
                    <button
                        onClick={handleAnalyzeClick}
                        disabled={!imageFile || isLoading}
                        className="mt-4 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors disabled:bg-gray-400"
                    >
                        {isLoading ? 'Scanning...' : 'Scan for Disease'}
                    </button>
                </div>
                <div>
                    <DashboardCard title="Disease Report" icon={<LeafIcon className="w-6 h-6"/>}>
                        {isLoading && <Loader text="Identifying disease..." />}
                        {error && <p className="text-red-500 mt-2 text-center p-4">{error}</p>}
                        {!isLoading && !report && !error && <p className="text-center">Upload a crop image and click scan to see the diagnosis here.</p>}
                        {report && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-text-primary">{report.diseaseName}</h3>
                                <p><strong>Confidence: </strong><span className={`font-bold ${getConfidenceColor(report.confidence)}`}>{(report.confidence * 100).toFixed(1)}%</span></p>
                                <p><strong>Description:</strong> {report.description}</p>
                                
                                {report.diseaseName !== 'Healthy' && (
                                  <>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-2">Organic Treatments:</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {report.treatment.organic.map((rec, i) => <li key={`org-${i}`}>{rec}</li>)}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-text-primary mb-2">Chemical Treatments:</h4>
                                        <ul className="list-disc list-inside space-y-1">
                                            {report.treatment.chemical.map((rec, i) => <li key={`chem-${i}`}>{rec}</li>)}
                                        </ul>
                                    </div>
                                  </>
                                )}
                            </div>
                        )}
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
};

export default DiseaseDetection;