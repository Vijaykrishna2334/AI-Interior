import { GoogleGenAI, Modality } from "@google/genai";
import { DesignParameters } from '../types';
import { STYLE_GUIDES, MOOD_GUIDES, FIXED_VS_NON_FIXED_PARTS, LIGHTING_GUIDE } from "./promptLibrary";

const createPrompt = (params: DesignParameters): string => {
  const styleGuide = STYLE_GUIDES[params.roomStyle];
  const moodGuide = params.roomFeel !== 'Let AI Decide' ? MOOD_GUIDES[params.roomFeel] : '';

  let prompt = `You are a world-class AI interior designer and architectural visualizer, emulating the output of high-end rendering software like V-Ray or Corona. Your expertise is in creating ultra-photorealistic 3D renderings of room makeovers that are indistinguishable from professional architectural photography. Your task is to edit the provided image of a ${params.roomType} to create a new design based on the user's specific requirements. Adherence to all instructions is mandatory.

---
## CORE CONCEPTS

${FIXED_VS_NON_FIXED_PARTS}
---
`;

  switch (params.workflowType) {
    case 'full':
    case 'partial':
      const functionalRequirements = params.roomUsage.map(usage => {
        const parts = usage.split('–');
        const activity = parts[0]?.trim() || 'Unnamed Activity';
        const items = parts[1]?.trim() || 'No specific items listed.';
        return `- **Activity**: ${activity}\n  - **Mandatory Items**: You MUST include these items in the room: ${items}.`;
      }).join('\n');
      
      prompt += `
## 1. Makeover Scope

- **Type:** ${params.workflowType === 'full' ? 'Full Makeover' : 'Partial Makeover'}
- **Instruction:** ${params.workflowType === 'full' 
    ? 'You have complete creative freedom to change EVERYTHING, including fixed architectural elements like windows, doors, walls, flooring, and fireplaces.' 
    : '**MANDATORY CONSTRAINT**: You MUST preserve all fixed architectural elements (windows, doors, walls, fireplace, structural columns) as they are in the original image. Your changes should only apply to non-fixed items like furniture, paint, decor, rugs, and lighting fixtures.'
}

---

## 2. Functional Requirements

- **Room Type:** ${params.roomType}
- **Primary Uses & Mandatory Furniture**: The design MUST incorporate the following items to support the specified uses. This is a non-negotiable requirement. Each item listed below must be visibly present in the final image.
${functionalRequirements}

---

## 3. Aesthetic & Atmospheric Direction

### A. Chosen Style: ${params.roomStyle}
You must follow this style guide in detail:
${styleGuide}

### B. Desired Mood & Lighting: ${params.roomFeel}
The lighting design is critical. It must follow these rules and evoke the specified mood.

---
#### LIGHTING GUIDE (RULES & DEFINITIONS)
${LIGHTING_GUIDE}
---

${params.roomFeel === 'Let AI Decide' 
? `#### SPECIFIC MOOD TO CREATE: AI-Selected
- **Instruction**: Based on the chosen style ('${params.roomStyle}') and room type, select and apply the most appropriate mood and lighting from the lighting guide. Announce which mood you chose in your description.`
: `#### SPECIFIC MOOD TO CREATE: ${params.roomFeel}
${moodGuide}`
}
---

## 4. User's Special Requests

- "${params.specialRequests || 'None.'}"
- IMPORTANT: If any special request directly conflicts with the style guide, the user's special request takes priority.

---
`;
      break;
    
    case 'match':
      prompt += `
## 1. Makeover Scope: Match a Photo

- **Instruction**: You have been provided two images.
  - **Image 1**: The user's original room that needs a makeover.
  - **Image 2**: An inspiration photo.
- **Your Task**: Redesign the user's room (Image 1) to replicate the aesthetic, style, color palette, mood, and furniture choices of the inspiration photo (Image 2).
- **CRITICAL RULE**: You MUST RETAIN the core architectural structure (walls, windows, doors, ceiling height) of the user's original room (Image 1). You are essentially applying the 'skin' and content of Image 2 onto the 'bones' of Image 1.
- **User's Special Requests**: "${params.specialRequests || 'None. These are minor adjustments to consider while matching the photo.'}"

---
`;
      break;

    case 'custom':
      prompt += `
## 1. Makeover Scope: Custom Request

- **Instruction**: The user has provided a specific, custom request. Your primary goal is to follow these instructions precisely. All other parameters are secondary.
- **CRITICAL RULE**: You MUST preserve all fixed architectural elements (windows, doors, walls, fireplace, structural columns) as they are in the original image, UNLESS the user explicitly asks to change them in their request.
- **USER'S CUSTOM REQUEST**:
"""
${params.specialRequests || 'The user did not provide a request. Please perform a general improvement based on modern design principles.'}
"""
---
`;
      break;
  }

  prompt += `
## 5. Photographic Emulation

- **Camera & Lens**: Simulate the image as if captured with a professional DSLR camera using a prime lens (e.g., 35mm or 50mm) to achieve a natural field of view and subtle depth of field. Avoid any unrealistic wide-angle distortion.
- **Composition**: Apply principles of strong photographic composition. Ensure the main subject is well-placed and the overall image is balanced and visually appealing.

---

## Final Output Generation

Before generating the final image, you must perform a final quality check to ensure all instructions have been met to the highest standard.

### **QUALITY CHECKLIST (MANDATORY - NON-NEGOTIABLE)**

1.  **ULTRA-PHOTOREALISM & PHYSICAL ACCURACY**: Does the final image look like a real photograph taken by a professional architectural photographer?
    -   **Lighting, Shadows, Reflections**:
        -   Mandate physically accurate global illumination. Light MUST bounce, reflect, and refract correctly.
        -   Shadows MUST have soft, realistic penumbras. No hard, artificial edges unless the light source is small and intense (like a bare bulb).
        -   Reflections on surfaces (glass, metal, water, polished floors) MUST be accurate and distortion-free.
        -   Check for realistic caustics from light passing through glass or reflecting off curved surfaces.
    -   **Materiality & Texturing (PBR Simulation)**:
        -   All materials MUST simulate Physically Based Rendering (PBR) principles.
        -   Textures MUST have high-resolution detail. Wood grain must be clear, fabric weaves visible, stone surfaces must show natural imperfections.
        -   Surfaces MUST have correct properties: albedo (color), roughness (matte/glossy), metallic, and normal maps (for fine detail like bumps and pores).
    -   **Geometry & Form**:
        -   All lines MUST be straight and clean. No warped or distorted perspectives.
        -   Objects MUST rest firmly on surfaces. No floating items.
        -   Ensure perfect seams and joins between surfaces (e.g., where wall meets floor).
    -   **Atmosphere & Post-Processing Simulation**:
        -   Simulate subtle atmospheric effects like volumetric light (sunbeams) if appropriate.
        -   Apply simulated post-processing: perfect color grading, subtle lens effects (like chromatic aberration only at the very edges, if any), and a high-dynamic range (HDR) look. AVOID over-saturation or unrealistic "Instagram filter" effects.

2.  **INSTRUCTION ADHERENCE**: Have you followed *every* instruction precisely?
    -   **Workflow Rules**: If 'Partial Makeover', are all fixed elements 100% untouched? If 'Match a Photo', have you captured the essence of the inspiration image while retaining the original room's architecture?
    -   **Style Guide**: Is every single item (furniture, lighting, decor) a perfect fit for the chosen '${params.roomStyle}' style guide?
    -   **Functional Layout & Mandatory Items**: Does the furniture arrangement support the specified 'Primary Uses'? Have you included *every single one* of the 'Mandatory Items' listed in the Functional Requirements? Double-check the list now.
    -   **User Requests**: Have the user's 'Special Requests' been prioritized and implemented correctly?

### **FINAL TASK**

1.  **Generate the Image**: After rigorously applying every check on the mandatory quality list, generate a single, flawless, ultra-photorealistic image. The output must be indistinguishable from a V-Ray render and represent the peak of your capability as a state-of-the-art visualizer.
2.  **Generate the Description**: Write a brief, confident summary of the design. Start with "Here is your new room design:". Explain how the new design fulfills the user's requirements for style, feel, and function. If you made an AI-driven choice (like for 'Let AI Decide'), state what you chose and why.

The output must contain both the edited image and the descriptive text.
  `;
  return prompt;
};


export const generateRoomMakeover = async (
  base64Image: string,
  mimeType: string,
  params: DesignParameters,
  inspirationImage?: { base64: string; mimeType: string; }
): Promise<{ imageUrl: string; text: string; prompt: string }> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = createPrompt(params);

  const userImagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  // FIX: The `parts` array was being inferred with a type that only allowed image parts,
  // causing an error when adding a text part.
  // This was fixed by collecting all image parts first, then creating the final
  // `parts` array with the text prompt to ensure a correct union type is inferred.
  const imageParts = [userImagePart];

  if (inspirationImage && params.workflowType === 'match') {
    const inspirationImagePart = {
      inlineData: {
        data: inspirationImage.base64,
        mimeType: inspirationImage.mimeType,
      },
    };
    imageParts.push(inspirationImagePart);
  }

  const parts = [...imageParts, { text: prompt }];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: parts,
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let imageUrl = '';
  let text = 'No description was generated.';

  // Per documentation, response can have multiple parts.
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      text = part.text;
    } else if (part.inlineData) {
      const base64ImageBytes = part.inlineData.data;
      imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
  }

  if (!imageUrl) {
    throw new Error("The API did not return an image. Please try again.");
  }

  return { imageUrl, text, prompt };
};