/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Ejemplo de como llamarle --> 
//    abre aupa athletic y di hola mundo
//    abre aupa athletic y di Dime cuantos años tiene el athletic
//    abre aupa athletic y di Dime el jugador con el dorsal 20
//    abre aupa athletic para hola mundo





const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('Acabas de abrir AupaAthletic')
      .getResponse();
  },
};

// myhandlers

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';
    //.reprompt('No quiero callarme')
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

//Dime cuantos años tiene el athletic
const AnosAthleticIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AnosAthleticIntent';
  },
  handle(handlerInput) {
    const speechText = 'El Athletic se fundo en 1898, por lo que tiene 121 años de historia';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  }
};

//Dime el jugador con el dorsal {numero}
const DecirDorsalNumeroHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    
    return request.type === 'IntentRequest'
      && request.intent.name === 'DecirDorsalNumero';
  },
  handle(handlerInput) {
    var num = handlerInput.requestEnvelope.request.intent.slots.numero.value;
    const voz = '<say-as interpret-as="digits">'+num+'</say-as>'
    return handlerInput.responseBuilder
      .speak('El jugador con el dorsal numero ' + voz + ' es '+ data[num])
      .getResponse();
  }
};



// built in
const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const HELP_MESSAGE = 'Dime algo porfa... ¿En que quieres que te ayude?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Adios!';

const data = [
  'Unai Simon',
  'Cristian Ganea',
  'Unai Nuñez',
  'Iñigo Martinez',
  'Yeray Alvarez',
  'Mikel San Jose',
  'Beñat Etxebarria',
  'Unai Lopez',
  'Iñaki Williams',
  'Iker Muniain',
  'Iñigo Cordoba',
  'Gaizka Larrazabal',
  'Iago Herrerin',
  'Dani Garcia',
  'Iñigo Lekue',
  'Mikel Vesga',
  'Yuri Berchiche',
  'Oscar de Marcos',
  'Ibai Gomez',
  'Aritz Aduriz',
  'Ander Capa',
  'Raul Garcia',
  'Kenan Kodro',
  'Mikel Balenziaga',
  'Asier Villalibre',
  'A partir de este numero, solo queda Oihan Sancet con el dorsal 34',
  ];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    AnosAthleticIntentHandler,
    DecirDorsalNumeroHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();