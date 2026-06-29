import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
      Te serán proveidos textos en español con posibles errores ortograficos y gramaticales,
      Las pabras usadas deben existir en el diccionario de la Real Academia Española,
      Debes de responder en formato JSON,
      tu tares es corregirlos y retornar infromación soluciones,
      tambien debes de dat un porcentaje de acierto por el usuario,

      si no hay errores, debes de retornar un mensaje de felicitaciones.

      Ejemplo de salida:
      {
        userScore: number,
        errors: string[], // ["'error' -> solución"]
        message: string, // mensaje de felicitaciones con emojis y texto
      }

      `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4o',
    temperature: 0.3,
    max_completion_tokens: 150,
    response_format: { type: 'json_object' },
  });

  console.log(completion.choices[0].message.content);

  const jsonResp = JSON.parse(completion.choices[0].message.content ?? '{}');

  return jsonResp;
};
