import axios from 'axios'

export const getAdvice = async (question, weather) => {
  console.log('weather', weather)
  const prompt = `The weather forecast is: ${weather}. ${question}`

  const response = await axios.post(
    'https://api.openai.com/v1/engines/text-davinci-003/completions',
    {
      prompt,
      max_tokens: 100,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
    }
  )

  return response.data.choices[0].text.trim()
}
