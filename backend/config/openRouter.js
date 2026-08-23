export const generateResponse = async(prompt)=>{
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
    'X-OpenRouter-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
        {
            role:'system',
            content:'You must return only valid raw json'
        },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature:0.2
  }),
});

if(!res.ok){
    const err = await res.text();
    throw new Error("openrouter err"+err)
}

const data = await res.json()
return data.choices[0].message.content
}
