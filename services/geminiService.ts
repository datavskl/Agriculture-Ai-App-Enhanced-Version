
import { GoogleGenAI, GenerateContentResponse, Type, Chat, Part } from "@google/genai";
import { WeatherData, MarketData, Task } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
let chat: Chat | null = null;

/**
 * A centralized error handler for the Gemini API.
 * @param error The error object caught from the API call.
 * @returns A user-friendly error message string.
 */
const handleApiError = (error: any): string => {
    console.error("Gemini API Error:", error);
    const errorMessage = error.toString();
    if (errorMessage.includes('Rpc failed') || errorMessage.includes('xhr error')) {
        return 'A network error occurred. Please check your internet connection and try again.';
    }
    if (errorMessage.includes('API key not valid')) {
        return 'Your API key is invalid. Please configure it correctly.';
    }
    return 'An unexpected error occurred while contacting the AI service. Please try again later.';
};

export const getChatResponse = async (message: string, base64Image?: string, mimeType?: string): Promise<string> => {
    try {
        if (!chat) {
            chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: `You are Agri-Chat, an expert AI agricultural advisor. Your goal is to provide concise, accurate, and actionable advice to farmers. Answer questions about crop management, disease treatment, soil health, market prices, and sustainable farming practices. If an image is provided, analyze it as the primary context for your answer. Use simple language. If you don't know the answer, say so.`,
                },
            });
        }
        
        const content: Part[] = [{ text: message }];
        if (base64Image && mimeType) {
            content.unshift({ inlineData: { mimeType, data: base64Image } });
        }

        const response = await chat.sendMessage({ parts: content });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

export const validateImage = async (base64Image: string, mimeType: string, context: 'soil' | 'crop'): Promise<string> => {
    const prompt = `
        You are an AI image validator for an agricultural app.
        Analyze this image to see if it's suitable for analysis. The image should be a clear, well-lit, and close-up photo of ${context === 'soil' ? 'a soil sample' : 'a single plant leaf'}.
        It should NOT be blurry, too dark, too far away, or contain irrelevant objects.
        Respond ONLY with a JSON object.
    `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Image } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isValid: { type: Type.BOOLEAN, description: "Whether the image is valid for analysis." },
                        feedback: { type: Type.STRING, description: "Feedback for the user if the image is not valid, explaining why (e.g., 'Image is too blurry', 'This does not look like soil.')." }
                    },
                    required: ["isValid", "feedback"]
                }
            }
        });
        return response.text;
    } catch (error) {
        const errorMessage = handleApiError(error);
        return JSON.stringify({ error: errorMessage });
    }
};


export const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        const mimeType = result.split(',')[0].split(':')[1].split(';')[0];
        resolve({ base64, mimeType });
    };
    reader.onerror = error => reject(error);
  });
};

export const getWeatherInsights = async (weather: WeatherData): Promise<string> => {
  const prompt = `
    Given the following weather data for a farm, provide actionable insights and recommendations for a farmer.
    Keep the advice concise, in bullet points, and easy to understand.
    Current Temperature: ${weather.temperature}°C
    Humidity: ${weather.humidity}%
    Wind Speed: ${weather.windSpeed} km/h
    Precipitation Chance: ${weather.precipitation}%
    5-Day Forecast: ${JSON.stringify(weather.forecast)}

    Focus on irrigation, pest control, and activities to avoid or prioritize.
  `;
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
  } catch (error) {
    return handleApiError(error);
  }
};

export const analyzeSoilImage = async (base64Image: string, mimeType: string): Promise<string> => {
    const prompt = `Analyze the provided soil image. Based on its color, texture, and visible characteristics, provide a detailed soil health assessment. The numbers should be estimated values (e.g., ph between 5.5 and 7.5). The recommendations should be practical advice for improving the soil.`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Image } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        ph: { type: Type.NUMBER, description: "The pH level of the soil." },
                        nitrogen: { type: Type.NUMBER, description: "Estimated Nitrogen content in kg/ha." },
                        phosphorus: { type: Type.NUMBER, description: "Estimated Phosphorus content in kg/ha." },
                        potassium: { type: Type.NUMBER, description: "Estimated Potassium content in kg/ha." },
                        moisture: { type: Type.NUMBER, description: "Estimated moisture percentage." },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "A list of actionable recommendations for soil improvement."
                        }
                    },
                    required: ["ph", "nitrogen", "phosphorus", "potassium", "moisture", "recommendations"]
                }
            }
        });
        return response.text;
    } catch (error) {
        const errorMessage = handleApiError(error);
        return JSON.stringify({ error: errorMessage });
    }
};

export const detectCropDisease = async (base64Image: string, mimeType: string): Promise<string> => {
    const prompt = `Analyze this image of a plant leaf. Identify any diseases or pests. If the plant is healthy, set diseaseName to "Healthy" and confidence to 1.`;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType, data: base64Image } },
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        diseaseName: { type: Type.STRING, description: "The name of the detected disease or 'Healthy'." },
                        confidence: { type: Type.NUMBER, description: "The confidence score of the detection, from 0 to 1." },
                        description: { type: Type.STRING, description: "A brief description of the disease." },
                        treatment: {
                            type: Type.OBJECT,
                            properties: {
                                organic: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of organic treatment suggestions."
                                },
                                chemical: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "List of chemical treatment suggestions."
                                }
                            },
                            required: ["organic", "chemical"]
                        }
                    },
                    required: ["diseaseName", "confidence", "description", "treatment"]
                }
            }
        });
        return response.text;
    } catch (error) {
        const errorMessage = handleApiError(error);
        return JSON.stringify({ error: errorMessage });
    }
};

export const getMarketAnalysis = async (data: MarketData[], crop: string): Promise<string> => {
    const prompt = `
    Analyze the following historical market price data for ${crop} over the last 12 months.
    Data: ${JSON.stringify(data)}
    
    Provide a market analysis including:
    1. A summary of the price trend.
    2. A price prediction for the next 3 months.
    3. Recommendations on the optimal selling time.
    
    Format the response clearly with headings for each section. Be optimistic but realistic.
    `;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getYieldPrediction = async (cropType: string, plantingDate: string, farmSize: number, soilType: string): Promise<string> => {
    const prompt = `
    As an agricultural AI, predict the potential crop yield for a farm with the following details:
    - Crop Type: ${cropType}
    - Planting Date: ${plantingDate}
    - Farm Size: ${farmSize} acres
    - Soil Type: ${soilType}
    
    Provide a prediction in tons per acre. Also include key factors that could positively or negatively influence this prediction, and 2-3 recommendations to maximize the yield. Format the response clearly.
    `;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getResourceOptimizationWithROI = async (cropType: string, growthStage: string, plotSize: number): Promise<string> => {
    const prompt = `
    As an agricultural AI, provide resource optimization recommendations for the following scenario:
    - Crop Type: ${cropType}
    - Current Growth Stage: ${growthStage}
    - Plot Size: ${plotSize} acres
    
    Provide precise recommendations for irrigation, N-P-K fertilizer application, and pest control.
    For each recommendation (e.g., a specific fertilizer), also provide an estimated cost in Indian Rupees (₹) and a predicted Return on Investment (ROI) as a percentage, based on potential yield increase or prevention of loss.
    
    Format the response in a clear, actionable format with headings for Irrigation, Fertilizer, Pest Control, and a summary of Financials (Total Estimated Cost and Average Predicted ROI).
    `;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

export const generateFarmReport = async (weather: WeatherData, marketData: MarketData[], tasks: Task[]): Promise<string> => {
    const prompt = `
    As an AI farm analyst, generate a weekly summary report based on the following data. The report should be easy to read, well-structured with headings, and provide a high-level overview.

    1.  **Weather Summary**: Briefly describe the weather for the past week and the upcoming forecast. Highlight any critical weather events.
        -   Data: ${JSON.stringify(weather)}

    2.  **Task Management Overview**: Summarize the task activity. Mention the number of completed vs. pending tasks. Highlight any overdue high-priority tasks.
        -   Data: ${tasks.length} total tasks. ${tasks.filter(t => t.completed).length} completed. ${tasks.filter(t => !t.completed && t.isHighPriority).length} high-priority tasks pending.

    3.  **Market Intelligence Summary**: Analyze the provided market data. What is the current trend? Is it a good time to sell?
        -   Data: ${JSON.stringify(marketData)}

    4.  **Overall Recommendations**: Based on all the data, provide 2-3 key strategic recommendations for the farmer for the upcoming week.

    Structure the output nicely.
    `;
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

// New Service Functions

export const getPestPrediction = async (weather: WeatherData, cropType: string): Promise<string> => {
    const prompt = `
    As an agricultural pest prediction AI, analyze the following data to forecast potential pest and disease outbreaks for the next 7-10 days.
    - Crop Type: ${cropType}
    - Upcoming 5-Day Weather Forecast: ${JSON.stringify(weather.forecast)}
    - Current Conditions: Temperature ${weather.temperature}°C, Humidity ${weather.humidity}%

    Identify 1-2 key pests or diseases that are high-risk under these conditions for this crop. 
    For each risk, provide:
    1.  A risk level (Low, Medium, High).
    2.  The reasons for this risk (e.g., "High humidity and warm temperatures favor fungal growth").
    3.  A list of preventive actions the farmer can take now.
    
    Format the response clearly. If no significant risks are apparent, state that the risk is low.
    `;
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};

export const getCropRotationPlan = async (soilHistory: string, pastCrops: string[], farmSize: number): Promise<string> => {
    const prompt = `
    As an AI agronomy planner, create a 3-year crop rotation plan for a ${farmSize}-acre farm.
    - Soil History: ${soilHistory}
    - Crops grown in the last 2 years: ${pastCrops.join(', ')}

    The goal is to improve soil fertility, break pest and disease cycles, and maximize long-term profitability.
    Suggest a primary crop and a cover crop for each year. Justify your choices briefly.
    Present the plan in a simple year-by-year table format.
    `;
    try {
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
        return response.text;
    } catch (error) {
        return handleApiError(error);
    }
};
