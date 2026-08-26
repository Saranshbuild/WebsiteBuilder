export const generateResponse = async (prompt) => {
    try {
        const res = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   model: "openrouter/free",
                    messages: [
                        {
                            role: "system",
                            content: "You must return only valid raw json"
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.2,
                    max_tokens: 12000
                })
            }
        );

        const data = await res.json();

        if (!res.ok || !data.choices?.[0]?.message?.content) {
            console.log("OpenRouter failed:", data);
            return null;
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.log("OpenRouter error:", error.message);
        return null;
    }
};
