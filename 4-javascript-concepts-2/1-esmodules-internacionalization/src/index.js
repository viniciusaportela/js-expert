import TerminalController from './terminalController.js'
import Person from './person.js'
import database from '../database.json'
import { save } from './repository.js'

const DEFAULT_LANGUAGE = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    // 2 Bicicleta,Aviao,Navio 200000 2000-01-01 2002-02-01
    const answer = await terminalController.question()

    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished!')
      return;
    }

    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted(DEFAULT_LANGUAGE))
    await save(person)

    return mainLoop()
  } catch (error) {
    console.error('Error: ', error)
    return mainLoop()
  }
}

await mainLoop()