const extractJson = async (text) => {
    if (!text) {
        return
    }
    const cleaned = text.
        replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();//trim so no empty space

        const openBracket = cleaned.indexOf('{')
        const closeBracket = cleaned.lastIndexOf('}')
        if(openBracket === -1 || closeBracket === -1) return null
        const jsonString = cleaned.slice(openBracket, closeBracket+1)
        return JSON.parse(jsonString)
}

export default extractJson