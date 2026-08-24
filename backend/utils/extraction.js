const extractJson = async (text) => {
    if (!text) {
        return null
    }

    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    const openBracket = cleaned.indexOf('{')
    const closeBracket = cleaned.lastIndexOf('}')

    if (openBracket === -1 || closeBracket === -1) {
        return null
    }

    const jsonString = cleaned.slice(openBracket, closeBracket + 1)

    try {
        return JSON.parse(jsonString)
    } catch (error) {
        console.log("JSON PARSE ERROR:", error.message)
        return null
    }
}

export default extractJson
