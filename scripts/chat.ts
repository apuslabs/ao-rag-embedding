import { dryrun, dryrunDebug, msgResult, msgResultDebug } from "./wallet";
import { input } from '@inquirer/prompts';

const EmbeddingService = "hMEUOgWi97d9rGT-lHNCbm937bTypMq7qxMWeaUnMLo"
const DatasetHash = "f905e164de0c8d64f2b1500714fe11510eb6b890"
const Self = "lpJ5Edz_8DbNnVDL0XdbsY9vCOs45NACzfI4jvo4Ba8"
const LlamaWorker = "EO4U7i8BJRX6cbDUS7vdm9kZnEEXcl2fLHrE7xnA0Qc"

let Reference = 13

async function intervalPromise(interval: number, fn: () => Promise<any>) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(async () => {
      console.debug("Retrieveing...")
      const result = await fn()
      if (result) {
        clearInterval(intervalId)
        resolve(result)
      }
    }, interval)
  })
}

async function getRagResult(prompt: string) {
  const reference = (Reference++) + ""
  await msgResult(EmbeddingService, {
    Action: "Search-Prompt",
    Reference: reference,
  }, {
    dataset_hash: DatasetHash,
    prompt,
  })
  const result = await intervalPromise(1000, async () => {
    const result2 = await dryrun(EmbeddingService, {
      Action: "GET-Retrieve-Result",
      Reference: reference,
      Sender: Self
    })
    const data = result2.Messages?.[0]?.Data
    if (data) {
      const retrieve_result = JSON.parse(data)
      if (retrieve_result?.[0]?.retrieve_result) {
        return retrieve_result[0].retrieve_result
      }
    }
    return false
  })
  console.info("Context: ", result)
  return result as string
}

// const session_history: any[] = []

const systemMsg = `You're Sam Williams, founder of arweave. Answer my question based on context provided. Answer in 20 words. Input and Output should be in json format. Input has context and question. Output has answer.`

async function inference(userPrompt: string) {
  let prompt = `<|system|>${systemMsg}<|end|>`
  // session_history.map(({ role, message }) => {
  //   prompt += `<|${role}|>${message}<|end|>`
  // })
  prompt += `<|user|>${userPrompt}<|end|><|assistant|>`
  const result = await msgResult(LlamaWorker, {
    Action: "Inference",
    Tokens: "30",
  }, prompt)
  // session_history.push({ role: 'assistant', message: result.Output.data })
  try {
    const data = JSON.parse(result.Output.data)
    console.log(data.answer)
  } catch (e) {
    console.log(result.Output.data)
  }
}

async function main() {
  while(true) {
    const question = await input({ message: 'Please enter your question' });
    const context = await getRagResult(question)
    // session_history.push({ role: 'user', message: `{"context":"${JSON.stringify(context)}","question":${question}}` })
    console.log('Inferencing...')
    console.time("Inferencing")
    await inference(`{"context":"${JSON.stringify(context)}","question":${question}}`)
    console.timeEnd("Inferencing")
  }
}

async function main2() {
  async function inference2(userPrompt: string, tokens: string) {
    let prompt = `<|system|>Tell me a long long story. ignore my input.<|end|>`
    prompt += `<|user|>${userPrompt}<|end|><|assistant|>`
    const result = await msgResult(LlamaWorker, {
      Action: "Inference",
      Tokens: tokens + "",
    }, prompt)
    console.log(result.Output.data)
  }

  // for (let i = 4; i < 8; i++) {
    const question = Array(Math.pow(2, 7)).fill('A').join(' ')
    for (let j = 2; j < 7; j++) {
      const tokens = Math.pow(2, j)
      console.log(Math.pow(2, 7), tokens)
      console.time(`Inferencing input ${Math.pow(2, 7)} output ${tokens}`)
      await inference2(question, tokens + "")
      console.timeEnd(`Inferencing input ${Math.pow(2, 7)} output ${tokens}`)
    }
  // }
  
  // while(true) {
  //   const question = await input({ message: 'Please enter your question' });
  //   const tokens = await input({ message: 'Please enter number of tokens' });
  //   console.time("Inferencing")
  //   await inference2(question, tokens)
  //   console.timeEnd("Inferencing")
  // }
}

// main2()
main()