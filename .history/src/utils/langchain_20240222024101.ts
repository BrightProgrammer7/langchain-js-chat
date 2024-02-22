export async function generateAnswer(question: string) {
  let answer = "";

  try {
    answer = await llm.predict(question);
  } catch (e) {
    return "Something went wrong";
  }

  return answer;
}
