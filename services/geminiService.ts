
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeBias(): Promise<AnalysisResult> {
    const prompt = `
      Act as an AI Fairness expert conducting an audit of the COMPAS recidivism dataset. 
      Your task is to analyze racial bias in its risk scores, specifically comparing 'African-American' and 'Caucasian' defendants. 
      Base your analysis on the well-documented findings from public research, like ProPublica's investigation.

      Generate a response in a JSON object format. The JSON object should conform to the provided schema. Do not include any markdown formatting like \`\`\`json in the output.

      The report should be approximately 300 words, summarizing the key findings from the metrics and visualizations, and suggesting potential remediation steps. The remediation steps should be practical and actionable.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        metrics: {
                            type: Type.ARRAY,
                            description: "A list of key fairness metrics.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    label: { type: Type.STRING, description: "The name of the metric." },
                                    value: { type: Type.STRING, description: "The value of the metric, as a string." },
                                    description: { type: Type.STRING, description: "A brief explanation of the metric." },
                                    group: { type: Type.STRING, description: "The demographic group this metric applies to (e.g., 'African-American', 'Caucasian', 'Disparity')." }
                                }
                            }
                        },
                        chartData: {
                            type: Type.ARRAY,
                            description: "Data for visualizing false positive rates.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    group: { type: Type.STRING, description: "The racial group." },
                                    "False Positive Rate (%)": { type: Type.NUMBER, description: "The false positive rate for this group as a percentage." }
                                }
                            }
                        },
                        report: {
                            type: Type.STRING,
                            description: "A comprehensive report of about 300 words summarizing findings and suggesting remediation steps."
                        }
                    }
                }
            }
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        // Basic validation
        if (!result.metrics || !result.chartData || !result.report) {
            throw new Error("Invalid response structure from Gemini API.");
        }

        return result as AnalysisResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch or parse bias analysis from the AI model.");
    }
}
