const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

   export const chatSession = model.startChat({
      generationConfig,
 
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 60 seconds video on topic : interesting historical story with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and content Text as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, with merchants selling goods, people chatting, and a chariot passing through the crowd.\",\n    \"contentText\": \"In the heart of ancient Rome, where the Colosseum stood tall and emperors ruled with an iron fist, there lived a young scribe named Marcus. Marcus, a man of humble origins, dreamt of a life beyond the confines of his quill and parchment.\"\n  },\n  {\n    \"imagePrompt\": \"Marcus, a young man with inquisitive eyes and a determined expression, reading a scroll by candlelight in a small room.\",\n    \"contentText\": \"One day, while poring over ancient texts in the city's grand library, Marcus stumbled upon a cryptic message hidden within the pages of a forgotten scroll. It spoke of a legendary artifact, the Amulet of Veritas, said to possess the power to reveal the truth behind any secret.\"\n  },\n  {\n    \"imagePrompt\": \"A map of the Roman Empire with a highlighted route leading from Rome to the mysterious island of Crete.\",\n    \"contentText\": \"The scroll indicated that the Amulet was hidden on the island of Crete, a perilous journey across the vast Mediterranean Sea. Intrigued and driven by an unyielding curiosity, Marcus decided to embark on this dangerous quest.\"\n  },\n  {\n    \"imagePrompt\": \"A Roman galley ship sailing through stormy seas, with Marcus standing on deck, his face etched with determination.\",\n    \"contentText\": \"His voyage was fraught with peril. Storms battered his ship, pirates threatened his life, and the relentless sun scorched his skin. But Marcus persevered, his unwavering belief in the Amulet's existence fueling his resolve.\"\n  },\n  {\n    \"imagePrompt\": \"A picturesque view of the island of Crete, with ancient ruins and a towering mountain in the background.\",\n    \"contentText\": \"Finally, after weeks of arduous travel, Marcus reached the shores of Crete. He was greeted by a land steeped in mystery, where ancient myths and legends whispered through the wind.\"\n  },\n  {\n    \"imagePrompt\": \"Marcus, exploring the labyrinthine tunnels of an ancient temple on Crete, with flickering torches illuminating the path.\",\n    \"contentText\": \"Guided by the cryptic clues in the scroll, Marcus ventured into the labyrinthine tunnels of an ancient temple. The air was thick with the scent of incense and the echoes of forgotten voices.\"\n  },\n  {\n    \"imagePrompt\": \"A grand chamber within the temple, with a shimmering golden amulet resting on an altar, guarded by a fierce lion statue.\",\n    \"contentText\": \"Deep within the temple's heart, he discovered a grand chamber. In the center, bathed in a soft golden light, lay the Amulet of Veritas, resting upon an altar guarded by a fierce lion statue.\"\n  },\n  {\n    \"imagePrompt\": \"Marcus, his eyes wide with awe and wonder, holding the Amulet of Veritas in his hand, its surface glowing faintly.\",\n    \"contentText\": \"Marcus carefully approached the altar, his heart pounding with anticipation. He reached out and touched the amulet, its surface radiating a faint golden glow.\"\n  },\n  {\n    \"imagePrompt\": \"Marcus, standing on a hill overlooking Crete, gazing at the horizon as he holds the amulet, a thoughtful expression on his face.\",\n    \"contentText\": \"As he held the Amulet, Marcus realized that its true power lay not in revealing secrets, but in illuminating the path to truth and understanding.\"\n  },\n  {\n    \"imagePrompt\": \"A panoramic view of ancient Rome, with the Colosseum, the Forum, and other famous landmarks visible, showcasing the bustling city life.\",\n    \"contentText\": \"Returning to Rome, Marcus shared his journey and the wisdom he had gained with his fellow scribes. The Amulet of Veritas, though not a source of hidden knowledge, became a symbol of the relentless pursuit of truth and the boundless power of human curiosity.\"\n  }\n]\n```\n\n**Explanation of the JSON structure:**\n\n* Each object in the JSON array represents a scene in the video.\n* **imagePrompt:** This field contains the text prompt that will be used to generate the image for the scene using an AI image generator. \n* **contentText:** This field contains the text that will be narrated over the image in the scene.\n\n**How to use the JSON:**\n\n1. **Choose an AI image generator:** Select a realistic image generator that accepts text prompts, such as Midjourney, DALL-E 2, or Stable Diffusion.\n2. **Generate images:**  For each scene, input the `imagePrompt` into your chosen AI image generator to create a realistic image.\n3. **Edit images (optional):** You may want to adjust the generated images slightly to fit your video style.\n4. **Create video:** Combine the generated images with the `contentText` to create a 60-second video. You can use video editing software to add transitions, music, and other effects.\n\n**Note:** The image prompts are designed to create realistic scenes. You can adjust them to be more specific to your desired style or to incorporate other details from the story."},
          ],
        },
      ],
    });
  
   