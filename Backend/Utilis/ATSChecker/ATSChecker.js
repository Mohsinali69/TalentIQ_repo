import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

const ATSChecker = async formData => {
  const data = JSON.stringify(formData);
  const textPrompt = `
    Suppose ATS score in percentage is X% for someone with the following qualifications:

    ${data}
    
    So, if I ask "What is the estimated ATS score based on this information?", then just give the exact value of X, nothing else.
  `;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  console.log("API clicked ATS");

  try {
    const result = await chatSession.sendMessage(textPrompt);

    // Extract and parse the numeric value from the response
    const responseText = result.response.text();
    console.log("responseText", responseText);
    const atsScore = parseFloat(responseText.replace(/[^\d.]/g, '')); // Extract numbers from the response

    if (isNaN(atsScore)) {
      throw new Error("Unable to parse ATS score from response");
    }

    return atsScore; // Return the numeric value
  } catch (error) {
    console.error("Error fetching ATS score:", error.message);
    throw error; // Propagate the error
  }
};

export default ATSChecker;
