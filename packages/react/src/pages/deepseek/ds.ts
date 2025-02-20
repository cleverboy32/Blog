import OpenAI from "openai";

const openai = new OpenAI({
});

const completion = openai.chat.completions.create({
  model: "gpt-3.5",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

console.log(3333)

completion.then((result) => console.log(result.choices[0].message));

console.log(3333)
