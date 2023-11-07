const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [
      authenticate('jwt'),
    ],
  },

  after: {
    all: [],
    find: [
      async ({data,result,app})=>{
        if(!result.total){
          data = {
            title:'Understanding Acid Rain: Causes, Effects, and Mitigation Strategies',
            questionFlow:[
              {
                data: {
                  label: 'How many primary factors typically contribute to the formation of acid rain?'
                },
                id: 'question_942153193893',
                position: {
                  x: 161,
                  y: -29.5
                },
                type: 'question'
              },
              {
                data: {
                  label: 'One primary factors contribute to the formation of acid rain: sulfur dioxide (SO2) and nitrogen oxides (NOx) emitted from industrial processes.'
                },
                id: 'answer_183824486546',
                position: {
                  x: -539,
                  y: 57.5
                },
                type: 'answer'
              },
              {
                data: {
                  label: 'Two primary factors contribute to the formation of acid rain: sulfur dioxide (SO2) and nitrogen oxides (NOx) emitted from industrial processes and vehicle emissions.'
                },
                id: 'answer_1206322484724',
                position: {
                  x: -43,
                  y: 137.5
                },
                type: 'answer'
              },
              {
                data: {
                  label: 'One primary factors contribute to the formation of acid rain: vehicle emissions.'
                },
                id: 'answer_1564053232954',
                position: {
                  x: 472,
                  y: 70.5
                },
                type: 'answer'
              },
              {
                id: 'reactflow__edge-question_942153193893null-answer_183824486546null',
                source: 'question_942153193893',
                sourceHandle: null,
                target: 'answer_183824486546',
                targetHandle: null
              },
              {
                id: 'reactflow__edge-question_942153193893null-answer_1206322484724null',
                source: 'question_942153193893',
                sourceandle: null,
                target: 'answer_1206322484724',
                targetHandle: null
              },
              {
                id: 'reactflow__edge-question_942153193893null-answer_1564053232954null',
                source: 'question_942153193893',
                sourceHandle: null,
                target: 'answer_1564053232954',
                targetHandle: null
              },
              {
                'data': {
                  label: 'What are the consequences of acid rain on the environment?'
                },
                'id': 'question_226108435844',
                'position': {
                  'x': 221,
                  'y': 254.5
                },
                'type': 'question'
              },
              {
                'id': 'reactflow__edge-answer_1206322484724null-question_226108435844null',
                'source': 'answer_1206322484724',
                'sourceHandle': null,
                'target': 'question_226108435844',
                'targetHandle': null
              },
              {
                'data': {
                  label: ' Acid rain has detrimental effects on ecosystems, leading to soil and water acidification, which can harm plant life, aquatic organisms, and even erode buildings and statues made of limestone or marble.'
                },
                'id': 'answer_498695564383',
                'position': {
                  'x': -389,
                  'y': 342.5
                },
                'type': 'answer'
              },
              {
                'id': 'reactflow__edge-question_226108435844null-answer_498695564383null',
                'source': 'question_226108435844',
                'sourceHandle': null,
                'target': 'answer_498695564383',
                'targetHandle': null
              },
              {
                'data': {
                  label: 'Ecosystems suffer significantly from the consequences of acid rain, as it induces acidification in both soil and water. This change adversely affects plant life, aquatic organisms, and architectural heritage, particularly structures crafted from limestone or marble. The erosion caused by acid rain poses a continual risk to these valuable constructions.'
                },
                'id': 'answer_845186969724',
                'position': {
                  'x': 243,
                  'y': 426.5
                },
                'type': 'answer'
              },
              {
                'id': 'reactflow__edge-question_226108435844null-answer_845186969724null',
                'source': 'question_226108435844',
                'sourceHandle': null,
                'target': 'answer_845186969724',
                'targetHandle': null
              },
              {
                'data': {
                  'label': 'The impact of acid rain on ecosystems is profound, resulting in the acidification of soil and water. This alteration harms various forms of life, from plant species to aquatic organisms. Furthermore, the corrosive nature of acid rain poses a threat to structures composed of limestone or marble, causing erosion and damage.'
                },
                'id': 'answer_860155181808',
                'position': {
                  'x': 721,
                  'y': 306.5
                },
                'type': 'answer'
              },
              {
                'id': 'reactflow__edge-question_226108435844null-answer_860155181808null',
                'source': 'question_226108435844',
                'sourceHandle': null,
                'target': 'answer_860155181808',
                'targetHandle': null
              },
              {
                'data': {
                  'label': 'How do environmental regulations aim to mitigate the impact of acid rain?'
                },
                'id': 'question_1342583125351',
                'position': {
                  'x': 463,
                  'y': 538.5
                },
                'type': 'question'
              },
              {
                'id': 'reactflow__edge-answer_498695564383null-question_1342583125351null',
                'source': 'answer_498695564383',
                'sourceHandle': null,
                'target': 'question_1342583125351',
                'targetHandle': null
              },
              {
                'data': {
                  'label': 'Environmental policies are primarily geared towards reducing the release of sulfur dioxide and nitrogen oxides, pivotal components in acid rain formation. This is executed through the adoption of cutting-edge technologies like scrubbers within industrial smokestacks and catalytic converters fitted in vehicles. These regulatory measures are instrumental in mitigating the creation of acid rain and, in turn, ameliorating the negative repercussions it imposes on the environment.'
                },
                'id': 'answer_1488543782033',
                'position': {
                  'x': -349,
                  'y': 608.5
                },
                'type': 'answer'
              },
              {
                'data': {
                  'label': 'Environmental regulations focus on reducing sulfur dioxide and nitrogen oxide emissions by implementing technologies like scrubbers in industrial smokestacks and catalytic converters in vehicles, thus helping to mitigate the formation of acid rain and its adverse effects.'
                },
                'id': 'answer_14548200754',
                'position': {
                  'x': -111,
                  'y': 750.5
                },
                'type': 'answer'
              },
              {
                'id': 'reactflow__edge-question_1342583125351null-answer_14548200754null',
                'source': 'question_1342583125351',
                'sourceHandle': null,
                'target': 'answer_14548200754',
                'targetHandle': null
              },
              {
                'id': 'reactflow__edge-question_1342583125351null-answer_1488543782033null',
                'source': 'question_1342583125351',
                'sourceHandle': null,
                'target': 'answer_1488543782033',
                'targetHandle': null
              },
              {
                'data': {
                  'label': 'The crux of environmental regulations lies in curbing emissions of sulfur dioxide and nitrogen oxides. This is achieved through the deployment of advanced technologies such as scrubbers installed in industrial smokestacks and catalytic converters integrated into vehicles. These measures play a pivotal role in diminishing the formation of acid rain and subsequently alleviating its detrimental impacts on the environment.'
                },
                'id': 'answer_593814599517',
                'position': {
                  'x': 785,
                  'y': 636.5
                },
                'type': 'answer'
              },
              {
                'id': 'reactflow__edge-question_1342583125351null-answer_593814599517null',
                'source': 'question_1342583125351',
                'sourceHandle': null,
                'target': 'answer_593814599517',
                'targetHandle': null
              }
            ]
          };
          const response  =  await app.service('services').create(data);
          await result.data.push(response);
        }
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
